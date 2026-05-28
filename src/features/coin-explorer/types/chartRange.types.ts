export type ChartRange = "24h" | "7d" | "30d" | "90d";

export const CHART_RANGE_DAYS: Record<ChartRange, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export const CHART_RANGE_OPTIONS: { label: string; value: ChartRange }[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
];
