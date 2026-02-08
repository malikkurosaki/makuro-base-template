import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test('should see signup page content', async ({ page }) => {
    // Go to the signup page
    await page.goto('/signup');

    // Check if the signup page content is visible
    await expect(page.locator('h1')).toContainText('Create an account');
    await expect(page.locator('button:has-text("Create account")')).toBeVisible();
    
    // Check for form fields
    await expect(page.getByPlaceholder('Your name')).toBeVisible();
    await expect(page.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('Your password')).toBeVisible();
  });

  test('should navigate to signin page from signup', async ({ page }) => {
    await page.goto('/signup');
    
    // Click on "Sign in" link
    await page.click('button:has-text("Sign in")');

    // Should be redirected to signin
    await expect(page).toHaveURL(/\/signin/);
  });
});
