# Trello.ia — Frontend

Kanban pessoal com Next.js, React, TypeScript e Tailwind. Usa o [backend NestJS](https://github.com/Will-Ifes/trello-ia-backend) para autenticação, persistência e IA.

## Funcionalidades do MVP

- Cadastro, login, recuperação de senha e proteção das páginas privadas.
- Dashboard com dados reais, busca de quadros e contagem de tarefas.
- Criação, edição e exclusão de quadros, listas e cartões.
- Descrição, prazo e conclusão de tarefas; movimentação por arrastar ou seletor acessível.
- Visão de todas as tarefas, perfil e criação de quadros com IA configurada no backend.
- Layout responsivo, estados vazios, mensagens de erro, confirmação de exclusão e sessão HTTP-only.

## Executar

Requer Node.js 24 e pnpm 11.25.0. Primeiro inicie o backend e seu PostgreSQL conforme o README dele.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abra [localhost:3030](http://localhost:3030), crie uma conta e entre. A API padrão é `http://localhost:3000`. Para alterá-la, copie `.env.example` para `.env.local` e defina `API_INTERNAL_URL`.

O navegador chama `/api/*` no próprio frontend. O servidor Next encaminha apenas as rotas de produto permitidas e o cookie HTTP-only para a API. Não é necessário configurar `NEXT_PUBLIC_API_URL` nem expor a chave de IA ao cliente.

## Produção e Docker

```sh
pnpm build
pnpm start
```

Em HTTPS, cookies seguros são habilitados por padrão. Para testar uma build de produção em HTTP local, defina explicitamente `COOKIE_SECURE=false`; em produção pública use `COOKIE_SECURE=true`.

O `compose.yaml` do backend sobe os dois repositórios e o banco em um único comando quando eles estão em pastas irmãs. A imagem usa o modo standalone do Next. Consulte [o README da API](https://github.com/Will-Ifes/trello-ia-backend) para a configuração completa.

## Verificação

```sh
pnpm lint
pnpm typecheck
pnpm test --runInBand --coverage=false
pnpm build
pnpm audit --prod
```

Com frontend e backend locais rodando, e IA sem credenciais reais:

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

Os testes de navegador criam contas fictícias em `example.com`, usam e excluem quadros próprios, verificam desktop e mobile, e geram capturas em `test-results/`. Use um ambiente de testes, separado de produção. Os testes não enviam e-mails nem chamam um modelo pago. A CI verifica lint, testes de componentes, build e auditoria.

## Organização

- `src/features/auth`: formulários, ações de servidor e cache da sessão.
- `src/features/boards`: interface Kanban, tipos e cliente da API.
- `src/app/(protected)`: páginas com autenticação obrigatória.
- `src/app/api/[...path]`: ponte entre navegador e API.
- `e2e`: testes Playwright de uso real.

## Configuração externa e limites

A criação manual funciona sem IA. Para habilitar geração, configure `OPENROUTER_API_KEY` e `OPENROUTER_MODEL` no backend. A recuperação real depende da configuração de e-mail da API.

Este MVP atende uso pessoal. Colaboração, convites, anexos, checklists, tarefas recorrentes, chat com IA e integrações externas seguem fora do escopo implementado. OAuth com Google não está disponível; os botões de demonstração foram removidos.

Projeto de **Wildemberg de Jesus Oliveira (Will)**. Sem licença de reutilização definida.
