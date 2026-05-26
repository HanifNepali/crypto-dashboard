import { AppShell } from "@/components/layout/AppShell";
import { PanelGrid } from "@/components/layout/PanelGrid";
import { useThemeSync } from "@/hooks/useThemeSync";

export function App() {
  useThemeSync();
  return (
    <AppShell>
      <PanelGrid
        primary={
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Primary panel (3/4) — sections come next
          </div>
        }
        secondary={
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Secondary panel (1/4)
          </div>
        }
      />
    </AppShell>
  );
}
