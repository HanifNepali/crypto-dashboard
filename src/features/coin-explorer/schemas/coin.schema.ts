import { z } from "zod";

export const coinDetailSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.object({
    large: z.string(),
    small: z.string(),
    thumb: z.string(),
  }),
  market_data: z.object({
    current_price: z.record(z.string(), z.number()),
    price_change_percentage_24h: z.number().nullable(),
    market_cap: z.record(z.string(), z.number()),
    total_volume: z.record(z.string(), z.number()),
    high_24h: z.record(z.string(), z.number()),
    low_24h: z.record(z.string(), z.number()),
    circulating_supply: z.number().nullable(),
  }),
});

export type CoinDetail = z.infer<typeof coinDetailSchema>;
