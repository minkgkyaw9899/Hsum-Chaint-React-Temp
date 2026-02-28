import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the Next.js logo', async ({ page }) => {
    const logo = page.getByAltText('Next.js logo');
    await expect(logo).toBeVisible();
  });

  test('should have the correct heading text', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: /To get started, edit the page.tsx file/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should have a link to documentation', async ({ page }) => {
    const docLink = page.getByRole('link', { name: /Documentation/i });
    await expect(docLink).toBeVisible();
    await expect(docLink).toHaveAttribute('href', /nextjs.org\/docs/);
  });

  test('should have a link to deploy', async ({ page }) => {
    const deployLink = page.getByRole('link', { name: /Deploy Now/i });
    await expect(deployLink).toBeVisible();
    await expect(deployLink).toHaveAttribute('href', /vercel.com\/new/);
  });
});
