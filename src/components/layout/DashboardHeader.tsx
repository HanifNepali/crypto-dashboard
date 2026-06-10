import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from './Themetoggle';
import { useUIStore } from '@/store/useUIStore';
import { PanelLeft } from 'lucide-react';

const CURRENT_USER = {
  name: 'Hanif Nepali',
};

export function DashboardHeader() {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div className="flex gap-4 -ml-1">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden 2xl:flex h-8 w-8 items-center justify-center cursor-pointer rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PanelLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {CURRENT_USER.name.split(' ')[0]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {CURRENT_USER.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{CURRENT_USER.name}</span>
        </div>
      </div>
    </header>
  );
}
