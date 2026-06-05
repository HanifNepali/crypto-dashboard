import { LayoutDashboard } from "lucide-react";
import logo from "@/assets/logo.png";

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-sidebar px-4 py-6">
      <div className="flex items-center gap-2 px-2">
        <img
          src={logo}
          alt="Coingecko Logo"
          className="rounded-full h-auto w-10"
        />
        <span className="text-lg font-bold text-sidebar-foreground">
          Coingecko
        </span>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground"
          aria-current="page"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </a>
      </nav>
    </aside>
  );
}
