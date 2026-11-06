# Ambiente

Requer Node.js 24, pnpm 11.25.0 e o backend executando.

`API_INTERNAL_URL` é uma variável exclusiva do servidor Next, com padrão `http://localhost:3000`. Não use uma variável pública para segredos. A API e o frontend mantêm a mesma duração de sessão: um dia.

Em desenvolvimento, `pnpm dev` aceita HTTP local. Em produção HTTPS, o cookie é seguro por padrão. `COOKIE_SECURE=false` é uma opção explícita para testar a build em HTTP local; use `true` ao publicar.

Consulte o README para instalação, Docker e testes.
