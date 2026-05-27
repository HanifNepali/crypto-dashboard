import { fetchMarkets } from "@/lib/api/marketApi";
import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";

const MIN_24H_VOLUME = 50_000;
const SAMPLE_SIZE = 250;

export interface TopGainersLosers {
  top_gainers: CoinMarket[];
  top_losers: CoinMarket[];
}

export async function fetchTopGainersLosers(): Promise<TopGainersLosers> {
  const coins = await fetchMarkets({
    per_page: SAMPLE_SIZE,
    page: 1,
    price_change_percentage: "24h",
  });

  const eligibleCoins = coins.filter(
    (coin) =>
      coin.total_volume >= MIN_24H_VOLUME &&
      coin.price_change_percentage_24h !== null,
  );

  const sortedCoins = [...eligibleCoins].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) -
      (a.price_change_percentage_24h ?? 0),
  );

  return {
    top_gainers: sortedCoins.slice(0, 5),
    top_losers: sortedCoins.slice(-5).reverse(),
  };
}
