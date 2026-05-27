import { z } from "zod";

export const marketChartSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

export type MarketChart = z.infer<typeof marketChartSchema>;
