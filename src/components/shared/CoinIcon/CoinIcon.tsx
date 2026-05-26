interface CoinIconProps {
  src: string;
  alt: string;
  size?: number;
}

export function CoinIcon({ src, alt, size = 24 }: CoinIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full"
      loading="lazy"
    />
  );
}
