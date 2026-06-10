import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex xl:h-screen overflow-hidden bg-background max-w-[1800px] mx-auto">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main id="main-content" className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
