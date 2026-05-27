import { Separator } from "@/components/ui/separator";
import { ErrorState } from "@/components/shared/ErrorState";
import { ListItemSkeleton } from "@/components/shared/LoadingSkeleton";
import { useMarketMovers } from "../hooks/useMarketMovers";
import { MoverListItem } from "./MoverListItem";
import { SectionHeading } from "@/components/shared/SectionHeading";

const TopGainersHeader = () => (
  <SectionHeading className="mb-3">
    <SectionHeading.Title size="sub">Top Gainers</SectionHeading.Title>
  </SectionHeading>
);
const TopLosersHeader = () => (
  <SectionHeading className="mb-3">
    <SectionHeading.Title size="sub">Top Losers</SectionHeading.Title>
  </SectionHeading>
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-md">
    {children}
  </div>
);

export function MarketMovers() {
  const { data, isPending, isError, refetch } = useMarketMovers();

  if (isPending) {
    return (
      <section className="grid grid-cols-2 gap-6">
        <Wrapper>
          <TopGainersHeader />
          <ListItemSkeleton rows={5} />
        </Wrapper>

        <Wrapper>
          <TopLosersHeader />
          <ListItemSkeleton rows={5} />
        </Wrapper>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <Wrapper>
        <ErrorState message="Failed to load market movers." onRetry={refetch} />
      </Wrapper>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-6">
      <Wrapper>
        <TopGainersHeader />
        <Separator className="mb-1" />
        {data.top_gainers.slice(0, 5).map((coin) => (
          <MoverListItem key={coin.id} coin={coin} />
        ))}
      </Wrapper>

      <Wrapper>
        <TopLosersHeader />
        <Separator className="mb-1" />
        {data.top_losers.slice(0, 5).map((coin) => (
          <MoverListItem key={coin.id} coin={coin} />
        ))}
      </Wrapper>
    </section>
  );
}
