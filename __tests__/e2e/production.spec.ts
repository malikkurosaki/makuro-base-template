import { test, expect } from "@playwright/test";

test.describe("Production Build Verification", () => {
	test("should load landing page assets and components", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/Bun/);
		await expect(page.getByText("Everything You Need")).toBeVisible();
		// Check for an image to ensure assets are loading
		const heroImage = page.getByAltText("Code editor showing Bun Stack code");
		await expect(heroImage).toBeVisible();
	});

	test("should handle full flow: signup -> profile -> logout", async ({ page }) => {
		const testEmail = `prod-test-${Date.now()}@example.com`;
		
		// 1. Signup
		await page.goto("/signup");
		await page.getByLabel("Name").fill("Prod User");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill("Password123!");
		await page.getByRole("button", { name: "Create account" }).click();
		await expect(page).toHaveURL(/.*\/profile/);

		// 2. Profile check
		await expect(page.getByText("Profil Saya")).toBeVisible();
		await expect(page.getByText(testEmail).first()).toBeVisible();

		// 3. Logout
		await page.getByRole("button", { name: "Keluar" }).click();
		await page.getByRole("button", { name: "Keluar" }).nth(1).click(); // Modal button
		await expect(page).toHaveURL(/.*\/signin/);
	});
});
