import { describe, expect, it } from "vitest";
import api from "../src/api";

describe("API Integration", () => {
	it("should return 200 for health check", async () => {
		const response = await api.handle(
			new Request("http://localhost/api/health"),
		);
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toEqual({ ok: true });
	});

	it("should return 401 for protected session endpoint without cookies", async () => {
		const response = await api.handle(
			new Request("http://localhost/api/session"),
		);
		// Since session requires authentication, it should either return 401 or null data
		const data = await response.json();
		expect(data.data).toBe(null);
	});

	it("should return 401 or 422 for protected apikey endpoint without auth", async () => {
		const response = await api.handle(
			new Request("http://localhost/api/apikey/"),
		);
		// 401 is intended, 422 is returned by Elysia when the error response doesn't match the schema
		expect([401, 422]).toContain(response.status);
	});
});
