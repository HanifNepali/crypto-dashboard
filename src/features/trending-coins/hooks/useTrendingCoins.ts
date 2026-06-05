import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoins } from "../api/trendingApi";
import { trendingCoinsKeys } from "../queryKeys";

export function useTrendingCoins() {
  return useQuery({
    queryKey: trendingCoinsKeys.all,
    queryFn: fetchTrendingCoins,
    staleTime: 5 * 60_000,
  });
}
