# Makuro Base Template 🚀

[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Mantine](https://img.shields.io/badge/Mantine-blue?style=for-the-badge&logo=mantine&logoColor=white)](https://mantine.dev/)
[![Biome](https://img.shields.io/badge/Biome-60a5fa?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev/)

**Makuro Base Template** is a high-performance, full-stack React development template leveraging the **Bun** runtime. It offers a unique "Single Port" architecture, combining a Bun/Elysia backend with a React frontend for an incredibly smooth developer experience.

## ✨ Key Features

- **⚡ Single Port Architecture**: Backend (Elysia) and Frontend (Vite Middleware) run on the same port (3000). No CORS issues, no proxy complexity.
- **📜 Contract-First API**: Strictly typed API using OpenAPI. Frontend types are automatically synced from backend schemas.
- **⚛️ React 19 + TanStack Router**: The latest React features with type-safe, file-based routing.
- **🎨 Mantine UI**: A comprehensive library of 100+ components and hooks, pre-configured with a modern dark theme.
- **📱 PWA & TWA Support**: Ready for mobile with Service Workers, Web Manifest, and Android Trusted Web Activity verification.
- **🔍 React Dev Inspector**: `Alt/Option + Click` any element in your browser to jump directly to its source code in VS Code.
- **🧪 Modern Testing**: Fast unit/integration tests with Bun's native runner and E2E testing with Playwright.

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | [Bun](https://bun.sh/) (Fast all-in-one JS runtime) |
| **Backend** | [ElysiaJS](https://elysiajs.com/) (Fast, type-safe web framework) |
| **Frontend** | [React 19](https://react.dev/) (UI Library) |
| **Routing** | [TanStack React Router](https://tanstack.com/router/latest) (Type-safe routing) |
| **UI Framework** | [Mantine UI](https://mantine.dev/) (Component library) |
| **Auth** | [Better Auth](https://www.better-auth.com/) (Complete auth solution) |
| **Database** | [Prisma ORM](https://www.prisma.io/) (Database toolkit) |
| **Testing** | [Bun Test](https://bun.sh/docs/cli/test) & [Playwright](https://playwright.dev/) |

## 📁 Project Structure

```text
├── __tests__/           # Consolidated test suite (API & E2E)
├── generated/           # Auto-generated API types and Prisma client
├── prisma/              # Database schema and migrations
├── scripts/             # Internal automation scripts
└── src/
    ├── api/             # Elysia backend route modules
    ├── middleware/      # Backend & Frontend middlewares
    ├── routes/          # TanStack file-based frontend routes
    ├── store/           # Global state (Valtio)
    ├── utils/           # Shared utilities (DB, Env, API Client)
    ├── frontend.tsx     # React client entry point
    └── index.ts         # Unified server entry point
```

## 🚀 Getting Started

### 1. Prerequisites
Install [Bun](https://bun.sh/) if you haven't already.

### 2. Installation
```bash
bun install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Fill in your DATABASE_URL and BETTER_AUTH_SECRET
```

### 4. Database Initialization
```bash
bun x prisma migrate dev
```

### 5. Start Development
```bash
bun run dev
```
- **App**: `http://localhost:3000`
- **API Docs**: `http://localhost:3000/api/docs` (Swagger)

## 🧪 Testing Commands

- **Unit/Integration (API)**: `bun run test`
- **End-to-End (Browser)**: `bun run test:e2e`
- **Visual Dashboard**: `bun run test:ui`

## 📝 Development Guidelines

- **API Workflow**: 
  1. Define schema in `src/api/*.ts`.
  2. Run `bun run gen:api` (or just start `dev` mode).
  3. Use `apiClient` in the frontend with full type safety.
- **Styling**: Prefer Mantine components and Style Props.
- **Code Quality**: Code is automatically formatted on save if you have the Biome extension. Manual: `bun run check`.

---
Created with ❤️ by [Malik Kurosaki](https://github.com/malikkurosaki)