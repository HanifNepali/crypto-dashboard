import { AppShell } from "@/components/layout/AppShell";
import { PanelGrid } from "@/components/layout/PanelGrid";
import { CoinExplorerSection } from "@/features/coin-explorer";
import { HeroMetricBar } from "@/features/global-market";
import { LivePrices } from "@/features/live-prices/components/LivePrices";
import { MarketCategoriesSection } from "@/features/market-categories";
import { MarketExplorerSection } from "@/features/market-explorer/components/MarketExplorerSection";
import { MarketMovers } from "@/features/market-movers";
import { TopCryptocurrencies } from "@/features/top-cryptocurrencies";
import { TrendingCoins } from "@/features/trending-coins/components/TrendingCoins";

export function DashboardPage() {
  return (
    <AppShell>
      <PanelGrid
        primary={
          <>
            <HeroMetricBar />
            <section className="grid lg:grid-cols-2 gap-6">
              <TopCryptocurrencies />
              <MarketCategoriesSection />
            </section>
            <CoinExplorerSection />
            <MarketMovers />
            <MarketExplorerSection />
          </>
        }
        secondary={
          <>
            <LivePrices />
            <TrendingCoins />
          </>
        }
      />
    </AppShell>
  );
}
