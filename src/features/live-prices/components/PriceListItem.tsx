import { CoinIcon } from "@/components/shared/CoinIcon";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import { Sparkline } from "@/components/shared/Sparkline";
import { formatCurrency } from "@/lib/formatters";
import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";

export function PriceListItem({ coin }: { coin: CoinMarket }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <CoinIcon src={coin.image} alt={coin.name} size={28} />
        <div>
          <p className="text-sm font-medium text-foreground">{coin.name}</p>
          <p className="text-xs uppercase text-muted-foreground">
            {coin.symbol}
          </p>
        </div>
      </div>

      {coin.sparkline_in_7d && (
        <Sparkline data={coin.sparkline_in_7d.price} className="w-[33%]" />
      )}

      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-medium text-foreground">
          {formatCurrency(coin.current_price)}
        </span>
        {coin.price_change_percentage_24h !== null && (
          <DeltaBadge value={coin.price_change_percentage_24h} />
        )}
      </div>
    </div>
  );
}
