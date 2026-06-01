import { useQuery } from "@tanstack/react-query";
import { searchCoins } from "@/lib/api/searchApi";
import { fetchMarkets } from "@/lib/api/marketApi";
import { marketExplorerKeys } from "../queryKeys";
import { SEARCH_RESULT_LIMIT } from "../constants";

export function useMarketExplorerSearch(query: string) {
  return useQuery({
    queryKey: marketExplorerKeys.search(query),
    queryFn: async () => {
      const matches = await searchCoins(query);
      const ids = matches.slice(0, SEARCH_RESULT_LIMIT).map((c) => c.id);
      if (ids.length === 0) return [];
      return fetchMarkets({
        ids: ids.join(","),
        per_page: SEARCH_RESULT_LIMIT,
        price_change_percentage: "24h,7d",
        sparkline: true,
      });
    },
    enabled: query.trim().length > 1,
    staleTime: 30_000,
  });
}
