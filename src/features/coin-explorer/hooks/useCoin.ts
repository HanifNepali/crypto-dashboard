import { useQuery } from "@tanstack/react-query";
import { fetchCoin } from "../api/coinsApi";
import { coinExplorerKeys } from "../queryKeys";

export function useCoin(id: string) {
  return useQuery({
    queryKey: coinExplorerKeys.coin(id),
    queryFn: () => fetchCoin(id),
    enabled: id.length > 0,
    refetchInterval: 60_000,
  });
}
