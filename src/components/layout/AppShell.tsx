import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
