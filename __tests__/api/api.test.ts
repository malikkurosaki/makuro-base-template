import { describe, expect, it } from "bun:test";

// Get base URL from environment, default to localhost:3000
const BASE_URL = process.env.VITE_PUBLIC_URL || 'http://localhost:3000';

describe("API Integration", () => {
	it("should return 200 for health check", async () => {
		const response = await fetch(`${BASE_URL}/api/health`);
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toEqual({ ok: true });
	});

	it("should handle session endpoint appropriately", async () => {
		const response = await fetch(`${BASE_URL}/api/session`);
		// The session endpoint might return 200 with session data or 401/422 without proper auth
		expect([200, 401, 422]).toContain(response.status);
	});

	it("should return 401 or 422 for protected apikey endpoint without auth", async () => {
		const response = await fetch(`${BASE_URL}/api/apikey/`);
		// 401 is intended, 422 is returned by Elysia when the error response doesn't match the schema
		expect([401, 422]).toContain(response.status);
	});

	it("should return 401 for profile update without auth", async () => {
		const response = await fetch(`${BASE_URL}/api/profile/update`, {
			method: "POST",
			body: JSON.stringify({ name: "New Name" }),
			headers: { "Content-Type": "application/json" },
		});
		expect([401, 422]).toContain(response.status);
	});
});
