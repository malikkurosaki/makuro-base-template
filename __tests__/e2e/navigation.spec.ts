import { test, expect } from "@playwright/test";

test.describe("Navigation Integrity", () => {
	test("should navigate through landing page correctly", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Build Faster with Bun Stack")).toBeVisible();

		// Go to Sign In
		await page.getByRole("link", { name: "Sign In" }).click();
		await expect(page).toHaveURL(/.*\/signin/);
		await expect(page.getByText("Welcome back!")).toBeVisible();

		// Go to Signup from Signin
		await page.getByRole("button", { name: "Create account" }).click();
		await expect(page).toHaveURL(/.*\/signup/);
		await expect(page.getByText("Create an account")).toBeVisible();

		// Go back to Signin from Signup
		await page.getByRole("button", { name: "Sign in" }).click();
		await expect(page).toHaveURL(/.*\/signin/);
	});

	test("should show 404 page for non-existent routes", async ({ page }) => {
		await page.goto("/this-page-does-not-exist");
		await expect(page.getByText("Halaman Tidak Ditemukan")).toBeVisible();
		await expect(page.getByText("404")).toBeVisible();
		
		// Button to go home
		await page.getByRole("link", { name: "Kembali ke Beranda" }).click();
		await expect(page).toHaveURL("/");
	});
});
