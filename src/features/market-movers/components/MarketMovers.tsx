import { Separator } from "@/components/ui/separator";
import { ErrorState } from "@/components/shared/ErrorState";
import { ListItemSkeleton } from "@/components/shared/LoadingSkeleton";
import { useMarketMovers } from "../hooks/useMarketMovers";
import { MoverListItem } from "./MoverListItem";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Section } from "@/components/layout/Section";

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
  <Section className="p-4">{children}</Section>
);

const SectionLayout = ({ children }: { children: React.ReactNode }) => (
  <section className="grid lg:grid-cols-2 gap-6">{children}</section>
);

export function MarketMovers() {
  const { data, isPending, isError, refetch } = useMarketMovers();

  if (isPending) {
    return (
      <SectionLayout>
        <Wrapper>
          <TopGainersHeader />
          <ListItemSkeleton rows={5} />
        </Wrapper>

        <Wrapper>
          <TopLosersHeader />
          <ListItemSkeleton rows={5} />
        </Wrapper>
      </SectionLayout>
    );
  }

  if (isError || !data) {
    return (
      <SectionLayout>
        <Wrapper>
          <TopGainersHeader />
          <ErrorState message="Failed to load Top Gainers." onRetry={refetch} />
        </Wrapper>

        <Wrapper>
          <TopLosersHeader />
          <ErrorState message="Failed to load Top Losers." onRetry={refetch} />
        </Wrapper>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout>
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
    </SectionLayout>
  );
}
