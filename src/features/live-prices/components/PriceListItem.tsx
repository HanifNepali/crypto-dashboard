import { CoinIcon } from '@/components/shared/CoinIcon';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { Sparkline } from '@/components/shared/Sparkline';
import { formatCurrency } from '@/lib/formatters';
import type { CoinMarket } from '@/lib/api/schemas/coinMarket.schema';
import { CoinWrapper, CoinDetail } from '@/components/shared/CoinMetaData';

export function PriceListItem({ coin }: { coin: CoinMarket }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <CoinWrapper>
        <CoinIcon src={coin.image} alt={coin.name} size={28} />
        <CoinDetail name={coin.name} symbol={coin.symbol} />
      </CoinWrapper>

      {coin.sparkline_in_7d && <Sparkline data={coin.sparkline_in_7d.price} className="w-[33%]" />}

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
