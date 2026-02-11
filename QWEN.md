# Makuro Base Template - Project Overview

## Project Description
Makuro Base Template is a high-performance, full-stack React development template leveraging the Bun runtime. It implements a unique "Single Port" architecture that combines a Bun/Elysia backend with a React frontend running on the same port, eliminating CORS issues and proxy complexity.

## Architecture & Tech Stack

### Core Technologies
- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Backend**: [ElysiaJS](https://elysiajs.com/) - Fast, type-safe web framework
- **Frontend**: [React 19](https://react.dev/) - UI Library
- **Routing**: [TanStack React Router](https://tanstack.com/router/latest) - Type-safe routing
- **UI Framework**: [Mantine UI](https://mantine.dev/) - Component library with 100+ components
- **Authentication**: [Better Auth](https://www.better-auth.com/) - Complete auth solution
- **Database**: [Prisma ORM](https://www.prisma.io/) - Database toolkit
- **Testing**: [Bun Test](https://bun.sh/docs/cli/test) & [Playwright](https://playwright.dev/)

### Key Features
- ⚡ Single Port Architecture: Backend (Elysia) and Frontend (Vite Middleware) run on the same port (3000)
- 📜 Contract-First API: Strictly typed API using OpenAPI with automatic frontend type synchronization
- ⚛️ React 19 + TanStack Router: Latest React features with type-safe, file-based routing
- 🎨 Mantine UI: Pre-configured with a modern dark theme
- 📱 PWA & TWA Support: Ready for mobile with Service Workers and Web Manifest
- 🔍 React Dev Inspector: Alt/Option + Click to jump directly to source code in VS Code
- 🧪 Modern Testing: Unit/integration tests with Bun's native runner and E2E testing with Playwright

## Project Structure
```
├── __tests__/           # Consolidated test suite (API & E2E)
├── generated/           # Auto-generated API types and Prisma client
├── prisma/              # Database schema and migrations
├── scripts/             # Internal automation scripts
└── src/
    ├── api/             # Elysia backend route modules
    ├── components/      # React components
    ├── middleware/      # Backend & Frontend middlewares
    ├── routes/          # TanStack file-based frontend routes
    ├── store/           # Global state (Valtio)
    ├── utils/           # Shared utilities (DB, Env, API Client)
    ├── frontend.tsx     # React client entry point
    ├── index.html       # HTML template
    ├── index.ts         # Unified server entry point
    ├── vite.ts          # Vite server configuration
    └── router.tsx       # Router configuration
```

## Development Commands

### Getting Started
1. Install Bun if you haven't already
2. Run `bun install`
3. Copy `.env.example` to `.env` and fill in required values
4. Initialize database: `bun x prisma migrate dev`
5. Start development: `bun run dev`

### Available Scripts
- `bun run dev` - Start development server with hot reload
- `bun run gen:api` - Generate API types from backend schemas
- `bun run lint` - Lint code using Biome
- `bun run check` - Check and fix code formatting
- `bun run format` - Format code using Biome
- `bun run test` - Run unit/integration tests
- `bun run test:ui` - Run tests with visual dashboard
- `bun run test:e2e` - Run end-to-end tests
- `bun run build` - Build production bundle
- `bun run start` - Start production server

## Development Guidelines

### API Workflow
1. Define schema in `src/api/*.ts`
2. Run `bun run gen:api` (automatically runs in dev mode)
3. Use `apiClient` in the frontend with full type safety

### Vite Integration
The project uses a custom Vite integration in `src/vite.ts` that enables:
- Tailwind CSS integration
- React HMR (Hot Module Replacement)
- React Dev Inspector for debugging
- TanStack Router plugin
- Custom middleware mode for single-port architecture

### Styling
- Prefer Mantine components and Style Props
- Use Tailwind CSS for utility classes
- Follow the dark theme configuration in `frontend.tsx`

### Code Quality
- Code is automatically formatted on save with Biome
- Run `bun run check` for manual formatting
- Use `bun run lint` to check for issues

## Key Files and Configuration

### Main Entry Points
- `src/index.ts` - Unified server entry point (handles both dev and prod)
- `src/frontend.tsx` - React client entry point
- `src/vite.ts` - Vite server configuration for development
- `src/api/index.tsx` - Main API router

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `biome.json` - Code formatting and linting rules
- `bunfig.toml` - Bun configuration
- `prisma.config.ts` - Prisma configuration
- `playwright.config.ts` - Playwright test configuration

## Special Features

### Single Port Architecture
The development server runs both backend and frontend on the same port using Vite's middleware mode. In development, requests are handled by Vite middleware, while in production, static files are served from the `dist` directory.

### React Dev Inspector
Enables clicking on elements in the browser to jump directly to the corresponding source code in your editor. Activated with Shift+A by default.

### Contract-First API
API schemas defined in the backend are automatically converted to TypeScript types for frontend use, ensuring type safety across the full stack.

## Testing
- Unit and integration tests use Bun's native test runner
- E2E tests use Playwright
- API tests are located in `__tests__/api/`
- Visual test UI available with `bun run test:ui`