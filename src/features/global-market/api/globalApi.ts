import { coingeckoClient } from "@/lib/api/client";
import {
  globalMarketSchema,
  type GlobalMarketResponse,
} from "../schemas/global.schema";

export async function fetchGlobalMarket(): Promise<GlobalMarketResponse> {
  const { data } = await coingeckoClient.get("/global");
  return globalMarketSchema.parse(data);
}
