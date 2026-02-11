import { test, expect } from "@playwright/test";

test.describe("Profile Management", () => {
	test("should update user name successfully", async ({ page }) => {
		const testEmail = `test-profile-${Date.now()}@example.com`;
		const newName = "Updated Name";
		
		// Signup
		await page.goto("/signup");
		await page.getByLabel("Name").fill("Original Name");
		await page.getByLabel("Email").fill(testEmail);
		await page.getByLabel("Password").fill("Password123!");
		await page.getByRole("button", { name: "Create account" }).click();

		// Wait for redirect to profile
		await expect(page).toHaveURL(/.*\/profile/);
		await expect(page.getByText("Profil Saya")).toBeVisible();

		// Go to edit profile
		await page.goto("/profile/edit");
		await expect(page.getByLabel("Nama Lengkap")).toHaveValue("Original Name");

		// Update name
		await page.getByLabel("Nama Lengkap").fill(newName);
		await page.getByRole("button", { name: "Simpan Perubahan" }).click();

		// Should redirect back to profile
		await expect(page).toHaveURL(/.*\/profile/);
		
		// Reload to force fresh session fetch if needed
		await page.reload();
		await expect(page.getByRole("heading", { name: newName })).toBeVisible();
	});
});
