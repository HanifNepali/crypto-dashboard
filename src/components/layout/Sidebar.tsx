import { LayoutDashboard } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-sidebar px-4 py-6">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-crypto-accent">
          <span className="font-serif text-sm font-bold text-black">C</span>
        </div>
        <span className="font-sans text-lg font-semibold text-sidebar-foreground">
          Crypto
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
