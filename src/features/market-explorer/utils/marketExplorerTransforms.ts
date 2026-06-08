import type { CoinMarket } from '@/lib/api/schemas/coinMarket.schema';
import type { SortKey, SortDirection } from '../types/marketExplorer.types';

function getSortValue(coin: CoinMarket, key: SortKey): number | null {
  switch (key) {
    case 'rank':
      return coin.market_cap_rank;
    case 'marketCap':
      return coin.market_cap;
    case 'volume':
      return coin.total_volume;
    default:
      return null;
  }
}

export function sortCoins(
  coins: CoinMarket[],
  sortKey: SortKey,
  direction: SortDirection
): CoinMarket[] {
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...coins].sort((a, b) => {
    const aVal = getSortValue(a, sortKey);
    const bVal = getSortValue(b, sortKey);

    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    return (aVal - bVal) * multiplier;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
