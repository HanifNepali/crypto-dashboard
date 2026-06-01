import { z } from "zod";

export const searchCoinSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  market_cap_rank: z.number().nullable(),
  thumb: z.string(),
});

export const searchResponseSchema = z.object({
  coins: z.array(searchCoinSchema),
});

export type SearchCoin = z.infer<typeof searchCoinSchema>;
