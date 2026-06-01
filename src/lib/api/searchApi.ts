import { coingeckoClient } from "@/lib/api/client";
import { searchResponseSchema, type SearchCoin } from "./schemas/search.schema";

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const { data } = await coingeckoClient.get("/search", { params: { query } });
  return searchResponseSchema.parse(data).coins;
}
