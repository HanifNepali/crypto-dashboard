import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ErrorState } from "@/components/shared/ErrorState";
import { useUIStore } from "@/store/useUIStore";
import { useCoin } from "../hooks/useCoin";
import { useCoinMarketChart } from "../hooks/useCoinMarketChart";
import { CoinSearch } from "./CoinSearch";
import { CoinSummary } from "./CoinSummary";
import { TimeRangeTabs } from "./TimeRangeTabs";
import { PriceChart } from "./PriceChart";
import { CHART_RANGE_DAYS, type ChartRange } from "../types/chartRange.types";

export function CoinExplorerSection() {
  const selectedCoinId = useUIStore((s) => s.selectedCoinId);
  const [range, setRange] = useState<ChartRange>("7d");

  const {
    data: coin,
    isPending: isCoinPending,
    isError: isCoinError,
    refetch: refetchCoin,
  } = useCoin(selectedCoinId);

  const {
    data: chart,
    isPending: isChartPending,
    isError: isChartError,
    refetch: refetchChart,
  } = useCoinMarketChart(selectedCoinId, CHART_RANGE_DAYS[range]);

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SectionHeading className="mb-4">
        <SectionHeading.Title>Coin Explorer</SectionHeading.Title>
      </SectionHeading>

      <CoinSearch />

      <div className="mt-5">
        {isCoinPending && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
              <>
                <Skeleton className="h-12 w-40" />
              </>
            </div>
            <div className="mt-4 flex items-center gap-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-[25%] rounded-sm" />
              ))}
            </div>
          </>
        )}
        {isCoinError && (
          <ErrorState
            message="Failed to load coin details."
            onRetry={refetchCoin}
          />
        )}
        {coin && <CoinSummary coin={coin} />}
      </div>

      <div className="mt-5 flex items-center justify-end">
        <TimeRangeTabs value={range} onChange={setRange} />
      </div>

      <div className="mt-3">
        {isChartPending && <Skeleton className="h-64 w-full" />}
        {isChartError && (
          <ErrorState
            message="Failed to load price chart."
            onRetry={refetchChart}
          />
        )}
        {chart && <PriceChart chart={chart} />}
      </div>
    </section>
  );
}
