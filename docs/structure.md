# 🗂️ Estrutura de Pastas – Trello.ia Frontend

A estrutura de pastas do projeto **Trello.ia** foi pensada para escalar, ser modular e de fácil manutenção. Abaixo, explicamos o propósito de cada diretório presente no `src/`.

---

## 📁 app/

Páginas do projeto utilizando o App Router do Next.js. Cada subpasta é tratada como rota:

| Caminho      | Função                          |
| ------------ | ------------------------------- |
| `login/`     | Tela de login                   |
| `signUp/`    | Tela de cadastro                |
| `page.tsx`   | Página inicial padrão           |
| `layout.tsx` | Layout raiz para todas as rotas |

Inclui também arquivos globais como `globals.css` e testes automatizados de páginas.

---

## 📁 components/

Componentes reutilizáveis de UI.

- `ui/`: componentes de design system como `Button`, `Input`, `Alert`, etc. (baseados em ShadCN)
- Futuramente pode conter outros agrupamentos como `layouts/`, `modals/`, etc.

---

## 📁 constants/

Constantes globais reutilizadas em múltiplas partes da aplicação. Exemplos:

- Estados iniciais (como `defaultFormState`)
- Mensagens fixas de erro ou sucesso
- Rotas nomeadas, configurações, etc.

---

## 📁 features/

Contém a lógica de cada **domínio da aplicação**.

Cada domínio (ex: auth, boards) pode conter:

- Componentes específicos daquela feature
- Validações Yup (em `validation/`)
- Actions com Server Actions (em `actions/`)
- Testes (em `__tests__/`)
- Redux Slice (se necessário)

Exemplos atuais:

- `auth/`: login, signup, validações e ações relacionadas à autenticação
- `boards/`: gerenciamento de boards com slice Redux

---

## 📁 hooks/

Hooks customizados do projeto, como:

- `useToggle()`
- `useDebounce()`
- `useIsClient()` (SSR-safe check)

---

## 📁 lib/

Funções utilitárias genéricas, que não pertencem a um domínio específico.

Exemplos:

- `utils.ts`: validações simples, formatações, helpers

---

## 📁 services/

Camada de comunicação com o backend.

Aqui ficarão funções do tipo:

- `getBoards()`, `createBoard()`
- `loginUser()`, `signupUser()`

Essas funções devem usar `fetch`, `axios`, ou `SWR`.

---

## 📁 store/

Configuração do Redux Toolkit (store, middlewares).

Em projetos maiores, esta pasta pode crescer com middlewares, persistência local, listeners, etc.

---

## 📁 types/

Interfaces e tipos globais TypeScript.

Exemplos:

- `FormState`
- `User`
- `Board`

Dividir por arquivos (`auth.ts`, `boards.ts`, `formStates.ts`, etc.) ajuda na organização.

---

## 📁 docs/ (fora do `src/`)

Documentação técnica auxiliar, como:

- `docker.md`: uso de Docker
- `structure.md`: esta explicação da estrutura
- `environment.md`: variáveis de ambiente
- `testing.md`: testes e cobertura
- `roadmap.md`: planejamento e metas

Essa pasta é voltada para colaboradores e contribuintes do projeto.

---

Se tiver sugestões de melhoria para a organização de pastas ou quiser propor uma nova convenção, fique à vontade para abrir uma issue ou PR. 💡
