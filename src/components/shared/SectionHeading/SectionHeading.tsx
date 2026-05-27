import { type HTMLAttributes, type HTMLAttributes as HTMLAttrs } from "react";
import { cn } from "@/lib/utils";

function SectionHeading({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Group({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>{children}</div>
  );
}

interface TitleProps extends HTMLAttrs<HTMLHeadingElement> {
  size?: "section" | "sub";
}

function Title({
  size = "section",
  className,
  children,
  ...props
}: TitleProps) {
  const sizeClasses = size === "section" ? "text-lg " : "text-base";

  return (
    <h2
      className={cn(sizeClasses, className, "font-semibold text-foreground")}
      {...props}
    >
      {children}
    </h2>
  );
}

function Description({
  className,
  children,
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

function Actions({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}

SectionHeading.Group = Group;
SectionHeading.Title = Title;
SectionHeading.Description = Description;
SectionHeading.Actions = Actions;

export { SectionHeading };
