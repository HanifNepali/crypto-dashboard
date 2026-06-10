import logo from '@/assets/logo.png';

import { LayoutDashboard } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const collapsibleText =
  'overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-150 ease-linear motion-reduce:transition-none';

export function Sidebar({ className }: SidebarProps) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);

  return (
    <aside
      className={cn(
        className,
        'hidden h-full 2xl:flex flex-col border-r border-border bg-sidebar py-6 transition-[width,padding] duration-150 ease-linear motion-reduce:transition-none',
        collapsed ? 'w-16 px-2' : 'w-60 px-4'
      )}
    >
      <div className="flex items-center px-2">
        <img src={logo} alt="Coingecko Logo" className="rounded-full h-auto w-10" />

        <span
          className={cn(
            collapsibleText,
            'font-sans text-lg font-semibold text-sidebar-foreground',
            collapsed ? 'ml-0 max-w-0 opacity-0' : 'ml-2 max-w-35 opacity-100'
          )}
        >
          Coingecko
        </span>
      </div>

      <nav className="mt-8">
        <a
          href="#"
          title="Dashboard"
          className={cn(
            'flex items-center rounded-lg bg-sidebar-accent py-2 text-sm font-medium text-sidebar-accent-foreground',
            collapsed ? 'justify-center px-0' : 'px-3'
          )}
          aria-current="page"
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span
            className={cn(
              collapsibleText,
              collapsed ? 'ml-0 max-w-0 opacity-0' : 'ml-3 max-w-35 opacity-100'
            )}
          >
            Dashboard
          </span>
        </a>
      </nav>
    </aside>
  );
}
