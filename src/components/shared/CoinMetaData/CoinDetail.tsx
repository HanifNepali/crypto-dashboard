interface CoinDetailProps {
  name: string;
  symbol: string;
}

export function CoinDetail({ name, symbol }: CoinDetailProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="text-xs uppercase text-muted-foreground">{symbol}</p>
    </div>
  );
}
