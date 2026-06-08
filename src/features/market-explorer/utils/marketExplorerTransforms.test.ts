import { describe, it, expect } from 'vitest';
import { sortCoins, paginate } from './marketExplorerTransforms';
import type { CoinMarket } from '@/lib/api/schemas/coinMarket.schema';

function makeCoin(overrides: Partial<CoinMarket>): CoinMarket {
  return {
    id: 'coin',
    symbol: 'coin',
    name: 'Coin',
    image: '',
    current_price: 0,
    market_cap: 0,
    market_cap_rank: null,
    total_volume: 0,
    price_change_percentage_24h: null,
    ...overrides,
  };
}

describe('sortCoins', () => {
  const coins = [
    makeCoin({ id: 'a', market_cap_rank: 3, market_cap: 100, total_volume: 50 }),
    makeCoin({ id: 'b', market_cap_rank: 1, market_cap: 300, total_volume: 10 }),
    makeCoin({ id: 'c', market_cap_rank: 2, market_cap: 200, total_volume: 30 }),
  ];

  it('sorts by rank ascending', () => {
    const result = sortCoins(coins, 'rank', 'asc');
    expect(result.map((c) => c.id)).toEqual(['b', 'c', 'a']);
  });

  it('sorts by rank descending', () => {
    const result = sortCoins(coins, 'rank', 'desc');
    expect(result.map((c) => c.id)).toEqual(['a', 'c', 'b']);
  });

  it('sorts by market cap descending', () => {
    const result = sortCoins(coins, 'marketCap', 'desc');
    expect(result.map((c) => c.id)).toEqual(['b', 'c', 'a']);
  });

  it('sorts by volume ascending', () => {
    const result = sortCoins(coins, 'volume', 'asc');
    expect(result.map((c) => c.id)).toEqual(['b', 'c', 'a']);
  });

  it('does not mutate the original array', () => {
    const original = [...coins];
    sortCoins(coins, 'rank', 'asc');
    expect(coins).toEqual(original);
  });

  it('pushes null values to the end regardless of direction', () => {
    const withNull = [
      makeCoin({ id: 'x', market_cap_rank: null }),
      makeCoin({ id: 'y', market_cap_rank: 5 }),
      makeCoin({ id: 'z', market_cap_rank: 1 }),
    ];

    expect(sortCoins(withNull, 'rank', 'asc').map((c) => c.id)).toEqual(['z', 'y', 'x']);
    expect(sortCoins(withNull, 'rank', 'desc').map((c) => c.id)).toEqual(['y', 'z', 'x']);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 45 }, (_, i) => i + 1);

  it('returns the first page correctly', () => {
    expect(paginate(items, 1, 20)).toEqual(items.slice(0, 20));
  });

  it('returns a middle page correctly', () => {
    expect(paginate(items, 2, 20)).toEqual(items.slice(20, 40));
  });

  it('returns a partial final page', () => {
    expect(paginate(items, 3, 20)).toEqual(items.slice(40, 45));
    expect(paginate(items, 3, 20)).toHaveLength(5);
  });

  it('returns an empty array for a page beyond the data', () => {
    expect(paginate(items, 10, 20)).toEqual([]);
  });
});
