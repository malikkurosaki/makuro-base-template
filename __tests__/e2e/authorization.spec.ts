import { test, expect } from "@playwright/test";

test.describe("Authorization", () => {
	test("should redirect regular user to profile when accessing /admin", async ({ page }) => {
		const testEmail = `test-user-${Date.now()}@example.com`;
		const testPassword = "Password123!";
		
		// Signup as regular user
		await page.goto("/signup");
		await page.getByLabel("Name").fill("Regular User");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);
		await page.getByRole("button", { name: "Create account" }).click();

		// Should be on /profile
		await expect(page).toHaveURL(/.*\/profile/);

		// Try to go to /admin
		await page.goto("/admin");

		// Should be redirected back to /profile because role is 'user'
		await expect(page).toHaveURL(/.*\/profile/);
	});
});
