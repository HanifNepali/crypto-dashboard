import { coingeckoClient } from "@/lib/api/client";
import {
  categoriesMarketResponseSchema,
  type CategoryMarket,
} from "../schemas/categories.schema";

export async function fetchMarketCategories(): Promise<CategoryMarket[]> {
  const { data } = await coingeckoClient.get("/coins/categories", {
    params: { order: "market_cap_desc" },
  });
  return categoriesMarketResponseSchema.parse(data);
}
