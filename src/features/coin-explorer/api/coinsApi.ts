import { coingeckoClient } from "@/lib/api/client";
import { coinDetailSchema, type CoinDetail } from "../schemas/coin.schema";
import {
  marketChartSchema,
  type MarketChart,
} from "../schemas/marketChart.schemas";
import {
  searchResponseSchema,
  type SearchCoin,
} from "../schemas/search.schema";

export async function fetchCoin(id: string): Promise<CoinDetail> {
  const { data } = await coingeckoClient.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return coinDetailSchema.parse(data);
}

export async function fetchCoinMarketChart(
  id: string,
  days: number,
): Promise<MarketChart> {
  const { data } = await coingeckoClient.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: "usd", days },
  });
  return marketChartSchema.parse(data);
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const { data } = await coingeckoClient.get("/search", { params: { query } });
  return searchResponseSchema.parse(data).coins;
}
