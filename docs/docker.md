# Docker

O arquivo principal é `compose.yaml` no backend. Clone frontend e backend em pastas irmãs, configure o `.env` da API e execute `docker compose up --build` naquela pasta.

O frontend aparece em http://localhost:3030. O banco persiste em volume e a API aplica migrações antes de iniciar. O Compose usa HTTP para desenvolvimento; configure HTTPS e `COOKIE_SECURE=true` para publicação.

Docker não estava disponível no ambiente usado nesta recuperação. As imagens foram preparadas, mas a execução em contêineres ainda precisa de validação.
