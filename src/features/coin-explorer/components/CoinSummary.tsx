import { CoinIcon } from "@/components/shared/CoinIcon";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import {
  formatCurrency,
  formatCompactCurrency,
  formatCompactNumber,
} from "@/lib/formatters";
import type { CoinDetail } from "../schemas/coin.schema";

const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-medium text-foreground">{value}</p>
    </div>
  );
};

export function CoinSummary({ coin }: { coin: CoinDetail }) {
  const md = coin.market_data;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CoinIcon src={coin.image.large} alt={coin.name} size={40} />
          <p className="text-lg font-semibold text-foreground">
            {coin.name}{" "}
            <span className="text-sm uppercase text-muted-foreground">
              ({coin.symbol})
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(md.current_price.usd)}
          </p>
          {md.price_change_percentage_24h !== null && (
            <DeltaBadge value={md.price_change_percentage_24h} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 text-sm">
        <Stat
          label="Market Cap"
          value={formatCompactCurrency(md.market_cap.usd)}
        />
        <Stat
          label="Volume"
          value={formatCompactCurrency(md.total_volume.usd)}
        />
        <Stat label="24h High" value={formatCurrency(md.high_24h.usd)} />
        <Stat label="24h Low" value={formatCurrency(md.low_24h.usd)} />
        <Stat
          label="Circulating Supply"
          value={
            md.circulating_supply !== null
              ? formatCompactNumber(md.circulating_supply)
              : "—"
          }
        />
      </div>
    </div>
  );
}
