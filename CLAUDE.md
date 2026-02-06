# CLAUDE.md

## Project Overview

This repository uses **Bun + Elysia** as the single HTTP server and **Vite (middleware mode)** to serve a **React** frontend on the **same port** during development. The goal is a clean DX with **one origin**, **no proxy**, **no CORS**, and support for **react-dev-inspector** (click element → open editor).

**Key principles**:

* Bun/Elysia owns the port (e.g. `http://localhost:3000`).
* Vite runs **as middleware**, not as a standalone dev server.
* React Dev Inspector is enabled **only in dev**.
* Production build does **not** depend on Vite middleware.

---

## Stack

* Runtime: **Bun**
* Server: **Elysia**
* Frontend: **React**
* Tooling (dev): **Vite (middleware mode)**
* Inspector: **react-dev-inspector**

---

## Dev Architecture (Single Port)

```
Browser
  ↓
http://localhost:3000
  ↓
Elysia (Bun)
 ├─ API routes
 ├─ react-dev-inspector middleware
 └─ Vite middlewares (HMR, transforms)
```

**Why this matters**:

* No split ports
* No proxy rewrites
* Stable source maps for inspector

---

## Vite API (Important)

> **Vite version matters.**

* For **Vite v3–v4**: `createServer` is imported from `'vite'`.
* For **Vite v7+**: **Node APIs are exported from `vite/node`**.

**Use this for Vite v7+**:

```ts
import { createServer } from 'vite/node'
import type { ViteDevServer } from 'vite'
```

Do **not** import from internal paths like `vite/dist/*`.

---

## TypeScript Requirements

Ensure TypeScript can resolve Vite types correctly:

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "types": ["bun-types", "vite/client"],
    "jsx": "react-jsx"
  }
}
```

If TypeScript cannot find `createServer`, check:

* Vite major version
* Import path (`vite/node` for v7+)
* `types` includes `vite/client`

---

## Development Flow

1. Start Bun server (`bun run dev`).
2. Elysia boots and creates a Vite dev server in **middleware mode**.
3. Requests are handled by Elysia and passed to Vite middlewares.
4. React loads with HMR and Inspector enabled.
5. **Alt/Option + Click** on a React element opens the source file.

---

## Inspector Usage

* Shortcut:

  * macOS: **Option + Click**
  * Windows/Linux: **Alt + Click**
* Editor can be configured in the Vite plugin:

```ts
Inspector({ editor: 'code' }) // VS Code
```

Inspector should be **disabled in production**.

---

## Production Notes

* Vite middleware is **dev-only**.
* Production should serve:

  * Prebuilt static assets (Vite build output), or
  * SSR output (if enabled later).
* Elysia remains the single server in all environments.

---

## Common Pitfalls

* ❌ Running Vite as a separate server (breaks single-port goal)
* ❌ Importing `createServer` from `'vite'` on Vite v7+
* ❌ Using internal Vite paths (`vite/dist/*`)
* ❌ Missing `vite/client` types

---

## Goals for Contributors

* Keep **one-port architecture** intact.
* Do not introduce dev proxies unless absolutely required.
* Prefer Bun-native solutions.
* Avoid relying on undocumented Vite internals.

---

## References

* Vite JavaScript API (v3): [https://v3.vite.dev/guide/api-javascript.html](https://v3.vite.dev/guide/api-javascript.html)
* Vite latest docs: [https://vite.dev/](https://vite.dev/)
* react-dev-inspector: [https://react-dev-inspector.zthxxx.me/](https://react-dev-inspector.zthxxx.me/)

---

If anything here becomes unclear, **check the Vite major version first** — most integration issues come from API changes across versions.
