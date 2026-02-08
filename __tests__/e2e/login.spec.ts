import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should see signin page content', async ({ page }) => {
    // Go to the signin page
    await page.goto('/signin');

    // Check if the signin page content is visible
    await expect(page.locator('h1')).toContainText('Welcome back!');
    await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();
  });

  test('should redirect to signin if not authenticated', async ({ page }) => {
    // Clear cookies/storage to ensure we are not authenticated
    await page.goto('/signin');
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    // Try to access the profile page (which is protected)
    await page.goto('/profile');

    // Should be redirected back to signin
    await expect(page).toHaveURL(/\/signin/);
  });
});