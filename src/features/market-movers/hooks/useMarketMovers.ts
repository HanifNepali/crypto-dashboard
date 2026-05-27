import { useQuery } from "@tanstack/react-query";
import { fetchTopGainersLosers } from "../api/moversApi";
import { marketMoversKeys } from "../queryKeys";

export function useMarketMovers() {
  return useQuery({
    queryKey: marketMoversKeys.all,
    queryFn: fetchTopGainersLosers,
    refetchInterval: 60_000,
  });
}
