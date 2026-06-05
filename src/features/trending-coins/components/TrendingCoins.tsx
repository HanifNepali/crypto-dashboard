import { SectionHeading } from "@/components/shared/SectionHeading";
import { ErrorState } from "@/components/shared/ErrorState";
import { ListItemSkeleton } from "@/components/shared/LoadingSkeleton";
import { useTrendingCoins } from "../hooks/useTrendingCoins";
import { TrendingListItem } from "./TrendingListItem";

const DISPLAY_COUNT = 5;

export function TrendingCoins() {
  const { data, isPending, isError, refetch } = useTrendingCoins();

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SectionHeading className="mb-2">
        <SectionHeading.Title size="sub">Trending Coins</SectionHeading.Title>
      </SectionHeading>

      {isPending && <ListItemSkeleton rows={DISPLAY_COUNT} />}

      {isError && (
        <ErrorState
          message="Failed to load trending coins."
          onRetry={refetch}
        />
      )}

      {data && (
        <div className="flex flex-col divide-y divide-border">
          {data.slice(0, DISPLAY_COUNT).map((coin, i) => (
            <TrendingListItem key={coin.id} coin={coin} rank={i + 1} />
          ))}
        </div>
      )}
    </section>
  );
}
