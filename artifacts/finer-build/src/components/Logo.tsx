/**
 * Logo
 * ------------------------------------------------------------------
 * Finer Build Construction brand mark.
 *
 * Icon: 3D angled house silhouette built from two overlapping
 * geometric faces (front + side), with a door cutout and a small
 * vertical window slit for visual interest.
 *
 * Wordmark: ultra-bold uppercase Montserrat (900 / Black) with
 * a small letter-spaced "CONSTRUCTION" subtitle.
 */

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", className = "", size = "md" }: LogoProps) {
  const colorClass = variant === "dark" ? "text-foreground" : "text-background";

  // The "door" cutout color must match the surrounding background of wherever
  // the logo is rendered — light cream behind dark logo, dark navy behind light logo.
  const cutoutColor = variant === "dark" ? "hsl(var(--background))" : "hsl(var(--foreground))";

  const sizes = {
    sm: { icon: "h-9 md:h-10", title: "text-lg md:text-xl", sub: "text-[0.5rem] md:text-[0.55rem]", gap: "gap-2.5" },
    md: { icon: "h-12 md:h-14", title: "text-2xl md:text-3xl", sub: "text-[0.6rem] md:text-[0.65rem]", gap: "gap-3 md:gap-4" },
    lg: { icon: "h-16 md:h-20", title: "text-3xl md:text-4xl", sub: "text-[0.7rem] md:text-[0.75rem]", gap: "gap-4 md:gap-5" },
  };
  const s = sizes[size];

  return (
    <div className={`inline-flex items-center ${s.gap} ${colorClass} ${className}`}>
      {/* 3D angled house mark — two overlapping geometric faces */}
      <svg
        viewBox="0 0 80 70"
        className={`${s.icon} w-auto shrink-0`}
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Top angled "roof/sky" face — parallelogram going up-right */}
        <polygon points="0,30 38,2 80,15 42,43" />

        {/* Front "wall" face — vertical/slanted rectangle */}
        <polygon points="0,30 42,43 42,70 0,70" />

        {/* Door cutout (uses background color so it appears as a hole) */}
        <rect x="22" y="50" width="14" height="20" fill={cutoutColor} />

        {/* Small window slit on the front face */}
        <rect x="8" y="44" width="4" height="14" fill={cutoutColor} opacity="0.6" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-[0.95]">
        <span
          className={`${s.title} uppercase`}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.04em",
          }}
        >
          Finer Build
        </span>
        <span
          className={`${s.sub} uppercase mt-1.5 opacity-85`}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.4em",
          }}
        >
          Construction
        </span>
      </div>
    </div>
  );
}
