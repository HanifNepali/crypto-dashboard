import { useQuery } from "@tanstack/react-query";
import { searchCoins } from "../api/coinsApi";
import { coinExplorerKeys } from "../queryKeys";

export function useCoinSearch(query: string) {
  return useQuery({
    queryKey: coinExplorerKeys.search(query),
    queryFn: () => searchCoins(query),
    enabled: query.trim().length > 1,
    staleTime: 30_000,
  });
}
