src/vite.ts

```ts
import { createServer as createViteServer } from 'vite'
import react from '@vitejs/plugin-react'
import Inspector from '@react-dev-inspector/vite-plugin'

export async function createVite() {
  return createViteServer({
    root: process.cwd(),
    plugins: [
      react(),
      Inspector({
        editor: 'code'
      })
    ],
    server: {
      middlewareMode: true
    },
    appType: 'custom'
```

src/index.ts

```ts
import { Elysia } from 'elysia'
import { createVite } from './vite'
import fs from 'fs'
import path from 'path'

const vite = await createVite()
const app = new Elysia()

// 🔹 Vite middleware
app.use({
  name: 'vite',
  async fn(ctx) {
    await new Promise<void>((resolve, reject) => {
      vite.middlewares(ctx.req, ctx.res, err =>
        err ? reject(err) : resolve()
      )
    })
  }
})

// 🔹 Serve HTML entry
app.get('/', async ({ set }) => {
  const htmlPath = path.resolve('src/client/index.html')
  let html = fs.readFileSync(htmlPath, 'utf-8')

  html = await vite.transformIndexHtml('/', html)

  set.headers['content-type'] = 'text/html'
  return html
})

// 🔹 API contoh
app.get('/api/health', () => ({ ok: true }))

app.listen(3000)

console.log('🚀 http://localhost:3000')

```