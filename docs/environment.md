# 🌱 Variáveis de Ambiente – Trello.ia Frontend

O projeto **Trello.ia - Frontend** utiliza um arquivo `.env.local` para definir variáveis sensíveis ou de configuração, mantendo o código mais seguro e flexível.

---

## 📁 Onde fica o `.env.local`?

O arquivo deve ser criado na raiz do projeto:

```
/trello.ia-frontend/
├── .env.local   ✅
├── next.config.ts
├── src/
└── ...
```

> ⚠️ Este arquivo nunca deve ser versionado. O `.gitignore` já está configurado para ignorá-lo.

---

## 🔑 Variáveis disponíveis

### ✅ Obrigatórias

| Variável              | Descrição                                                     |
| --------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base para chamadas ao backend (ex: http://localhost:3001) |

### ⛔️ Exemplo completo do `.env.local`

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🧪 Acessando variáveis no código

Todas as variáveis devem começar com `NEXT_PUBLIC_` para serem acessíveis no frontend.

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

> Variáveis sem esse prefixo serão ignoradas pelo Next.js no lado do cliente.

---

## 🐳 Usando com Docker

O `docker-compose.yml` já está preparado para ler o `.env.local`:

```yaml
env_file:
  - .env.local
```

Portanto, basta manter esse arquivo presente na raiz do projeto para que os containers recebam as variáveis automaticamente.

---

## 💡 Dicas

- Nunca versionar `.env.local` – ele é pessoal e pode conter dados sensíveis
- Se necessário, compartilhe um `.env.example` com os nomes das variáveis esperadas
- Prefira valores configuráveis via variável ao invés de "cravar" valores fixos no código

---

Em caso de dúvidas, consulte a documentação oficial do [Next.js – Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) ou abra uma issue no repositório. ✅
