import { useThemeSync } from "@/hooks/useThemeSync";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";

export function App() {
  useThemeSync();
  return <DashboardPage />;
}
