import { useQuery } from "@tanstack/react-query";
import { fetchGlobalMarket } from "../api/globalApi";
import { globalMarketKeys } from "../queryKeys";

export function useGlobalMarket() {
  return useQuery({
    queryKey: globalMarketKeys.all,
    queryFn: fetchGlobalMarket,
    refetchInterval: 60_000, //60 seconds
  });
}
