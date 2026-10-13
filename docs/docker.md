# 📦 Documentação Docker – Trello.ia Frontend

Este guia cobre como utilizar o Docker para rodar, testar e construir o projeto **Trello.ia - Frontend** em um ambiente isolado e padronizado.

---

## 🐳 Dockerfile

A imagem é baseada em **Node 20 Alpine**, com `pnpm` como gerenciador de pacotes. Está preparada para **build e produção**, com suporte também ao desenvolvimento.

### Principais instruções:

- Instala as dependências com `pnpm install`
- Copia o código da aplicação
- Executa `pnpm build`
- Expõe a porta `3030`

---

## 💠 docker-compose.yml

### Estrutura recomendada:

```yaml
services:
  frontend:
    container_name: trelloia-frontend
    build:
      context: .
    ports:
      - '3030:3030'
    env_file:
      - .env.local
    volumes:
      - .:/app
    working_dir: /app
    command: pnpm run dev
    restart: unless-stopped
```

> ⚠️ Certifique-se de que o arquivo `.env.local` esteja presente na raiz do projeto.

---

## 🚀 Modos de Execução

Você pode optar por:

### ✅ Execução automática (recomendada)

Com `command: pnpm run dev`, o projeto inicia automaticamente ao subir:

```bash
docker-compose up -d
```

### 🛠 Execução manual (mais controle)

Se remover a linha `command`, poderá executar manualmente:

```bash
docker-compose up -d
docker-compose exec frontend pnpm dev -- --port 3030
```

---

## 📂 Acesso e logs

### Acessar terminal do container:

```bash
docker exec -it trelloia-frontend sh
```

### Ver logs em tempo real:

```bash
docker logs -f trelloia-frontend
```

---

## 📦 Scripts via Docker

Rode qualquer comando `pnpm` do `package.json`:

```bash
docker-compose exec frontend pnpm <script>
```

### Exemplos:

```bash
docker-compose exec frontend pnpm dev       # Inicia o dev server (só use se remover o command: pnpm run dev do docker-compose.yml)
docker-compose exec frontend pnpm build     # Cria a build de produção
docker-compose exec frontend pnpm start     # Inicia a build gerada
docker-compose exec frontend pnpm test      # Executa os testes
docker-compose exec frontend pnpm lint      # Executa o linter
docker-compose exec frontend pnpm format    # Formata o código
```

---

## 🔁 Comandos úteis

| Ação                           | Comando                                 |
| ------------------------------ | --------------------------------------- |
| Subir o projeto                | `docker-compose up -d`                  |
| Subir com rebuild              | `docker-compose up -d --build`          |
| Parar o projeto                | `docker-compose down`                   |
| Ver containers em execução     | `docker ps`                             |
| Ver imagens locais             | `docker images`                         |
| Limpar containers parados      | `docker container prune`                |
| Remover imagens não utilizadas | `docker image prune -a`                 |
| Alterar porta (ex: para 3030)  | Edite o `docker-compose.yml` e reinicie |

---

## 🧪 Hot Reload (desenvolvimento)

Para garantir atualização ao salvar arquivos, use um volume:

```yaml
volumes:
  - .:/app
```

> 💡 Você também pode criar um `docker-compose.override.yml` para manter essa config isolada do ambiente de produção.

---

## ✅ Checklist Docker

- [x] `Dockerfile` funcional com build otimizado
- [x] `docker-compose.yml` com `.env.local`
- [x] Hot reload funcionando com volumes
- [x] Scripts rodando via `pnpm`
- [x] Suporte a CI/CD e deploy Vercel

---

## ✅ Checklist Docker

- [x] Dockerfile pronto e funcional
- [x] docker-compose com `.env.local`
- [x] Porta 3030 disponível
- [x] Scripts testados com `pnpm`
- [x] Compatível com Vercel (deploy opcional)

---

Em caso de dúvidas, pode me contatar [LinkedIn](https://www.linkedin.com/in/wildemberg-de-jesus-oliveira/). 💬
