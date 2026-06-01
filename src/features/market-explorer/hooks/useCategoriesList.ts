import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesList } from "../api/categoriesListApi";
import { marketExplorerKeys } from "../queryKeys";

export function useCategoriesList() {
  return useQuery({
    queryKey: marketExplorerKeys.categories,
    queryFn: fetchCategoriesList,
    staleTime: 24 * 60 * 60 * 1000,
  });
}
