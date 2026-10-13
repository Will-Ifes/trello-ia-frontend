# 🗺️ Roadmap – Trello.ia Frontend

Este roadmap tem como objetivo documentar o progresso e os planos futuros do projeto **Trello.ia** – Frontend. Ele serve como guia de desenvolvimento contínuo, facilitando contribuições e acompanhando a evolução do MVP até fases mais avançadas.

---

## ✅ Etapas já concluídas

- [x] Configuração inicial com Next.js 15, TypeScript, Tailwind, ESLint, Prettier
- [x] Setup de Jest e Testing Library com cobertura funcional
- [x] Dockerfile e docker-compose funcional (porta 3030)
- [x] Deploy gratuito via Vercel
- [x] Estrutura de pastas escalável e modular
- [x] Telas de login e cadastro com validação Yup + React Hook Form
- [x] Integração parcial com `useActionState` para autenticação (modo server action)
- [x] CI/CD com GitHub Actions
- [x] Testes para login, signup e boardSlice
- [x] Documentação inicial (`README` + `docs/`)

---

## 🚧 Em desenvolvimento (MVP)

- [ ] Integração real com backend (NestJS + PostgreSQL via Railway)
- [ ] Persistência de usuário autenticado (Zustand + localStorage + cookies)
- [ ] Middleware de proteção de rotas (Next.js + verificação de token)
- [ ] Tela de dashboard com exibição de boards
- [ ] Criação de boards e listas (mínimo viável)
- [ ] Custom hooks para chamadas API (`useBoards`, `useAuth`, etc)

---

## 🔮 Planejamento pós-MVP (IA embarcada e produtividade)

- [ ] Integração com IA via LLM (OpenRouter ou local)
- [ ] IA para sugerir tarefas com base em contexto ou histórico
- [ ] IA para automação de rotinas recorrentes
- [ ] IA para organizar e reordenar cards
- [ ] Integração com serviços externos (Google Calendar, Notion, etc)

---

## 🧪 Melhorias futuras nos testes

- [ ] Testes E2E (Playwright ou Cypress)
- [ ] Mocks realistas de API com MSW
- [ ] Testes de acessibilidade (a11y)

---

## 📦 Organização e Dev Experience

- [ ] Padrão de commits (Conventional Commits)
- [ ] Husky + lint-staged
- [ ] Análise de bundle com `next-bundle-analyzer`
- [ ] Storybook para componentes isolados (futuro)

---

## 🛠️ Sugestões e contribuições

Esta lista pode ser ajustada conforme surgirem novas necessidades ou contribuições da comunidade. Sinta-se à vontade para abrir uma [issue](https://github.com/seu-repo/issues) ou enviar um Pull Request.

Se quiser sugerir novas features de IA, veja também o arquivo [docs/ai-features.md](./ai-features.md).
