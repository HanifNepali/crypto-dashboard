import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import type { MarketChart } from "../schemas/marketChart.schemas";

function formatTooltipDate(timestamp: number) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function PriceChart({ chart }: { chart: MarketChart }) {
  const data = useMemo(
    () => chart.prices.map(([timestamp, price]) => ({ timestamp, price })),
    [chart.prices],
  );

  // Compare the first and last price in the data array
  // to determine if the price is trending up or down
  const isPositive = useMemo(() => {
    if (data.length < 2) return true;

    return data[data.length - 1].price >= data[0].price;
  }, [data]);

  const strokeColor = isPositive ? "var(--positive)" : "var(--negative)";

  return (
    <div
      className="h-64 w-full"
      role="img"
      aria-label={`Price chart, ${isPositive ? "trending up" : "trending down"} over the selected period`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(ts) =>
              new Date(ts).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            minTickGap={40}
          />
          <YAxis
            domain={["auto", "auto"]}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatCurrency(value)}
            width={70}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Price"]}
            labelFormatter={(label) => formatTooltipDate(Number(label))}
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--popover-foreground)",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2}
            fill="url(#priceGradient)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
