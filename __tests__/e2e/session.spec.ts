import { test, expect } from "@playwright/test";

test.describe("Session & Security", () => {
	test("should redirect to signin when accessing /admin without login", async ({ page }) => {
		await page.goto("/admin");
		// Redirects to /profile then to /signin (because /profile also requires auth)
		await expect(page).toHaveURL(/.*\/signin/);
	});

	test("should stay logged in after page reload", async ({ page }) => {
		const testEmail = `test-session-${Date.now()}@example.com`;
		const testPassword = "Password123!";
		
		// Signup
		await page.goto("/signup");
		await page.getByLabel("Name").fill("Session User");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);
		await page.getByRole("button", { name: "Create account" }).click();

		// Should be on /profile (due to role:user redirect from /admin)
		await expect(page).toHaveURL(/.*\/profile/);
		await expect(page.getByText("Profil Saya")).toBeVisible();

		// Reload
		await page.reload();

		// Should still be on /profile and logged in
		await expect(page).toHaveURL(/.*\/profile/);
		await expect(page.getByText("Profil Saya")).toBeVisible();
		await expect(page.getByText(testEmail).first()).toBeVisible();
	});
});
