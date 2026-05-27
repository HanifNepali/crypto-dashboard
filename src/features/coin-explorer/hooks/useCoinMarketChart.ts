import { useQuery } from "@tanstack/react-query";
import { fetchCoinMarketChart } from "../api/coinsApi";
import { coinExplorerKeys } from "../queryKeys";

export function useCoinMarketChart(id: string, days: number) {
  return useQuery({
    queryKey: coinExplorerKeys.chart(id, days),
    queryFn: () => fetchCoinMarketChart(id, days),
    enabled: id.length > 0,
    staleTime: 60_000,
  });
}
