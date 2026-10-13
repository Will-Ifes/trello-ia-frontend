# Etapa de build
FROM node:23-alpine AS builder

ENV NODE_ENV=production
ENV NEXT_FONT_GOOGLE_FETCH_DISABLE=1

# Dependências necessárias
RUN apk add --no-cache bash curl

# Corepack + pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Instala apenas dependências necessárias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Build da aplicação
RUN pnpm build

# Remove dependências de dev
RUN pnpm prune --prod

# Etapa final - Imagem leve e segura para execução
FROM node:23-alpine

ENV NODE_ENV=production
ENV NEXT_FONT_GOOGLE_FETCH_DISABLE=1

# Usuário não-root (boa prática)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Dependências mínimas
RUN apk add --no-cache bash curl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia já com as permissões corretas, evita o uso de `chown` separado
COPY --chown=appuser:appgroup --from=builder /app ./

USER appuser

EXPOSE 3030

# Executa o app
CMD ["pnpm", "start"]
