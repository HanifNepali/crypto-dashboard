import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export function Sparkline({
  data,
  className,
}: {
  data: number[];
  className?: string;
}) {
  if (data.length === 0)
    return <span className="text-xs text-muted-foreground">—</span>;

  const chartData = data.map((value, i) => ({ i, value }));

  return (
    <div
      className={cn("h-8 w-full", className)}
      role="img"
      aria-label="7-day price trend sparkline"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--crypto-accent)"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
