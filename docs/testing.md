# Testes

`pnpm test --runInBand --coverage=false` executa os testes Jest. `pnpm lint`, `pnpm typecheck` e `pnpm build` verificam código e compilação.

Para testes integrados no navegador, suba backend e frontend locais em ambiente de teste, instale Chromium com `pnpm exec playwright install chromium` e execute `pnpm test:e2e`. A suíte verifica cadastro, login, criação de quadro/cartão/lista, movimentação, conclusão, persistência após reload, IA sem configuração e logout em desktop e mobile. Ela usa contas fictícias e remove os quadros criados.

Os testes de API com PostgreSQL real ficam no repositório backend. Chamadas reais de IA e envio de e-mail não fazem parte dos testes automatizados.
