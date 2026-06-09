import type { Page } from '@playwright/test';

const globalResponse = {
  data: {
    active_cryptocurrencies: 15234,
    markets: 1102,
    total_market_cap: { usd: 3_200_000_000_000 },
    total_volume: { usd: 98_000_000_000 },
    market_cap_percentage: { btc: 54.2 },
    market_cap_change_percentage_24h_usd: 1.8,
  },
};

function makeCoin(overrides: Record<string, unknown>) {
  return {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/btc.png',
    current_price: 65000,
    market_cap: 1_280_000_000_000,
    market_cap_rank: 1,
    total_volume: 32_000_000_000,
    price_change_percentage_24h: 2.5,
    price_change_percentage_7d_in_currency: 4.1,
    sparkline_in_7d: { price: [64000, 64500, 65000] },
    ...overrides,
  };
}

const topCoins = [
  makeCoin({}),
  makeCoin({
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    market_cap_rank: 2,
    current_price: 3200,
    market_cap: 400_000_000_000,
  }),
];

const ethereumDetail = {
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image: { large: 'eth-large.png', small: 'eth-small.png', thumb: 'eth-thumb.png' },
  market_data: {
    current_price: { usd: 3200 },
    price_change_percentage_24h: -1.2,
    market_cap: { usd: 400_000_000_000 },
    total_volume: { usd: 18_000_000_000 },
    high_24h: { usd: 3300 },
    low_24h: { usd: 3100 },
    circulating_supply: 120_000_000,
  },
};

const bitcoinDetail = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: { large: 'btc-large.png', small: 'btc-small.png', thumb: 'btc-thumb.png' },
  market_data: {
    current_price: { usd: 65000 },
    price_change_percentage_24h: 2.5,
    market_cap: { usd: 1_280_000_000_000 },
    total_volume: { usd: 32_000_000_000 },
    high_24h: { usd: 66000 },
    low_24h: { usd: 63500 },
    circulating_supply: 19_800_000,
  },
};

const chartResponse = {
  prices: [
    [1710000000000, 64000],
    [1710003600000, 64500],
    [1710007200000, 65000],
  ],
};

const trendingResponse = {
  coins: [
    {
      item: {
        id: 'solana',
        name: 'Solana',
        symbol: 'sol',
        market_cap_rank: 5,
        thumb: 'sol-thumb.png',
        score: 0,
        data: { price: 150, price_change_percentage_24h: { usd: 3.4 } },
      },
    },
  ],
};

const categoriesListResponse = [
  { category_id: 'layer-1', name: 'Layer 1 (L1)' },
  { category_id: 'decentralized-finance-defi', name: 'Decentralized Finance (DeFi)' },
];

const categoriesMarketResponse = [
  {
    id: 'layer-1',
    name: 'Layer 1 (L1)',
    market_cap: 2_000_000_000_000,
    market_cap_change_24h: -1.1,
    volume_24h: 40_000_000_000,
  },
];

// Playwright's page.route() matches in LIFO order
// — the most recently registered handler wins, not "first registered, first matched"

export async function mockCoingeckoApi(page: Page) {
  await page.route('**/api.coingecko.com/api/v3/global', (route) =>
    route.fulfill({ json: globalResponse })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/top_gainers_losers*', (route) =>
    route.fulfill({ status: 404, json: { error: 'not available on free tier' } })
  );

  await page.route('**/api.coingecko.com/api/v3/search/trending', (route) =>
    route.fulfill({ json: trendingResponse })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/categories/list', (route) =>
    route.fulfill({ json: categoriesListResponse })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/categories*', (route) =>
    route.fulfill({ json: categoriesMarketResponse })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/bitcoin', (route) =>
    route.fulfill({ json: bitcoinDetail })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/ethereum', (route) =>
    route.fulfill({ json: ethereumDetail })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/*/market_chart*', (route) =>
    route.fulfill({ json: chartResponse })
  );

  await page.route('**/api.coingecko.com/api/v3/search?query=eth*', (route) =>
    route.fulfill({
      json: {
        coins: [
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'eth',
            market_cap_rank: 2,
            thumb: 'eth-thumb.png',
          },
        ],
      },
    })
  );

  // Playwright matches routes LIFO (last registered, first matched), so the
  // generic /coins/markets catch-all must be registered BEFORE this more
  // specific ids= route — otherwise the catch-all (registered later) would
  // shadow it and this handler would never fire.
  await page.route('**/api.coingecko.com/api/v3/coins/markets*', (route) =>
    route.fulfill({ json: topCoins })
  );

  await page.route('**/api.coingecko.com/api/v3/coins/markets?*ids=ethereum*', (route) =>
    route.fulfill({ json: [topCoins[1]] })
  );
}
