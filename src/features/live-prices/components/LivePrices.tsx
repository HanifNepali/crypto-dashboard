import { SectionHeading } from "@/components/shared/SectionHeading";
import { ErrorState } from "@/components/shared/ErrorState";
import { ListItemSkeleton } from "@/components/shared/LoadingSkeleton";
import { useLivePrices } from "../hooks/useLivePrices";
import { PriceListItem } from "./PriceListItem";

export function LivePrices() {
  const { data, isPending, isError, refetch } = useLivePrices();

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SectionHeading className="mb-2">
        <SectionHeading.Title size="sub">Live Prices</SectionHeading.Title>
      </SectionHeading>

      {isPending && <ListItemSkeleton rows={6} />}

      {isError && (
        <ErrorState message="Failed to load live prices." onRetry={refetch} />
      )}

      {data && (
        <div className="flex flex-col divide-y divide-border">
          {data.map((coin) => (
            <PriceListItem key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </section>
  );
}
