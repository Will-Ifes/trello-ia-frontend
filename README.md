# Trello.ia — Frontend

Interface de um projeto pessoal de organização de tarefas, construída com Next.js 15, React 19 e TypeScript.

## O que está implementado

- Páginas de cadastro, login e recuperação de senha com validação de formulários.
- Estrutura de dashboard, componentes de navegação e estado para boards.
- Testes de interface e de estado com Jest e Testing Library.
- Configuração de Docker e documentação de ambiente.

A criação de quadros, listas e cards e os recursos de IA aparecem no roadmap; esta versão ainda não os entrega.

## Tecnologias

Next.js, React, TypeScript, Tailwind CSS, Redux Toolkit, React Hook Form, SWR, Jest e Docker.

## Executar localmente

```bash
pnpm install
pnpm dev
```

O frontend roda na porta 3030. Defina `API_INTERNAL_URL` apontando para a API local antes de testar os fluxos de autenticação. Consulte [ambiente](docs/environment.md) e [Docker](docs/docker.md).

## Testes

```bash
pnpm test
pnpm lint
pnpm build
```

## Projeto

- [Backend](https://github.com/Will-Ifes/trello-ia-backend)
- [Roadmap](docs/roadmap.md)
- [Funcionalidades de IA planejadas](docs/ai-features.md)

Versão de portfólio baseada no [projeto original de Wildemberg de Jesus Oliveira](https://github.com/Wildemberg-otus7/trello.ia-frontend). Foi criada com histórico novo para não reproduzir dados de configuração presentes no projeto original associado. Esta cópia ainda não foi validada em execução após a migração.
