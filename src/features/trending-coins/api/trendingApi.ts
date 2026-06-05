import { coingeckoClient } from "@/lib/api/client";
import {
  trendingResponseSchema,
  type TrendingItem,
} from "../schemas/trending.schema";

export async function fetchTrendingCoins(): Promise<TrendingItem[]> {
  const { data } = await coingeckoClient.get("/search/trending");
  const parsed = trendingResponseSchema.parse(data);
  return parsed.coins.map((c) => c.item);
}
