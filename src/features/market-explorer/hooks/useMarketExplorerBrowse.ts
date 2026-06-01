import { useQuery } from "@tanstack/react-query";
import { fetchMarkets } from "@/lib/api/marketApi";
import { marketExplorerKeys } from "../queryKeys";
import type { SortKey, SortDirection } from "../types/marketExplorer.types";
import { BROWSE_PAGE_SIZE } from "../constants";

// 'rank' and 'marketCap' are equivalent orderings (rank asc === market_cap desc).
function toOrderParam(sortKey: SortKey, direction: SortDirection): string {
  if (sortKey === "volume")
    return direction === "asc" ? "volume_asc" : "volume_desc";

  // Inversely related by definition. Rank 1 = highest market cap. So:
  // Rank ascending (1, 2, 3…) = biggest coins first = market_cap_desc
  // Market Cap ascending (smallest number first) = literally market_cap_asc
  if (sortKey === "rank")
    return direction === "asc" ? "market_cap_desc" : "market_cap_asc";

  return direction === "asc" ? "market_cap_asc" : "market_cap_desc";
}

export function useMarketExplorerBrowse(
  category: string | null,
  page: number,
  sortKey: SortKey,
  sortDirection: SortDirection,
) {
  const order = toOrderParam(sortKey, sortDirection);

  return useQuery({
    queryKey: marketExplorerKeys.browse(category, page, order),
    queryFn: () =>
      fetchMarkets({
        per_page: BROWSE_PAGE_SIZE,
        page,
        category: category ?? undefined,
        order,
        price_change_percentage: "24h,7d",
        sparkline: true,
      }),
    staleTime: 60_000,
  });
}
