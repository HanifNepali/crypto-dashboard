export const coinExplorerKeys = {
  coin: (id: string) => ["coinExplorer", "coin", id] as const,
  chart: (id: string, days: number) =>
    ["coinExplorer", "chart", id, days] as const,
  search: (query: string) => ["coinExplorer", "search", query] as const,
};
