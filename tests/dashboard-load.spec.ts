import { test, expect } from '@playwright/test';
import { mockCoingeckoApi } from './fixtures/mockCoingecko';

test.describe('Dashboard load', () => {
  test('renders all primary and secondary sections without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await mockCoingeckoApi(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Total Market Cap')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Top Cryptocurrencies' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Market Categories' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Coin Explorer' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Market Data Explorer' })).toBeVisible();
    await expect(page.getByText('Live Prices')).toBeVisible();
    await expect(page.getByText('Trending Coins')).toBeVisible();
    await expect(page.getByText('Solana')).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test('sidebar and header render correctly', async ({ page }) => {
    await mockCoingeckoApi(page);
    await page.goto('/');

    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByText(/welcome back/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to/i })).toBeVisible();
  });
});
