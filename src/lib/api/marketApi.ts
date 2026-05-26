import { coingeckoClient } from "@/lib/api/client";
import {
  coinMarketsResponseSchema,
  type CoinMarket,
} from "./schemas/coinMarket.schema";

export interface FetchMarketsParams {
  vs_currency?: string;
  order?: string;
  per_page?: number;
  page?: number;
  price_change_percentage?: string;
  sparkline?: boolean;
  category?: string;
  ids?: string;
}

export async function fetchMarkets(
  params: FetchMarketsParams,
): Promise<CoinMarket[]> {
  const { data } = await coingeckoClient.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      ...params,
    },
  });
  return coinMarketsResponseSchema.parse(data);
}
