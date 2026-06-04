import { useQuery } from "@tanstack/react-query";
import { fetchMarkets } from "@/lib/api/marketApi";
import { livePricesKeys } from "../queryKeys";
import { LIVE_PRICE_COIN_IDS } from "../constants";

export function useLivePrices() {
  return useQuery({
    queryKey: livePricesKeys.all,
    queryFn: () =>
      fetchMarkets({
        ids: LIVE_PRICE_COIN_IDS.join(","),
        price_change_percentage: "24h",
        sparkline: true,
      }),
    refetchInterval: 30_000,
  });
}
