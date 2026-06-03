import { useQuery } from "@tanstack/react-query";
import { fetchMarketCategories } from "../api/categoriesApi";
import { marketCategoriesKeys } from "../queryKeys";

export function useMarketCategories() {
  return useQuery({
    queryKey: marketCategoriesKeys.all,
    queryFn: fetchMarketCategories,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: true,
  });
}
