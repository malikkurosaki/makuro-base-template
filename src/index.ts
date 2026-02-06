/** biome-ignore-all lint/suspicious/noExplicitAny: penjelasannya */
import fs from "node:fs";
import path from "node:path";
import { Elysia } from "elysia";
import { openInEditor } from "./utils/open-in-editor";
import { createVite } from "./vite";
import { apikey } from "./api/apikey";
import { auth } from "./utils/auth";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { apiMiddleware } from "./middleware/apiMiddleware";


const api = new Elysia({
	prefix: "/api",
})
	.all("/auth/*", ({ request }) => auth.handler(request))
	.use(cors())
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "Bun + React API",
					version: "1.0.0",
				},
			},
		}),
	)
	.get("/session", async ({ request }) => {
		const data = await auth.api.getSession({ headers: request.headers });
		return { data };
	})
	.use(apiMiddleware)
	.use(apikey);

const vite = await createVite();
const app = new Elysia()

	.post("/__open-in-editor", ({ body }) => {
		const { relativePath, lineNumber, columnNumber } = body as {
			relativePath: string;
			lineNumber: number;
			columnNumber: number;
		};

		openInEditor(relativePath, {
			line: lineNumber,
			column: columnNumber,
			editor: "antigravity",
		});

		return { ok: true };
	})
	.use(api);

// Vite middleware for other requests
app.all("*", async ({ request }) => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Serve transformed index.html for root or any path that should be handled by the SPA
	// We check if it's not a file request (doesn't have a file extension or is a known SPA route)
	if (
		pathname === "/" ||
		(!pathname.includes(".") &&
			!pathname.startsWith("/@") &&
			!pathname.startsWith("/inspector") &&
			!pathname.startsWith("/__open-stack-frame-in-editor"))
	) {
		try {
			const htmlPath = path.resolve("src/index.html");
			let html = fs.readFileSync(htmlPath, "utf-8");
			html = await vite.transformIndexHtml(pathname, html);

			return new Response(html, {
				headers: { "Content-Type": "text/html" },
			});
		} catch (e) {
			console.error(e);
		}
	}

	return new Promise<Response>((resolve) => {
		// Use a Proxy to mock Node.js req because Bun's Request is read-only
		const req = new Proxy(request, {
			get(target, prop) {
				if (prop === "url") return pathname + url.search;
				if (prop === "method") return request.method;
				if (prop === "headers")
					return Object.fromEntries(request.headers as any);
				return (target as any)[prop];
			},
		}) as any;

		const res = {
			statusCode: 200,
			setHeader(name: string, value: string) {
				this.headers[name.toLowerCase()] = value;
			},
			getHeader(name: string) {
				return this.headers[name.toLowerCase()];
			},
			headers: {} as Record<string, string>,
			end(data: any) {
				// Handle potential Buffer or string data from Vite
				let body = data;
				if (data instanceof Uint8Array) {
					body = data;
				} else if (typeof data === "string") {
					body = data;
				} else if (data) {
					body = String(data);
				}

				resolve(
					new Response(body || "", {
						status: this.statusCode,
						headers: this.headers,
					}),
				);
			},
			// Minimal event emitter mock
			once() {
				return this;
			},
			on() {
				return this;
			},
			emit() {
				return this;
			},
			removeListener() {
				return this;
			},
		} as any;

		vite.middlewares(req, res, (err: any) => {
			if (err) {
				console.error("Vite middleware error:", err);
				resolve(new Response(err.stack || err.toString(), { status: 500 }));
				return;
			}
			// If Vite doesn't handle it, return 404
			resolve(new Response("Not Found", { status: 404 }));
		});
	});
});

app.listen(3000);

console.log("🚀 Server running at http://localhost:3000");

export type ApiApp = typeof app;