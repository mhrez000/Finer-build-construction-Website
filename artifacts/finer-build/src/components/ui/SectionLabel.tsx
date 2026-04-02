import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="h-px w-8 bg-accent" />
      <span className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-accent">
        {children}
      </span>
    </div>
  );
}
