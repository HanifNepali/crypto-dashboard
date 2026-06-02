import type { COLUMN_DEFS } from "../constants";

export type SortKey = "rank" | "marketCap" | "volume";
export type SortDirection = "asc" | "desc";

export type ColumnKey = (typeof COLUMN_DEFS)[number]["key"];
