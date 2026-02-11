import { test, expect } from "@playwright/test";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

test.describe("API Key Management", () => {
	const testEmail = `admin-test-${Date.now()}@example.com`;
	const testPassword = "Password123!";
	const testName = "Admin User";

	test("should create and delete API key successfully", async ({ page }) => {
		// 1. Signup
		await page.goto("/signup");
		await page.getByLabel("Name").fill(testName);
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);
		await page.getByRole("button", { name: "Create account" }).click();
		await expect(page).toHaveURL(/.*\/profile/);

		// 2. Promote to admin via database
		await prisma.user.update({
			where: { email: testEmail },
			data: { role: "admin" },
		});

		// 3. Sign out and sign in again to refresh session role
		await page.getByRole("button", { name: "Keluar" }).click();
		await page.getByRole("button", { name: "Keluar" }).nth(1).click();
		await expect(page).toHaveURL(/.*\/signin/);

		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill(testPassword);
		await page.getByRole("button", { name: "Sign in" }).click();
		
		// 4. Go to Admin API Key page
		await page.goto("/admin/apikey");
		await expect(page).toHaveURL(/.*\/admin\/apikey/);
		await expect(page.getByText("API Keys Management")).toBeVisible();

		// 5. Create API Key
		await page.getByRole("button", { name: "Create New API Key" }).first().click();
		await page.getByLabel("API Key Name").fill("Test Key");
		await page.getByRole("button", { name: "Create API Key" }).click();

		// 6. Verify it appears in the list
		await expect(page.getByText("Test Key")).toBeVisible();
		await expect(page.getByText("••••••••••••••••••••••••••••••••")).toBeVisible();

		// 7. Delete API Key
		await page.getByRole("button", { name: "Delete API Key" }).first().click();
		await expect(page.getByText("Are you sure you want to delete this API key?")).toBeVisible();
		await page.getByRole("button", { name: "Delete API Key" }).nth(1).click();

		// 8. Verify it's gone
		await expect(page.getByText("Test Key")).not.toBeVisible();
		await expect(page.getByText("No API keys created yet")).toBeVisible();
	});
});
