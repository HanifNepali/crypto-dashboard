export const SEARCH_RESULT_LIMIT = 100;
export const SEARCH_PAGE_SIZE = 10;
export const BROWSE_PAGE_SIZE = 10;

export const CATEGORY_OPTIONS = [
  { label: "All", match: null },
  { label: "DeFi", match: "Decentralized Finance" },
  { label: "Layer 1", match: "Layer 1" },
  { label: "Layer 2", match: "Layer 2" },
  { label: "AI", match: "Artificial Intelligence" },
  { label: "Gaming", match: "Gaming" },
  { label: "Meme", match: "Meme" },
] as const;

export const COLUMN_DEFS = [
  { key: "rank", label: "#", defaultVisible: true, toggleable: false },
  { key: "coin", label: "Coin", defaultVisible: true, toggleable: false },
  { key: "price", label: "Price", defaultVisible: true, toggleable: false },
  { key: "change24h", label: "24h", defaultVisible: true, toggleable: true },
  { key: "change7d", label: "7d", defaultVisible: true, toggleable: true },
  {
    key: "marketCap",
    label: "Market Cap",
    defaultVisible: true,
    toggleable: true,
  },
  {
    key: "volume",
    label: "Volume 24h",
    defaultVisible: true,
    toggleable: true,
  },
  {
    key: "circulatingSupply",
    label: "Circulating Supply",
    defaultVisible: false,
    toggleable: true,
  },
  {
    key: "sparkline",
    label: "7d Chart",
    defaultVisible: false,
    toggleable: true,
  },
] as const;
