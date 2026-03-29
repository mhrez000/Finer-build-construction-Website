import { cn } from "@/lib/utils";

interface SpinningBorderProps {
  children: React.ReactNode;
  className?: string;
  borderSize?: number;
  speed?: string;
}

export function SpinningBorder({
  children,
  className,
  borderSize = 2,
  speed = "3s",
}: SpinningBorderProps) {
  return (
    <div
      className={cn("relative inline-flex overflow-hidden", className)}
      style={{ padding: borderSize }}
    >
      {/* Spinning conic gradient layer — larger than container so it fills edge to edge */}
      <div
        className="absolute"
        style={{
          inset: -80,
          background:
            "conic-gradient(from 0deg, transparent 0%, #D4AF37 15%, #F5E6A3 25%, #D4AF37 35%, transparent 50%, transparent 100%)",
          animation: `spin-border ${speed} linear infinite`,
        }}
      />
      {/* Blur glow layer for depth */}
      <div
        className="absolute"
        style={{
          inset: -80,
          background:
            "conic-gradient(from 0deg, transparent 0%, #D4AF37 15%, #F5E6A3 25%, #D4AF37 35%, transparent 50%, transparent 100%)",
          animation: `spin-border ${speed} linear infinite`,
          filter: "blur(8px)",
          opacity: 0.5,
        }}
      />
      {/* Content rendered on top */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
