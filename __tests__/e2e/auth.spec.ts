import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
	test.describe.configure({ mode: "serial" });

	const testEmail = `test-${Date.now()}@example.com`;
	const testPassword = "Password123!";
	const testName = "Test User";

	test("should signup successfully", async ({ page }) => {
		await page.goto("/signup");

		await page.getByLabel("Name").fill(testName);
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);

		await page.getByRole("button", { name: "Create account" }).click();

		// Should redirect to profile
		await expect(page).toHaveURL(/.*\/profile/);
		await expect(page.getByText("Profil Saya")).toBeVisible();
		await expect(page.getByRole("heading", { name: testName })).toBeVisible();
	});

	test("should show error for duplicate email", async ({ page }) => {
		await page.goto("/signup");

		await page.getByLabel("Name").fill(testName);
		await page.getByLabel("Email").fill(testEmail); // Already used in previous test
		await page.getByLabel("Password").fill(testPassword);

		await page.getByRole("button", { name: "Create account" }).click();

		// Should show error message
		await expect(page.locator("form")).toContainText(/email already exists|user already exists|failed to sign up/i);
	});

	test("should login successfully", async ({ page }) => {
		await page.goto("/signin");

		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);

		await page.getByRole("button", { name: "Sign in" }).click();

		// Should redirect to profile (since role is 'user')
		await expect(page).toHaveURL(/.*\/profile/);
		await expect(page.getByText("Profil Saya")).toBeVisible();
	});

	test("should show error for wrong password", async ({ page }) => {
		await page.goto("/signin");

		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill("wrong-password");

		await page.getByRole("button", { name: "Sign in" }).click();

		await expect(page.locator("form")).toContainText(/invalid/i);
	});

	test("should logout successfully", async ({ page }) => {
		// Login first
		await page.goto("/signin");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);
		await page.getByRole("button", { name: "Sign in" }).click();
		await expect(page).toHaveURL(/.*\/profile/);

		// Click Keluar button
		await page.getByRole("button", { name: "Keluar" }).click();

		// Confirm in modal
		await expect(page.getByText("Apakah Anda yakin ingin keluar dari akun Anda?")).toBeVisible();
		await page.getByRole("button", { name: "Keluar" }).nth(1).click();

		// Should redirect to signin
		await expect(page).toHaveURL(/.*\/signin/);
	});
});
