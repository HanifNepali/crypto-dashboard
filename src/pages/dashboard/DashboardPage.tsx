import { AppShell } from "@/components/layout/AppShell";
import { PanelGrid } from "@/components/layout/PanelGrid";
import { CoinExplorerSection } from "@/features/coin-explorer";
import { HeroMetricBar } from "@/features/global-market";
import { MarketMovers } from "@/features/market-movers";
import { TopCryptocurrencies } from "@/features/top-cryptocurrencies";

export function DashboardPage() {
  return (
    <AppShell>
      <PanelGrid
        primary={
          <>
            <HeroMetricBar />
            <TopCryptocurrencies />
            <MarketMovers />
            <CoinExplorerSection />
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Remaining primary-panel sections come next
            </div>
          </>
        }
        secondary={
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Secondary panel (1/4)
          </div>
        }
      />
    </AppShell>
  );
}
