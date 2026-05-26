import { useQuery } from "@tanstack/react-query";
import { fetchMarkets } from "@/lib/api/marketApi";
import { topCryptocurrenciesKeys } from "../queryKeys";

export function useTopCryptocurrencies() {
  return useQuery({
    queryKey: topCryptocurrenciesKeys.all,
    queryFn: () =>
      fetchMarkets({
        per_page: 5,
        page: 1,
        price_change_percentage: "24h",
      }),
    refetchInterval: 60_000, //60 seconds
  });
}
