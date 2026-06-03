import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SectionVariant = "Dashboard" | "Other";

interface SectionProps extends HTMLAttributes<HTMLSelectElement> {
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<SectionVariant, string> = {
  Dashboard: "rounded-xl border border-border bg-card shadow-md",
  Other: "rounded-lg border border-border bg-card shadow-xs",
};

const Section = ({
  className,
  children,
  variant = "Dashboard",
  ...props
}: SectionProps) => {
  return (
    <section className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </section>
  );
};

export { Section };
