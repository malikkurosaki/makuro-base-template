# GEMINI.md

This file provides instructional context for the Gemini AI agent to understand and interact with this project efficiently.

## Project Overview

A high-performance web application template using a "Single Port" architecture. It combines a Bun/Elysia backend with a React frontend, served through Vite in middleware mode.

-   **Runtime**: [Bun](https://bun.sh/)
-   **Backend**: [ElysiaJS](https://elysiajs.com/)
-   **Frontend**: React 19
-   **Routing**: [TanStack React Router](https://tanstack.com/router/latest) (File-based)
-   **UI Framework**: [Mantine UI](https://mantine.dev/)
-   **Bundler/Dev Tooling**: [Vite](https://vitejs.dev/) (Middleware Mode)
-   **Linting/Formatting**: [Biome](https://biomejs.dev/)
-   **Developer Experience**: Single port (3000), HMR, and [react-dev-inspector](https://github.com/zthxxx/react-dev-inspector) integration.

## Architecture: Single Port (DX)

The Elysia server (running on Bun) acts as the primary entry point. During development, it bridges requests to Vite's middleware.

-   **Backend**: Handles API routes (`/api/*`) and custom developer tools (e.g., `/__open-in-editor`).
-   **Frontend**: All other requests are passed to Vite for HMR and asset transformation.
-   **Entry Points**:
    -   Server: `src/index.ts`
    -   Vite Config: `src/vite.ts`
    -   Frontend: `src/frontend.tsx`
    -   HTML: `src/index.html`

## Development Commands

-   **Install Dependencies**: `bun install`
-   **Start Dev Server**: `bun run dev` (Runs Elysia + Vite Middleware)
-   **Lint & Fix**: `bun run lint` (Biome check)
-   **Format Code**: `bun run format` (Biome format)
-   **Type Check**: `bun x tsc --noEmit`
-   **Production Build**: `bun run build` (Static build)
-   **Production Start**: `bun run start` (Serve production build)

## Project Structure

-   `src/`: Main source code.
    -   `src/index.ts`: Elysia server entry point.
    -   `src/vite.ts`: Vite server configuration for middleware mode.
    -   `src/frontend.tsx`: React client entry point.
    -   `src/routes/`: TanStack Router file-based routes.
        -   `src/routes/__root.tsx`: Root layout with authentication guards.
        -   `src/routes/index.tsx`: Home page.
    -   `src/utils/`: Helper utilities (e.g., `open-in-editor.ts`, API clients).
-   `biome.json`: Biome configuration (tabs, double quotes, import organization).
-   `postcss.config.cjs`: PostCSS configuration for Mantine UI.

## Coding Conventions

-   **Formatter/Linter**: Strictly use **Biome**. Indentation is set to **tabs**.
-   **Routing**: Use TanStack Router's file-based system in `src/routes/`. Avoid manual route definitions unless necessary.
-   **UI Components**: Prefer Mantine UI components. Always wrap the app with `MantineProvider`.
-   **Imports**: Use the `node:` protocol for Node.js built-ins (e.g., `import fs from "node:fs"`). Biome handles import organization automatically.
-   **Types**: Maintain strict TypeScript compliance. Use `tsc --noEmit` to verify.

## Integration Details

-   **React Dev Inspector**: Active in development. Use `Alt/Option + Click` to jump from the browser to the code in your editor.
-   **Elysia-Vite Bridge**: The bridge in `src/index.ts` mocks Node.js `req`/`res` objects using a `Proxy` to make Bun's fetch-based requests compatible with Vite's Connect middleware.
