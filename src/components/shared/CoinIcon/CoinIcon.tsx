import { memo } from 'react';

interface CoinIconProps {
  src: string;
  alt: string;
  size?: number;
}

function CoinIconComponent({ src, alt, size = 24 }: CoinIconProps) {
  return (
    <img src={src} alt={alt} width={size} height={size} className="rounded-full" loading="lazy" />
  );
}

export const CoinIcon = memo(CoinIconComponent);
