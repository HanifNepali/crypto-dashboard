import { z } from "zod";

export const coinMarketSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number().nullable(),
  total_volume: z.number(),
  price_change_percentage_24h: z.number().nullable(),
  price_change_percentage_24h_in_currency: z.number().nullable().optional(),
  sparkline_in_7d: z.object({ price: z.array(z.number()) }).optional(),
});

export const coinMarketsResponseSchema = z.array(coinMarketSchema);

export type CoinMarket = z.infer<typeof coinMarketSchema>;
