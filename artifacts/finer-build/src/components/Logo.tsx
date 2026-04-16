/**
 * Logo
 * ------------------------------------------------------------------
 * Custom-built brand logo for Finer Build Construction.
 * - Pure SVG icon (architectural roof mark) + Montserrat text
 * - Always crisp at any size (no PNG/JPG)
 * - True transparency (no white background to hack around)
 * - `variant`: "dark" for light backgrounds, "light" for dark backgrounds
 */

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  /** Adjust the gap and text size for very compact layouts */
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", className = "", size = "md" }: LogoProps) {
  const colorClass = variant === "dark" ? "text-foreground" : "text-background";

  const sizes = {
    sm: {
      icon: "h-8 md:h-9",
      title: "text-base md:text-lg",
      sub: "text-[0.5rem]",
      gap: "gap-2",
    },
    md: {
      icon: "h-10 md:h-12",
      title: "text-xl md:text-2xl",
      sub: "text-[0.55rem]",
      gap: "gap-3",
    },
    lg: {
      icon: "h-14 md:h-16",
      title: "text-2xl md:text-3xl",
      sub: "text-[0.65rem]",
      gap: "gap-4",
    },
  };

  const s = sizes[size];

  return (
    <div className={`inline-flex items-center ${s.gap} ${colorClass} ${className}`}>
      {/* Architectural roof/peak icon */}
      <svg
        viewBox="0 0 56 40"
        className={`${s.icon} w-auto`}
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Background pitched roof — large and offset */}
        <polygon points="22,4 0,32 44,32" opacity="0.35" />
        {/* Foreground pitched roof — sharp and dominant */}
        <polygon points="34,8 12,36 56,36" />
        {/* Small ridge-line accent */}
        <rect x="33" y="6" width="2" height="32" opacity="0.15" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`${s.title} font-bold tracking-[0.05em] uppercase font-sans`}
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.04em" }}
        >
          Finer Build
        </span>
        <span
          className={`${s.sub} font-medium tracking-[0.45em] uppercase mt-1.5 opacity-75`}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Construction
        </span>
      </div>
    </div>
  );
}
