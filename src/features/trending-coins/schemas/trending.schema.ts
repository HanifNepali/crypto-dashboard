import { z } from "zod";

const trendingItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  market_cap_rank: z.number().nullable(),
  thumb: z.string(),
  score: z.number(),
  data: z.object({
    price: z.number(),
    price_change_percentage_24h: z.record(z.string(), z.number()).optional(),
  }),
});

const trendingResponseSchema = z.object({
  coins: z.array(z.object({ item: trendingItemSchema })),
});

export type TrendingItem = z.infer<typeof trendingItemSchema>;
export type TrendingResponse = z.infer<typeof trendingResponseSchema>;
export { trendingResponseSchema };
