import { expect, test } from '@playwright/test';

test('главная страница открывается', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Team Charlie Project/);
  await expect(
    page.getByRole('heading', {
      name: 'Team Charlie Project',
      exact: true,
    }),
  ).toBeVisible();
});
