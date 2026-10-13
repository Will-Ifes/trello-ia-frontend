# ✅ Testes – Trello.ia Frontend

Este documento descreve a abordagem de testes no projeto **Trello.ia – Frontend**, incluindo ferramentas utilizadas, estrutura, boas práticas e como rodar os testes localmente ou via Docker.

---

## 🧪 Tecnologias Utilizadas

- **Jest** – Framework de testes
- **React Testing Library** – Renderização e interação com componentes
- **jsdom** – Ambiente simulado de DOM
- **@testing-library/user-event** – Simulação de ações reais do usuário

---

## 📁 Estrutura dos testes

Os arquivos de teste ficam próximos ao componente ou feature testada, dentro de uma pasta `__tests__`.

```bash
src/
├── features/
│   ├── auth/
│   │   ├── SignUp.tsx
│   │   └── __tests__/
│   │       └── SignupForm.test.tsx
│   └── boards/
│       ├── boardSlice.ts
│       └── __tests__/
│           └── boardSlice.test.ts
```

---

## 🚀 Executando os testes

### Via terminal local:

```bash
pnpm test
```

### Com cobertura de código:

```bash
pnpm test -- --coverage
```

### Dentro do Docker:

```bash
docker-compose exec frontend pnpm test
```

---

## 🧼 Boas práticas

- Cada teste deve ser **simples, confiável e legível**
- Evite mocks excessivos – use comportamento real sempre que possível
- Nomeie testes com intenção clara (ex: `exibe mensagem de erro se e-mail inválido`)
- Garanta que mensagens de validação, alertas e ações estejam cobertas
- Priorize testes de **interface e interação do usuário**

---

## 📊 Testes com cobertura mínima sugerida

- [x] Tela de Login
- [x] Tela de Cadastro
- [x] Redux (ex: boardSlice)
- [ ] Hooks customizados (ex: useToggle)
- [ ] Funções auxiliares (ex: lib/utils)

---

## 🔮 Futuro

- Integração com MSW para mocks de API
- Testes E2E com Playwright ou Cypress
- Testes de acessibilidade automatizados (axe-core)
- Pipeline com `pnpm test --coverage` no GitHub Actions

---

## 🧠 Dica

Use a extensão **Jest Runner** (VSCode) para rodar testes com atalhos por arquivo ou teste individual.

---

Em caso de dúvidas, abra uma issue ou consulte os exemplos existentes no repositório. 🧪
