import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { DeltaBadge } from "@/components/shared/DeltaBadge";
import { useMarketCategories } from "../hooks/useMarketCategories";
import { formatCompactCurrency } from "@/lib/formatters";
import { CATEGORY_CHART_COLORS } from "../constants";
import type { CategoryMarket } from "../schemas/categories.schema";
import { Section } from "@/components/layout/Section";

const TOP_N = 5;

interface Slice {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number | null;
}

function buildSlices(categories: CategoryMarket[]): {
  slices: Slice[];
  total: number;
} {
  const withCap = categories.filter(
    (c): c is CategoryMarket & { market_cap: number } => c.market_cap != null,
  );
  const sorted = [...withCap].sort((a, b) => b.market_cap - a.market_cap);

  const top = sorted.slice(0, TOP_N);
  const rest = sorted.slice(TOP_N);
  const otherMarketCap = rest.reduce((sum, c) => sum + c.market_cap, 0);

  const slices: Slice[] = top.map((c) => ({
    id: c.id,
    name: c.name,
    market_cap: c.market_cap,
    market_cap_change_24h: c.market_cap_change_24h,
  }));

  if (rest.length > 0) {
    slices.push({
      id: "other",
      name: `Other (${rest.length})`,
      market_cap: otherMarketCap,
      market_cap_change_24h: null,
    });
  }

  const total = slices.reduce((sum, s) => sum + s.market_cap, 0);
  return { slices, total };
}

export function MarketCategoriesSection() {
  const { data, isPending, isError, refetch } = useMarketCategories();

  const { slices, total } = useMemo(() => buildSlices(data ?? []), [data]);

  return (
    <Section>
      <SectionHeading className="px-5 py-4">
        <SectionHeading.Title>Market Categories</SectionHeading.Title>
      </SectionHeading>

      {isPending && (
        <div className="flex items-center gap-6 p-5">
          <Skeleton className="h-40 w-40 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      )}

      {isError && (
        <div className="p-5">
          <ErrorState
            message="Failed to load market categories."
            onRetry={refetch}
          />
        </div>
      )}

      {data && (
        <div className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:gap-6">
          <div
            className="relative h-50 w-50 shrink-0"
            role="img"
            aria-label={`Donut chart of market cap share by category, out of ${formatCompactCurrency(total)} total across shown categories`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="market_cap"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={2}
                  stroke="var(--card)"
                  strokeWidth={2}
                  isAnimationActive={false}
                >
                  {slices.map((slice, i) => (
                    <Cell
                      key={slice.id}
                      fill={
                        CATEGORY_CHART_COLORS[i % CATEGORY_CHART_COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _name, item) => {
                    const pct =
                      total > 0
                        ? ((Number(value) / total) * 100).toFixed(1)
                        : "0";
                    return [
                      `${formatCompactCurrency(Number(value))} (${pct}%)`,
                      item?.payload?.name ?? "",
                    ];
                  }}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--popover-foreground)",
                  }}
                  wrapperStyle={{ zIndex: 1 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">
                {formatCompactCurrency(total)}
              </span>
            </div>
          </div>

          <ul className="flex w-full flex-1 flex-col gap-2">
            {slices.map((slice, i) => {
              const pct =
                total > 0 ? ((slice.market_cap / total) * 100).toFixed(1) : "0";
              return (
                <li
                  key={slice.id}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          CATEGORY_CHART_COLORS[
                            i % CATEGORY_CHART_COLORS.length
                          ],
                      }}
                    />
                    <span className="truncate text-foreground">
                      {slice.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {pct}%
                    </span>
                  </span>
                  {slice.market_cap_change_24h != null && (
                    <DeltaBadge value={slice.market_cap_change_24h} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Screen-reader accessible equivalent of the chart data */}
          <table className="sr-only">
            <caption>Market cap by category</caption>
            <thead>
              <tr>
                <th>Category</th>
                <th>Market Cap</th>
                <th>Share</th>
                <th>24h Change</th>
              </tr>
            </thead>
            <tbody>
              {slices.map((slice) => (
                <tr key={slice.id}>
                  <td>{slice.name}</td>
                  <td>{formatCompactCurrency(slice.market_cap)}</td>
                  <td>
                    {total > 0
                      ? ((slice.market_cap / total) * 100).toFixed(1)
                      : "0"}
                    %
                  </td>
                  <td>
                    {slice.market_cap_change_24h != null
                      ? `${slice.market_cap_change_24h.toFixed(2)}%`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
