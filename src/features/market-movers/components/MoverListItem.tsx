import { CoinIcon } from "@/components/shared/CoinIcon";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import { formatCurrency } from "@/lib/formatters";
import type { CoinMarket } from "@/lib/api/schemas/coinMarket.schema";

export function MoverListItem({ coin }: { coin: CoinMarket }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <CoinIcon src={coin.image} alt={coin.name} />
        <div>
          <p className="text-sm font-medium text-foreground">{coin.name}</p>
          <p className="text-xs uppercase text-muted-foreground">
            {coin.symbol}
          </p>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-sm font-medium text-foreground">
          {formatCurrency(coin.current_price)}
        </span>
        <DeltaBadge value={coin.price_change_percentage_24h ?? 0} />
      </div>
    </div>
  );
}
