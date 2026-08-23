# Personal Knowledge Graph Chat UI

A modern chat interface built with Vue 3, TypeScript, Vite, and Tailwind CSS to interact with the Personal Knowledge Graph RAG (Retrieval-Augmented Generation) API.

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **HTTP Client**: [Axios](https://axios-http.com/) (centralized client with cookie-based session support)
- **Internationalization**: [Vue I18n](https://vue-i18n.intlify.dev/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Code Quality**: ESLint, Oxlint, Oxfmt, and `vue-tsc`

---

## 🛠️ Getting Started

### 1. Prerequisites

- **Node.js**: `^22.18.0 || >=24.12.0`
- **Package Manager**: `npm` or `yarn`

### 2. Installation

```sh
yarn install
# or
npm install
```

### 3. Environment Variables

Create environment configuration files based on `.env.example`:

- `.env.development` (loaded during `yarn dev`):
  ```env
  VITE_APP_ENV=development
  VITE_API_BASE_URL=http://localhost:8000/api
  ```

- `.env.production` (loaded during `yarn build`):
  ```env
  VITE_APP_ENV=production
  VITE_API_BASE_URL=https://api.yourdomain.com/api
  ```

---

## 💻 Development & Scripts

### Run Development Server

```sh
yarn dev
# or
npm run dev
```

### Build for Production (Type-Check & Minification)

```sh
yarn build
# or
npm run build
```

### Preview Production Build

```sh
yarn preview
# or
npm run preview
```

### Run Unit Tests

```sh
yarn test:unit
# or
npm run test:unit
```

### Linting & Formatting

```sh
# Run linter
yarn lint

# Format code
yarn format
```

---

## 🔌 API Integration

API communication is centralized in `src/services/api.ts` using Axios:

- **Base URL**: Configured via `import.meta.env.VITE_API_BASE_URL`
- **Credentials**: `withCredentials: true` is enabled for cookie-based session management.
- **Endpoint**: `POST /search-rag`
  - **Payload**:
    ```json
    {
      "prompt": "Your question here"
    }
    ```
  - **Response**:
    ```json
    {
      "prompt": "Your question here",
      "model": "model-name",
      "retrieval_query": "Generated query",
      "answer": "Generated answer from knowledge graph",
      "retrieved_chunks": [...]
    }
    ```

---

## 🌐 Localization (i18n)

Translations are organized in `src/locales/`:
- `src/locales/en.json` — English translation keys for placeholders, buttons, and error messages.
