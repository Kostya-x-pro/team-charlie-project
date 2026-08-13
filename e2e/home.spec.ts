import { expect, test } from '@playwright/test';

test('главная страница открывается', async ({ page }) => {
  await page.goto('/en');

  await expect(page).toHaveTitle('Team Charlie Project');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
