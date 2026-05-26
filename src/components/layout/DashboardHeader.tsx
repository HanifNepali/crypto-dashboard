import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./Themetoggle";

const CURRENT_USER = {
  name: "Hanif Nepali",
};

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {CURRENT_USER.name.split(" ")[0]}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {CURRENT_USER.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {CURRENT_USER.name}
          </span>
        </div>
      </div>
    </header>
  );
}
