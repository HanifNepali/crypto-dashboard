import { DollarSign, BarChart3, ChartArea, Activity } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { StatCardSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { useGlobalMarket } from '../hooks/useGlobalMarket';
import { formatCompactCurrency, formatCompactNumber, formatPercentage } from '@/lib/formatters';

function StatCardFigure({ children }: { children: React.ReactNode }) {
  return <p className="text-3xl xl:text-4xl font-bold text-foreground">{children}</p>;
}

export function HeroMetricBar() {
  const { data: response, isPending, isError, refetch } = useGlobalMarket();

  if (isPending) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !response) {
    return <ErrorState message="Failed to load market overview." onRetry={refetch} />;
  }

  const global = response.data;
  const btcDominance = global.market_cap_percentage.btc ?? 0;

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4! gap-4">
      <StatCard
        icon={DollarSign}
        label="Total Market Cap"
        delta={global.market_cap_change_percentage_24h_usd}
      >
        <StatCardFigure>{formatCompactCurrency(global.total_market_cap.usd)}</StatCardFigure>
      </StatCard>

      <StatCard icon={ChartArea} label="Market Cap Change / BTC Dominance">
        <div className="flex items-center gap-3">
          <StatCardFigure>
            {formatPercentage(global.market_cap_change_percentage_24h_usd)}
          </StatCardFigure>
          <span className="text-sm text-muted-foreground">
            BTC {formatPercentage(btcDominance)}
          </span>
        </div>
      </StatCard>

      <StatCard icon={BarChart3} label="24h Trading Volume">
        <StatCardFigure>{formatCompactCurrency(global.total_volume.usd)}</StatCardFigure>
      </StatCard>

      <StatCard icon={Activity} label="Market Activity">
        <div className="flex items-center gap-3">
          <StatCardFigure>{formatCompactNumber(global.active_cryptocurrencies)}</StatCardFigure>
          <span className="text-sm text-muted-foreground">
            {formatCompactNumber(global.markets)} markets
          </span>
        </div>
      </StatCard>
    </div>
  );
}
