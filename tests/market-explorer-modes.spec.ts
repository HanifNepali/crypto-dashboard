import { test, expect } from '@playwright/test';
import { mockCoingeckoApi } from './fixtures/mockCoingecko';

test.describe('Market Explorer mode switch', () => {
  test('switches from server-paginated browse to client-paginated search and back', async ({
    page,
  }) => {
    await mockCoingeckoApi(page);
    await page.goto('/');
    // await Promise.all([
    //   page.waitForResponse(
    //     (res) => res.url().includes('/coins/markets') && !res.url().includes('ids=ethereum')
    //   ),
    //   page.goto('/'),
    // ]);

    const marketExplorer = page.locator('section', { hasText: 'Market Data Explorer' });
    const categorySelect = marketExplorer.getByRole('combobox', { name: /filter by category/i });
    const searchInput = marketExplorer.getByPlaceholder(/search coins/i);
    const pagination = marketExplorer.getByRole('navigation', { name: 'pagination' });

    // Browse mode: category filter enabled, "Page 1" pagination style visible.
    await expect(categorySelect).toBeEnabled();
    // "Page -1" text on the left side of pagination
    //  Does not use a pagination component for it, it uses a <p> tag
    await expect(marketExplorer.getByText('Page 1').first()).toBeVisible();

    // Switch to search mode.
    await searchInput.fill('eth');
    await expect(marketExplorer.getByText('Ethereum')).toBeVisible();
    await expect(categorySelect).toBeDisabled();
    await expect(marketExplorer.getByText(/showing 1–1 of 1/i)).toBeVisible();

    // Clear search — should revert to browse mode.
    await searchInput.fill('');
    await expect(categorySelect).toBeEnabled();
    await expect(pagination.getByText('Page 1')).toBeVisible();
    await expect(marketExplorer.getByText('Bitcoin')).toBeVisible();
  });

  test('sorting the Market Cap column re-fetches with the new order', async ({ page }) => {
    await mockCoingeckoApi(page);
    await page.goto('/');

    const marketExplorer = page.locator('section', { hasText: 'Market Data Explorer' });

    const [request] = await Promise.all([
      page.waitForRequest((req) => req.url().includes('order=market_cap_asc')),
      marketExplorer.getByRole('button', { name: /market cap/i }).click(),
    ]);

    expect(request.url()).toContain('order=market_cap_asc');
  });
});
