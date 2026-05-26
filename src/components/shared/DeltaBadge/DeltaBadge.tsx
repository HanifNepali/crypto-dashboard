import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeltaBadgeProps {
  value: number;
}

export function DeltaBadge({ value }: DeltaBadgeProps) {
  const isPositive = value >= 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
        isPositive
          ? "bg-positive/10 text-positive"
          : "bg-negative/10 text-negative",
      )}
    >
      {isPositive ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}
