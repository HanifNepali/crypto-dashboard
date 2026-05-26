import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { DeltaBadge } from "@/components/shared/DeltaBadge";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  delta?: number;
  children: ReactNode;
}

export function StatCard({
  icon: Icon,
  label,
  delta,
  children,
}: StatCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border/70 bg-card p-5 shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2 text-muted-foreground">
          <Icon className="h-4 w-4 mt-1" />
          <span className="text-sm font-semibold">{label}</span>
        </div>
        {delta && <DeltaBadge value={delta} />}
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  );
}
