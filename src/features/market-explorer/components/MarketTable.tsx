import { ArrowUpDown } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { CoinIcon } from "@/components/shared/CoinIcon";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import { Sparkline } from "@/components/shared/Sparkline";
import {
  formatCurrency,
  formatCompactCurrency,
  formatCompactNumber,
} from "@/lib/formatters";
import { useUIStore } from "@/store/useUIStore";
import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";
import type {
  ColumnKey,
  SortDirection,
  SortKey,
} from "../types/marketExplorer.types";

interface MarketTableProps {
  coins: CoinMarket[];
  visibleColumns: Set<ColumnKey>;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

function SortableHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const isActive = sortKey === activeKey;
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className="inline-flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground hover:text-foreground"
    >
      {label}
      <ArrowUpDown
        className={`h-3.5 w-3.5 ${isActive ? "text-crypto-accent" : ""}`}
      />
      <span className="sr-only">
        {isActive
          ? direction === "asc"
            ? "sorted ascending"
            : "sorted descending"
          : "not sorted"}
      </span>
    </button>
  );
}

export function MarketTable({
  coins,
  visibleColumns,
  sortKey,
  sortDirection,
  onSort,
}: MarketTableProps) {
  const setSelectedCoinId = useUIStore((s) => s.setSelectedCoinId);

  const columns: DataTableColumn<CoinMarket>[] = [
    {
      key: "rank",
      header: (
        <SortableHeader
          label="#"
          sortKey="rank"
          activeKey={sortKey}
          direction={sortDirection}
          onSort={onSort}
        />
      ),
      cell: (coin) => (
        <span className="text-muted-foreground">
          {coin.market_cap_rank ?? "—"}
        </span>
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
  ];

  if (visibleColumns.has("change24h")) {
    columns.push({
      key: "change24h",
      header: "24h",
      align: "right",
      cell: (coin) =>
        coin.price_change_percentage_24h !== null ? (
          <DeltaBadge value={coin.price_change_percentage_24h} />
        ) : (
          "—"
        ),
    });
  }

  if (visibleColumns.has("change7d")) {
    columns.push({
      key: "change7d",
      header: "7d",
      align: "right",
      cell: (coin) =>
        coin.price_change_percentage_7d_in_currency != null ? (
          <DeltaBadge value={coin.price_change_percentage_7d_in_currency} />
        ) : (
          "—"
        ),
    });
  }

  if (visibleColumns.has("marketCap")) {
    columns.push({
      key: "marketCap",
      header: (
        <SortableHeader
          label="Market Cap"
          sortKey="marketCap"
          activeKey={sortKey}
          direction={sortDirection}
          onSort={onSort}
        />
      ),
      align: "right",
      cell: (coin) => formatCompactCurrency(coin.market_cap),
    });
  }

  if (visibleColumns.has("volume")) {
    columns.push({
      key: "volume",
      header: (
        <SortableHeader
          label="Volume 24h"
          sortKey="volume"
          activeKey={sortKey}
          direction={sortDirection}
          onSort={onSort}
        />
      ),
      align: "right",
      cell: (coin) => formatCompactCurrency(coin.total_volume),
    });
  }

  if (visibleColumns.has("circulatingSupply")) {
    columns.push({
      key: "circulatingSupply",
      header: "Circulating Supply",
      align: "right",
      cell: (coin) =>
        coin.circulating_supply != null
          ? formatCompactNumber(coin.circulating_supply)
          : "—",
    });
  }

  if (visibleColumns.has("sparkline")) {
    columns.push({
      key: "sparkline",
      header: "7d Chart",
      align: "right",
      cell: (coin) => <Sparkline data={coin.sparkline_in_7d?.price ?? []} />,
    });
  }

  return (
    <div className="h-146 overflow-auto">
      <DataTable
        columns={columns}
        data={coins}
        getRowKey={(coin) => coin.id}
        onRowClick={(coin) => setSelectedCoinId(coin.id)}
      />
    </div>
  );
}
