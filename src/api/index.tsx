import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import Elysia from "elysia";
import { apiMiddleware } from "../middleware/apiMiddleware";
import { auth } from "../utils/auth";
import { apikey } from "./apikey";
import { profile } from "./profile";

const isProduction = process.env.NODE_ENV === "production";

const api = new Elysia({
	prefix: "/api",
})
	.use(
		cors({
			origin: ["http://localhost:3000", "http://localhost:5173"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
		}),
	);

if (!isProduction) {
	api.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "Bun + React API",
					version: "1.0.0",
				},
			},
		}),
	);
}

api
	.get("/health", () => ({ ok: true }))
	.all("/auth/*", async ({ request }) => {
		console.log(`[AUTH] ${request.method} ${request.url}`);
		try {
			const res = await auth.handler(request);
			console.log(`[AUTH] Response status: ${res.status}`);
			return res;
		} catch (err) {
			console.error("[AUTH ERROR]", err);
			throw err;
		}
	})
	.get("/session", async ({ request }) => {
		const data = await auth.api.getSession({ headers: request.headers });
		return { data };
	})
	.use(apiMiddleware)
	.use(apikey)
	.use(profile);

export default api;
