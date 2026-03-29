import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 mb-8", className)}>
      <div className="h-[1px] w-12 bg-accent" />
      <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-muted-foreground">
        {children}
      </span>
    </div>
  );
}
