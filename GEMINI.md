# GEMINI.md

This project is a high-performance, full-stack React development template leveraging the Bun runtime. It is designed for a seamless developer experience with a unified "single-port" architecture.

## Project Overview

*   **Runtime**: [Bun](https://bun.sh/)
*   **Architecture**: "Single Port" (default: 3000). [ElysiaJS](https://elysiajs.com/) serves as the main HTTP server, integrating [Vite](https://vitejs.dev/) in **middleware mode** during development to provide HMR and React Dev Inspector support.
*   **Frontend**: React 19 with [TanStack React Router](https://tanstack.com/router/latest) for type-safe, file-based routing.
*   **UI Framework**: [Mantine UI](https://mantine.dev/) for a comprehensive component library and hooks.
*   **Authentication**: [Better Auth](https://www.better-auth.com/) integrated with Elysia.
*   **Database**: [Prisma ORM](https://www.prisma.io/) for type-safe database access.
*   **Tooling**: [Biome](https://biomejs.dev/) for ultra-fast linting and formatting.

## Building and Running

### Development
*   **Install dependencies**: `bun install`
*   **Start development server**: `bun run dev` (Runs Elysia + Vite Middleware)
*   **Update Route Tree**: `bun x tsr generate` (usually automatic via Vite plugin)
*   **Database Migration**: `bun x prisma migrate dev`

### Production
*   **Build Frontend**: `bun run build` (Outputs to `dist/`)
*   **Start Production Server**: `bun run start` (Serves pre-built assets from `dist/` via Elysia)

### Quality Control
*   **Lint**: `bun run lint` (Biome check)
*   **Format**: `bun run format` (Biome write)
*   **Type Check**: `bun x tsc --noEmit`

## Development Conventions

### Code Style & Structure
*   **Formatting**: Strictly use **Biome**. The project uses **tab indentation** and **double quotes** for JavaScript/TypeScript.
*   **Imports**: 
    *   Use the `node:` protocol for Node.js built-ins (e.g., `import fs from "node:fs"`).
    *   Use the `@/` alias for absolute paths from the `src/` directory (e.g., `import { auth } from "@/utils/auth"`).
*   **Routing**: New routes should be added as files in `src/routes/` to leverage TanStack Router's file-based routing system.

### Backend/API
*   **Prefix**: All backend API routes are prefixed with `/api`.
*   **Documentation**: Swagger documentation is available at `/api/docs` in development.
*   **Authentication**: Handled at `/api/auth/*`. Protected routes use the `apiMiddleware` and custom guards.

### Frontend
*   **Theme**: Mantine is configured via `MantineProvider` in `src/App.tsx`.
*   **State Management**: [Valtio](https://valtio.pmnd.rs/) is used for simple proxy-based state (see `src/store/`).
*   **Dev Tools**: TanStack Router Devtools and React Dev Inspector are enabled in development.

## Project Layout

*   `src/index.ts`: Unified server entry point (Dev/Prod conditional logic).
*   `src/vite.ts`: Vite server configuration (Dev-only).
*   `src/routes/`: Frontend route definitions and layouts.
*   `src/api/`: Elysia route modules.
*   `src/utils/`: Shared utilities (Auth, DB, Logging).
*   `prisma/`: Database schema and migrations.
*   `dist/`: Production build output (Git ignored).
