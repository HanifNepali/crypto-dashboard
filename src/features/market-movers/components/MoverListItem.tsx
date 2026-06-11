import { CoinIcon } from '@/components/shared/CoinIcon';
import { DeltaBadge } from '@/components/shared/DeltaBadge';
import { formatCurrency } from '@/lib/formatters';
import type { CoinMarket } from '@/lib/api/schemas/coinMarket.schema';
import { CoinDetail, CoinWrapper } from '@/components/shared/CoinMetaData';
import { memo } from 'react';

function MoverListItemComponent({ coin }: { coin: CoinMarket }) {
  return (
    <div className="flex items-center justify-between py-2">
      <CoinWrapper>
        <CoinIcon src={coin.image} alt={coin.name} />
        <CoinDetail name={coin.name} symbol={coin.symbol} />
      </CoinWrapper>
      <div className="flex items-end gap-2">
        <span className="text-sm font-medium text-foreground">
          {formatCurrency(coin.current_price)}
        </span>
        <DeltaBadge value={coin.price_change_percentage_24h ?? 0} />
      </div>
    </div>
  );
}

export const MoverListItem = memo(MoverListItemComponent);
