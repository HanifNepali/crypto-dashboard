import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function CoinWrapper({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className, 'flex items-center gap-2')}>{children}</div>;
}
