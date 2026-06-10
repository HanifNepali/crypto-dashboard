import { CoinIcon } from '@/components/shared/CoinIcon';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { formatCurrency } from '@/lib/formatters';
import type { TrendingItem } from '../schemas/trending.schema';
import { CoinDetail } from '@/components/shared/CoinMetaData';

export function TrendingListItem({ coin, rank }: { coin: TrendingItem; rank: number }) {
  const change24h = coin.data.price_change_percentage_24h?.usd;

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <span className="w-4 text-xs font-medium text-muted-foreground">{rank}</span>
        <CoinIcon src={coin.thumb} alt={coin.name} size={28} />
        <CoinDetail name={coin.name} symbol={coin.symbol} />
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-medium text-foreground">
          {formatCurrency(coin.data.price)}
        </span>
        {change24h !== undefined && <DeltaBadge value={change24h} />}
      </div>
    </div>
  );
}
