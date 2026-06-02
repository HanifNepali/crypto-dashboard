import { z } from "zod";
import { coingeckoClient } from "@/lib/api/client";

const categoryListSchema = z.array(
  z.object({
    category_id: z.string(),
    name: z.string(),
  }),
);

export type CategoryListItem = z.infer<typeof categoryListSchema>[number];

export async function fetchCategoriesList(): Promise<CategoryListItem[]> {
  const { data } = await coingeckoClient.get("/coins/categories/list");
  return categoryListSchema.parse(data);
}
