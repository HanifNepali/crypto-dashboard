import { z } from "zod";

export const categoryMarketSchema = z.object({
  id: z.string(),
  name: z.string(),
  market_cap: z.number().nullable(),
  market_cap_change_24h: z.number().nullable(),
  volume_24h: z.number().nullable(),
});

export const categoriesMarketResponseSchema = z.array(categoryMarketSchema);

export type CategoryMarket = z.infer<typeof categoryMarketSchema>;
