import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";
import type { SortKey, SortDirection } from "../types/marketExplorer.types";

function getSortValue(coin: CoinMarket, key: SortKey): number | null {
  switch (key) {
    case "rank":
      return coin.market_cap_rank;
    case "marketCap":
      return coin.market_cap;
    case "volume":
      return coin.total_volume;
    default:
      return null;
  }
}

export function sortCoins(
  coins: CoinMarket[],
  sortKey: SortKey,
  direction: SortDirection,
): CoinMarket[] {
  const sorted = [...coins].sort((a, b) => {
    const aVal = getSortValue(a, sortKey);
    const bVal = getSortValue(b, sortKey);
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    return aVal - bVal;
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
