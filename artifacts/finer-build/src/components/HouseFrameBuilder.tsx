import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * HouseFrameBuilder
 * ------------------------------------------------------------------
 * A blueprint-style SVG animation that "builds" a stick-framed house
 * from foundation to ridge beam. Triggers once when scrolled into view.
 *
 * Sequence:
 *   1. Blueprint grid fades in
 *   2. Foundation slab + hatching
 *   3. Sill plate
 *   4. Vertical wall studs (staggered, bottom → top draw)
 *   5. Door + window rough openings
 *   6. Top plates (double)
 *   7. Rafters → ridge peak
 *   8. Collar ties / interior rafters
 *   9. "FRAMED" completion stamp
 */
export function HouseFrameBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const stroke = "#D4AF37"; // matches site accent gold

  // Wall stud x positions (skips door opening at 400)
  const studXs = [100, 160, 220, 280, 340, 460, 520, 580, 640, 700];

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 800 520"
        className="w-full h-auto"
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-label="Animated stick-framed house build sequence"
        role="img"
      >
        <defs>
          <pattern
            id="blueprintGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={stroke}
              strokeWidth="0.4"
              opacity="0.18"
            />
          </pattern>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Blueprint background grid */}
        <motion.rect
          x="0"
          y="0"
          width="800"
          height="520"
          fill="url(#blueprintGrid)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />

        {/* Ground dashed reference line */}
        <motion.line
          x1="20"
          y1="455"
          x2="780"
          y2="455"
          strokeWidth={0.8}
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
        />

        {/* Foundation outline */}
        <motion.rect
          x="80"
          y="430"
          width="640"
          height="25"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
        />

        {/* Foundation concrete hatching */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 90 + i * 53;
          return (
            <motion.line
              key={`hatch-${i}`}
              x1={x}
              y1={455}
              x2={x + 20}
              y2={430}
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
              transition={{ delay: 0.6 + i * 0.03, duration: 0.3 }}
            />
          );
        })}

        {/* Sill plate (thick horizontal member on foundation) */}
        <motion.line
          x1="100"
          y1="430"
          x2="700"
          y2="430"
          strokeWidth={3.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 1.05, duration: 0.55, ease: "easeOut" }}
        />

        {/* Wall studs — staggered vertical draw */}
        {studXs.map((x, i) => (
          <motion.line
            key={`stud-${i}`}
            x1={x}
            y1="430"
            x2={x}
            y2="210"
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              delay: 1.35 + i * 0.07,
              duration: 0.45,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Door rough opening: king studs */}
        <motion.line
          x1="370"
          y1="430"
          x2="370"
          y2="210"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.15, duration: 0.4 }}
        />
        <motion.line
          x1="430"
          y1="430"
          x2="430"
          y2="210"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.4 }}
        />
        {/* Door header */}
        <motion.line
          x1="370"
          y1="295"
          x2="430"
          y2="295"
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.55, duration: 0.3 }}
        />

        {/* Top plates (double) */}
        <motion.line
          x1="100"
          y1="210"
          x2="700"
          y2="210"
          strokeWidth={3.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.75, duration: 0.65, ease: "easeOut" }}
        />
        <motion.line
          x1="100"
          y1="200"
          x2="700"
          y2="200"
          strokeWidth={1.75}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
          transition={{ delay: 2.95, duration: 0.55 }}
        />

        {/* Window rough openings */}
        <motion.rect
          x="160"
          y="300"
          width="60"
          height="80"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 3.25, duration: 0.55 }}
        />
        <motion.rect
          x="580"
          y="300"
          width="60"
          height="80"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 3.4, duration: 0.55 }}
        />

        {/* Roof rafters — left & right */}
        <motion.line
          x1="80"
          y1="210"
          x2="400"
          y2="60"
          strokeWidth={3.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 3.65, duration: 0.8, ease: "easeOut" }}
        />
        <motion.line
          x1="720"
          y1="210"
          x2="400"
          y2="60"
          strokeWidth={3.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 3.65, duration: 0.8, ease: "easeOut" }}
        />

        {/* Ceiling joist line */}
        <motion.line
          x1="100"
          y1="212"
          x2="700"
          y2="212"
          strokeWidth={1.2}
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ delay: 4.3, duration: 0.4 }}
        />

        {/* Collar tie */}
        <motion.line
          x1="220"
          y1="130"
          x2="580"
          y2="130"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 4.45, duration: 0.5 }}
        />

        {/* Interior rafter detail */}
        {[
          { x1: 180, y1: 210, x2: 280, y2: 152 },
          { x1: 280, y1: 210, x2: 340, y2: 118 },
          { x1: 620, y1: 210, x2: 520, y2: 152 },
          { x1: 520, y1: 210, x2: 460, y2: 118 },
          { x1: 400, y1: 60, x2: 400, y2: 210 },
        ].map((l, i) => (
          <motion.line
            key={`interior-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeWidth={1.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
            transition={{ delay: 4.6 + i * 0.09, duration: 0.4 }}
          />
        ))}

        {/* Ridge peak highlight dot */}
        <motion.circle
          cx="400"
          cy="60"
          r="5"
          fill={stroke}
          stroke="none"
          filter="url(#softGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.6, 1], opacity: 1 } : {}}
          transition={{ delay: 4.25, duration: 0.7 }}
        />

        {/* Dimension marks */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.55 } : {}}
          transition={{ delay: 5.2, duration: 0.5 }}
        >
          <line x1="80" y1="480" x2="720" y2="480" strokeWidth={0.6} />
          <line x1="80" y1="475" x2="80" y2="485" strokeWidth={0.6} />
          <line x1="720" y1="475" x2="720" y2="485" strokeWidth={0.6} />
          <text
            x="400"
            y="497"
            fontSize="10"
            fill={stroke}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            letterSpacing="2"
          >
            64'-0"
          </text>
        </motion.g>

        {/* "FRAMED" completion stamp */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 5.55, duration: 0.55, ease: "backOut" }}
        >
          <rect
            x="325"
            y="30"
            width="150"
            height="26"
            stroke={stroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text
            x="400"
            y="48"
            fontSize="12"
            fill={stroke}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            letterSpacing="4"
            fontWeight="600"
          >
            FRAMED ✓
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
