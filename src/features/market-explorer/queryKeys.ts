export const marketExplorerKeys = {
  browse: (category: string | null, page: number, order: string) =>
    ["marketExplorer", "browse", category, page, order] as const,
  search: (query: string) => ["marketExplorer", "search", query] as const,
  categories: ["marketExplorer", "categories"] as const,
};
