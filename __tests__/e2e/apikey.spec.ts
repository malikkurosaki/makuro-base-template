import { expect, test } from "@playwright/test";

test.describe("API Key Management", () => {
	test.beforeEach(async ({ page }) => {
		// Mock the session API to simulate being logged in as an admin
		await page.route("**/api/session", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({
					data: {
						user: {
							id: "user_123",
							name: "Test User",
							email: "test@example.com",
							role: "admin",
						},
					},
				}),
			});
		});

		// Mock the initial empty API keys list
		await page.route("**/api/apikey/", async (route) => {
			if (route.request().method() === "GET") {
				await route.fulfill({
					status: 200,
					contentType: "application/json",
					body: JSON.stringify({ apiKeys: [] }),
				});
			} else {
				await route.continue();
			}
		});
	});

	test("should create, update, and delete an API key", async ({ page }) => {
		// Go to the API Keys page
		await page.goto("/dashboard/apikey");

		// 1. CREATE
		await page.click('button:has-text("Create New API Key")');
		await page.fill(
			'input[placeholder="Enter a descriptive name for your API key"]',
			"My Test Key",
		);

		// Mock the creation response
		await page.route("**/api/apikey/", async (route) => {
			if (route.request().method() === "POST") {
				await route.fulfill({
					status: 200,
					contentType: "application/json",
					body: JSON.stringify({
						apiKey: {
							id: "key_1",
							name: "My Test Key",
							key: "sk-test-key-12345",
							isActive: true,
							expiresAt: null,
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						},
					}),
				});
			}
		});

		await page.click('button:has-text("Create API Key")');

		// Verify it appeared in the table
		const table = page.locator("table").first();
		await expect(table).toContainText("My Test Key");
		await expect(table).toContainText("••••••••");

		// 2. UPDATE (Toggle status)
		// Mock the update response
		await page.route("**/api/apikey/update", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({
					apiKey: {
						id: "key_1",
						name: "My Test Key",
						key: "sk-test-key-12345",
						isActive: false,
						expiresAt: null,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					},
				}),
			});
		});

		// Find and click the switch (Mantine Switch is usually an input type=checkbox)
		await page.click('input[type="checkbox"]', { force: true });

		// 3. DELETE
		// Mock the delete response
		await page.route("**/api/apikey/delete", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({ success: true }),
			});
		});

		await page.click("button:has(svg.tabler-icon-trash)");
		await page.click('button:has-text("Delete API Key")');

		// Verify it's gone
		await expect(table).not.toContainText("My Test Key");
		await expect(page.locator("text=No API keys created yet")).toBeVisible();
	});
});
