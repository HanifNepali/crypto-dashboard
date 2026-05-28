import { cn } from "@/lib/utils";
import {
  CHART_RANGE_OPTIONS,
  type ChartRange,
} from "../types/chartRange.types";

interface TimeRangeTabsProps {
  value: ChartRange;
  onChange: (value: ChartRange) => void;
}

export function TimeRangeTabs({ value, onChange }: TimeRangeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Chart time range"
      className="inline-flex rounded-lg border border-border bg-muted p-1.5"
    >
      {CHART_RANGE_OPTIONS.map((range) => (
        <button
          key={range.value}
          type="button"
          role="tab"
          aria-selected={value === range.value}
          onClick={() => onChange(range.value)}
          className={cn(
            "cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors",
            value === range.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
