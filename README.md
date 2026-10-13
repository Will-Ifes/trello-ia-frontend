# Trello.ia — Frontend

Interface web de um projeto pessoal de gestão de tarefas inspirado no Trello. Esta etapa do projeto concentra a experiência de autenticação e a base do dashboard; quadros completos e recursos de IA fazem parte do roadmap.

---

## Tecnologias

- **Next.js 15, React 19 e TypeScript** — aplicação com App Router.
- **Tailwind CSS** — estilos e responsividade.
- **React Hook Form + Yup** — formulários e validação.
- **Redux Toolkit** — estado inicial dos quadros.
- **Jest + Testing Library** — testes de interface e estado.
- **Docker, ESLint e Prettier** — ambiente de desenvolvimento e qualidade de código.
- **SWR** — disponível nas dependências para evolução da camada de dados.

---

## Funcionalidades presentes

- Telas de cadastro, login, recuperação e redefinição de senha.
- Validação de formulários e mensagens de erro.
- Integração das ações de autenticação com a API.
- Estrutura do dashboard, navegação responsiva e componentes reutilizáveis.
- Estado inicial de boards e testes de componentes e Redux.

## Evolução

- Fluxo completo de criação e edição de quadros, listas e cards.
- Integração das funcionalidades de tarefas com o backend.
- Recursos de IA para apoio à organização e produtividade.

> Os recursos de IA e o fluxo completo de quadros ainda não estão implementados nesta versão.

---

## Contexto e decisões técnicas

O projeto explora a construção de um produto de organização de tarefas, começando pelo acesso do usuário e pela estrutura da aplicação. A separação por `features` reúne formulários, ações e validação do mesmo domínio.

- **App Router e ações no servidor:** chamadas de autenticação ficam próximas do fluxo que as utiliza.
- **Componentes compartilhados:** navegação e primitivas da UI são separados das funcionalidades.
- **Estado de boards:** o slice do Redux representa uma base local; não substitui persistência na API.

## Por dentro do código

| Arquivo | O que observar |
| --- | --- |
| [Login e integração](src/features/auth/actions/login.ts) | Chamada à API, leitura do cookie e redirecionamento |
| [Validação do login](src/features/auth/validation/login.schema.ts) | Contrato do formulário |
| [Dashboard](src/features/dashboard/DashboardView.tsx) | Composição e quadros de exemplo |
| [Estado dos boards](src/features/boards/boardSlice.ts) | Operações locais de inclusão e remoção |
| [Testes do login](src/features/auth/__tests__/Login.spec.tsx) | Exemplos de testes de interface |

## Limites da versão

Os quadros do dashboard são dados de demonstração. O fluxo completo de tarefas e os recursos de IA ainda não estão disponíveis. A autenticação usa cookies com `secure: true`; o transporte e a configuração de cookies precisam ser compatíveis com seu ambiente local. Os comandos e testes estão versionados, mas este README não declara aprovação atual de toda a suíte.

## Organização do código

```text
src/
├── app/          # Rotas, layouts e páginas do Next.js
├── components/   # Componentes de interface e navegação
├── features/     # Autenticação, dashboard e estado dos boards
├── hooks/        # Hooks reutilizáveis
├── lib/          # Utilitários e acesso ao usuário atual
├── store/        # Configuração do Redux
└── types/        # Tipos compartilhados
```

---

## Executar localmente

Requer Node.js e pnpm. Com o [backend](https://github.com/Will-Ifes/trello-ia-backend) configurado, defina `API_INTERNAL_URL` no seu ambiente para as ações de autenticação apontarem para a API.

```bash
pnpm install
pnpm dev
```

A aplicação roda em `http://localhost:3030`. Veja os detalhes em [configuração de ambiente](docs/environment.md) e [Docker](docs/docker.md).

### Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento na porta 3030 |
| `pnpm build` | Gera a build de produção |
| `pnpm start` | Inicia a build de produção |
| `pnpm test` | Executa os testes |
| `pnpm test:coverage` | Executa os testes com cobertura |
| `pnpm lint` | Verifica o código com ESLint |

---

## Documentação

- [Estrutura de pastas](docs/structure.md)
- [Ambiente](docs/environment.md)
- [Docker](docs/docker.md)
- [Testes](docs/testing.md)
- [Roadmap](docs/roadmap.md)
- [Funcionalidades de IA planejadas](docs/ai-features.md)

---

## Colaboração e licença

Sugestões podem ser enviadas por issue ou pull request. O projeto ainda não possui licença definida; consulte o autor antes de reutilizar o código fora das permissões padrão do GitHub.

---

Desenvolvido por **Wildemberg de Jesus Oliveira (Will)** · [LinkedIn](https://www.linkedin.com/in/wildemberg-de-jesus-oliveira/)  
Projeto iniciado em 2025 em outra conta GitHub e reunido neste perfil em uma cópia revisada.
