import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { TableSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import { CoinIcon } from "@/components/shared/CoinIcon";
import { useTopCryptocurrencies } from "../hooks/useTopCryptocurrencies";
import { formatCurrency, formatCompactCurrency } from "@/lib/formatters";
import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";
import { SectionHeading } from "@/components/shared/SectionHeading";

const columns: DataTableColumn<CoinMarket>[] = [
  {
    key: "rank",
    header: "#",
    cell: (coin) => (
      <span className="text-muted-foreground">{coin.market_cap_rank}</span>
    ),
  },
  {
    key: "coin",
    header: "Coin",
    cell: (coin) => (
      <div className="flex items-center gap-2">
        <CoinIcon src={coin.image} alt={coin.name} />
        <div>
          <p className="font-medium text-foreground">{coin.name}</p>
          <p className="text-xs uppercase text-muted-foreground">
            {coin.symbol}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "price",
    header: "Price",
    align: "right",
    cell: (coin) => formatCurrency(coin.current_price),
  },
  {
    key: "change24h",
    header: "24h",
    align: "right",
    cell: (coin) =>
      coin.price_change_percentage_24h !== null ? (
        <DeltaBadge value={coin.price_change_percentage_24h} />
      ) : (
        "—"
      ),
  },
  {
    key: "marketCap",
    header: "Market Cap",
    align: "right",
    cell: (coin) => formatCompactCurrency(coin.market_cap),
  },
];

export function TopCryptocurrencies() {
  const { data, isPending, isError, refetch } = useTopCryptocurrencies();

  return (
    <section className="rounded-xl border border-border bg-card shadow-md">
      <SectionHeading className="px-5 py-4">
        <SectionHeading.Title>Top Cryptocurrencies</SectionHeading.Title>
        <SectionHeading.Actions>
          <a href="#" className="text-sm text-crypto-accent hover:underline">
            View all
          </a>
        </SectionHeading.Actions>
      </SectionHeading>

      {isPending && <TableSkeleton rows={5} cols={5} />}

      {isError && (
        <div className="p-5">
          <ErrorState
            message="Failed to load top cryptocurrencies."
            onRetry={refetch}
          />
        </div>
      )}

      {data && (
        <DataTable
          columns={columns}
          data={data}
          getRowKey={(coin) => coin.id}
        />
      )}
    </section>
  );
}
