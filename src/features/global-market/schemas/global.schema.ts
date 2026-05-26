import { z } from "zod";

export const globalMarketSchema = z.object({
  data: z.object({
    active_cryptocurrencies: z.number(),
    markets: z.number(),
    total_market_cap: z.record(z.string(), z.number()),
    total_volume: z.record(z.string(), z.number()),
    market_cap_percentage: z.record(z.string(), z.number()),
    market_cap_change_percentage_24h_usd: z.number(),
  }),
});

export type GlobalMarketResponse = z.infer<typeof globalMarketSchema>;
