import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * HouseFrameBuilder — Transformer Assembly Version
 * ------------------------------------------------------------------
 * Starts with just the concrete slab, then frame pieces fly in from
 * off-screen and snap into place with spring physics — like watching
 * a transformer assemble.
 *
 * Sequence:
 *   1. Concrete slab appears (solid fill)
 *   2. Sill plates slide in from the sides
 *   3. Wall studs drop in from above (staggered)
 *   4. Top plates slide in from left/right
 *   5. Door + window frames appear in place
 *   6. Roof rafters converge toward the peak
 *   7. Ridge beam slides in horizontally
 *   8. Ridge highlight pulses
 *   9. "FRAMED ✓" stamp
 */

// ── 3D projection ──────────────────────────────────────────────
const DX = 0.55;
const DY = -0.32;

function p(x: number, y: number, z: number = 0) {
  return { x: x + z * DX, y: y + z * DY };
}

function ln(
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number
) {
  const a = p(x1, y1, z1);
  const b = p(x2, y2, z2);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

// ── House dimensions (3D space) ────────────────────────────────
const W = 380;
const H = 200;
const D = 150;
const ROOF_H = 85;
const OX = 120;
const FLOOR_Y = 430;
const TOP_Y = FLOOR_Y - H;
const PEAK_Y = TOP_Y - ROOF_H;
const FOUND_H = 22;

const STROKE = "#C4A63E";
const FOUND_FILL = "rgba(196, 166, 62, 0.12)";

// Spring presets
const SPRING_SNAP = { type: "spring" as const, stiffness: 120, damping: 14 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 70, damping: 13 };

interface LineData {
  x1: number; y1: number; x2: number; y2: number;
}

interface SlideProps {
  line: LineData;
  delay: number;
  from: "top" | "bottom" | "left" | "right";
  sw?: number;
  op?: number;
  inView: boolean;
  spring?: typeof SPRING_SNAP;
}

function SlideInLine({ line, delay, from, sw = 2, op = 1, inView, spring = SPRING_SNAP }: SlideProps) {
  const offsets = {
    top: { x: 0, y: -350 },
    bottom: { x: 0, y: 350 },
    left: { x: -400, y: 0 },
    right: { x: 400, y: 0 },
  };
  const o = offsets[from];

  return (
    <motion.g
      initial={{ x: o.x, y: o.y, opacity: 0 }}
      animate={inView ? { x: 0, y: 0, opacity: op } : {}}
      transition={{ delay, ...spring }}
    >
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        strokeWidth={sw}
        stroke={STROKE}
      />
    </motion.g>
  );
}

// ── Component ──────────────────────────────────────────────────
export function HouseFrameBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Stud positions
  const frontStuds = [0, 50, 100, 150, 230, 280, 330, 380];
  const sideStuds = [0, 40, 80, 120, 150];

  // Timing constants
  const T_FOUNDATION = 0.2;
  const T_SILL = 1.6;
  const T_STUDS_START = 2.0;
  const T_TOP_PLATES = 3.2;
  const T_OPENINGS = 3.8;
  const T_ROOF = 4.3;
  const T_RIDGE = 5.5;
  const T_STAMP = 6.2;

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 850 550"
        className="w-full h-auto"
        fill="none"
        stroke={STROKE}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-label="Animated transformer-style house frame assembly"
        role="img"
      >
        {/* ══════ PHASE 1 — Concrete Slab (appears first, solid) ══════ */}
        {(() => {
          // Foundation 3D box with fill
          const ftl = p(OX - 10, FLOOR_Y, 0);
          const ftr = p(OX + W + 10, FLOOR_Y, 0);
          const fbr = p(OX + W + 10, FLOOR_Y + FOUND_H, 0);
          const fbl = p(OX - 10, FLOOR_Y + FOUND_H, 0);
          const btr = p(OX + W + 10, FLOOR_Y, D);
          const bbr = p(OX + W + 10, FLOOR_Y + FOUND_H, D);
          const btl = p(OX - 10, FLOOR_Y, D);

          const frontFace = `M ${ftl.x} ${ftl.y} L ${ftr.x} ${ftr.y} L ${fbr.x} ${fbr.y} L ${fbl.x} ${fbl.y} Z`;
          const topFace = `M ${ftl.x} ${ftl.y} L ${ftr.x} ${ftr.y} L ${btr.x} ${btr.y} L ${btl.x} ${btl.y} Z`;
          const sideFace = `M ${ftr.x} ${ftr.y} L ${btr.x} ${btr.y} L ${bbr.x} ${bbr.y} L ${fbr.x} ${fbr.y} Z`;

          return (
            <motion.g
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: T_FOUNDATION, duration: 0.9, ease: "easeOut" }}
            >
              {/* Filled faces */}
              <path d={topFace} fill={FOUND_FILL} stroke="none" />
              <path d={sideFace} fill={FOUND_FILL} stroke="none" />
              <path d={frontFace} fill={FOUND_FILL} stroke="none" />
              {/* Outlines */}
              <path d={frontFace} strokeWidth={2.5} />
              <path d={topFace} strokeWidth={2} opacity="0.5" />
              <path d={sideFace} strokeWidth={2.5} />
              {/* Concrete hatching on front */}
              {Array.from({ length: 8 }).map((_, i) => {
                const x = OX + i * 50;
                const a = p(x, FLOOR_Y + FOUND_H, 0);
                const b = p(x + 18, FLOOR_Y, 0);
                return (
                  <line
                    key={`hatch-${i}`}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    strokeWidth={0.8}
                    opacity={0.4}
                  />
                );
              })}
            </motion.g>
          );
        })()}

        {/* ══════ PHASE 2 — Sill plates (slide in) ══════ */}
        <SlideInLine line={ln(OX, FLOOR_Y, 0, OX + W, FLOOR_Y, 0)} delay={T_SILL} from="left" sw={3.5} inView={inView} spring={SPRING_SNAP} />
        <SlideInLine line={ln(OX + W, FLOOR_Y, 0, OX + W, FLOOR_Y, D)} delay={T_SILL + 0.1} from="right" sw={3.5} inView={inView} spring={SPRING_SNAP} />
        <SlideInLine line={ln(OX + W, FLOOR_Y, D, OX, FLOOR_Y, D)} delay={T_SILL + 0.15} from="top" sw={2} op={0.5} inView={inView} />

        {/* ══════ PHASE 3 — Front wall studs (drop from above) ══════ */}
        {frontStuds.map((sx, i) => (
          <SlideInLine
            key={`fs-${i}`}
            line={ln(OX + sx, FLOOR_Y, 0, OX + sx, TOP_Y, 0)}
            delay={T_STUDS_START + i * 0.08}
            from="top"
            sw={2}
            inView={inView}
            spring={SPRING_SNAP}
          />
        ))}

        {/* ══════ PHASE 3b — Side wall studs (drop) ══════ */}
        {sideStuds.map((sz, i) => (
          <SlideInLine
            key={`ss-${i}`}
            line={ln(OX + W, FLOOR_Y, sz, OX + W, TOP_Y, sz)}
            delay={T_STUDS_START + 0.5 + i * 0.08}
            from="top"
            sw={2}
            op={i === 0 ? 1 : 0.7}
            inView={inView}
            spring={SPRING_SNAP}
          />
        ))}

        {/* Back wall studs (dimmer, drop from above) */}
        {[0, 100, 200, 380].map((sx, i) => (
          <SlideInLine
            key={`bs-${i}`}
            line={ln(OX + sx, FLOOR_Y, D, OX + sx, TOP_Y, D)}
            delay={T_STUDS_START + 1.1 + i * 0.06}
            from="top"
            sw={1.5}
            op={0.3}
            inView={inView}
          />
        ))}

        {/* ══════ PHASE 4 — Top plates (slide in from sides) ══════ */}
        <SlideInLine line={ln(OX, TOP_Y, 0, OX + W, TOP_Y, 0)} delay={T_TOP_PLATES} from="left" sw={3.5} inView={inView} spring={SPRING_SNAP} />
        <SlideInLine line={ln(OX, TOP_Y - 8, 0, OX + W, TOP_Y - 8, 0)} delay={T_TOP_PLATES + 0.1} from="left" sw={1.5} op={0.8} inView={inView} />
        <SlideInLine line={ln(OX + W, TOP_Y, 0, OX + W, TOP_Y, D)} delay={T_TOP_PLATES + 0.15} from="right" sw={3.5} inView={inView} spring={SPRING_SNAP} />
        <SlideInLine line={ln(OX + W, TOP_Y - 8, 0, OX + W, TOP_Y - 8, D)} delay={T_TOP_PLATES + 0.25} from="right" sw={1.5} op={0.8} inView={inView} />
        <SlideInLine line={ln(OX, TOP_Y, D, OX + W, TOP_Y, D)} delay={T_TOP_PLATES + 0.3} from="top" sw={2} op={0.4} inView={inView} />
        <SlideInLine line={ln(OX, TOP_Y, 0, OX, TOP_Y, D)} delay={T_TOP_PLATES + 0.35} from="top" sw={2} op={0.5} inView={inView} />

        {/* ══════ PHASE 5 — Openings (fade in place) ══════ */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: T_OPENINGS, duration: 0.5, ease: "backOut" }}
          style={{ transformOrigin: `${p(OX + 192, TOP_Y + 80, 0).x}px ${p(OX + 192, TOP_Y + 80, 0).y}px` }}
        >
          {/* Door king studs */}
          <line {...ln(OX + 170, FLOOR_Y, 0, OX + 170, TOP_Y, 0)} strokeWidth={2} />
          <line {...ln(OX + 215, FLOOR_Y, 0, OX + 215, TOP_Y, 0)} strokeWidth={2} />
          <line {...ln(OX + 170, TOP_Y + 60, 0, OX + 215, TOP_Y + 60, 0)} strokeWidth={2.5} />
          {/* Front window */}
          <line {...ln(OX + 50, TOP_Y + 80, 0, OX + 100, TOP_Y + 80, 0)} strokeWidth={1.5} />
          <line {...ln(OX + 50, TOP_Y + 140, 0, OX + 100, TOP_Y + 140, 0)} strokeWidth={1.5} />
          <line {...ln(OX + 50, TOP_Y + 80, 0, OX + 50, TOP_Y + 140, 0)} strokeWidth={1.5} />
          <line {...ln(OX + 100, TOP_Y + 80, 0, OX + 100, TOP_Y + 140, 0)} strokeWidth={1.5} />
          {/* Side window */}
          <line {...ln(OX + W, TOP_Y + 80, 50, OX + W, TOP_Y + 80, 100)} strokeWidth={1.5} opacity={0.7} />
          <line {...ln(OX + W, TOP_Y + 140, 50, OX + W, TOP_Y + 140, 100)} strokeWidth={1.5} opacity={0.7} />
          <line {...ln(OX + W, TOP_Y + 80, 50, OX + W, TOP_Y + 140, 50)} strokeWidth={1.5} opacity={0.7} />
          <line {...ln(OX + W, TOP_Y + 80, 100, OX + W, TOP_Y + 140, 100)} strokeWidth={1.5} opacity={0.7} />
        </motion.g>

        {/* ══════ PHASE 6 — Roof rafters (converge toward peak) ══════ */}
        {/* Front gable */}
        <SlideInLine line={ln(OX, TOP_Y, 0, OX + W / 2, PEAK_Y, 0)} delay={T_ROOF} from="left" sw={3.5} inView={inView} spring={SPRING_SOFT} />
        <SlideInLine line={ln(OX + W, TOP_Y, 0, OX + W / 2, PEAK_Y, 0)} delay={T_ROOF + 0.05} from="right" sw={3.5} inView={inView} spring={SPRING_SOFT} />

        {/* Back gable (dimmer) */}
        <SlideInLine line={ln(OX, TOP_Y, D, OX + W / 2, PEAK_Y, D)} delay={T_ROOF + 0.2} from="left" sw={2} op={0.4} inView={inView} spring={SPRING_SOFT} />
        <SlideInLine line={ln(OX + W, TOP_Y, D, OX + W / 2, PEAK_Y, D)} delay={T_ROOF + 0.25} from="right" sw={2} op={0.4} inView={inView} spring={SPRING_SOFT} />

        {/* Right slope rafters (drop from top) */}
        {[0, 40, 80, 120, D].map((z, i) => (
          <SlideInLine
            key={`rr-${i}`}
            line={ln(OX + W, TOP_Y, z, OX + W / 2, PEAK_Y, z)}
            delay={T_ROOF + 0.4 + i * 0.08}
            from="top"
            sw={1.5}
            op={i === 0 ? 1 : 0.5}
            inView={inView}
          />
        ))}

        {/* Left slope rafters (drop from top) */}
        {[0, 40, 80, 120, D].map((z, i) => (
          <SlideInLine
            key={`lr-${i}`}
            line={ln(OX, TOP_Y, z, OX + W / 2, PEAK_Y, z)}
            delay={T_ROOF + 0.4 + i * 0.08}
            from="top"
            sw={1.5}
            op={i === 0 ? 1 : 0.5}
            inView={inView}
          />
        ))}

        {/* Right slope eave line */}
        <SlideInLine line={ln(OX + W, TOP_Y, 0, OX + W, TOP_Y, D)} delay={T_ROOF + 0.9} from="right" sw={2} op={0.5} inView={inView} />

        {/* ══════ PHASE 7 — Ridge beam (slides in) ══════ */}
        <SlideInLine
          line={ln(OX + W / 2, PEAK_Y, 0, OX + W / 2, PEAK_Y, D)}
          delay={T_RIDGE}
          from="right"
          sw={3}
          inView={inView}
          spring={SPRING_SNAP}
        />

        {/* Collar ties (fade in after structure) */}
        {[0, D / 2, D].map((z, i) => (
          <motion.line
            key={`ct-${i}`}
            {...ln(OX + 70, TOP_Y - 30, z, OX + W - 70, TOP_Y - 30, z)}
            strokeWidth={1.2}
            opacity={i === 0 ? 0.8 : 0.35}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: T_RIDGE + 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* ══════ PHASE 8 — Ridge highlights (pulse) ══════ */}
        {(() => {
          const fp = p(OX + W / 2, PEAK_Y, 0);
          const bp = p(OX + W / 2, PEAK_Y, D);
          return (
            <>
              <motion.circle
                cx={fp.x} cy={fp.y} r={5}
                fill={STROKE} stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: [0, 1.8, 1], opacity: 1 } : {}}
                transition={{ delay: T_RIDGE + 0.15, duration: 0.7 }}
              />
              <motion.circle
                cx={bp.x} cy={bp.y} r={3.5}
                fill={STROKE} stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: [0, 1.5, 1], opacity: 0.5 } : {}}
                transition={{ delay: T_RIDGE + 0.3, duration: 0.6 }}
              />
            </>
          );
        })()}

        {/* ══════ PHASE 9 — Dimensions + stamp ══════ */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ delay: T_STAMP - 0.4, duration: 0.5 }}
        >
          {(() => {
            const a = p(OX - 10, FLOOR_Y + FOUND_H + 25, 0);
            const b = p(OX + W + 10, FLOOR_Y + FOUND_H + 25, 0);
            const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            return (
              <>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={0.6} />
                <line x1={a.x} y1={a.y - 5} x2={a.x} y2={a.y + 5} strokeWidth={0.6} />
                <line x1={b.x} y1={b.y - 5} x2={b.x} y2={b.y + 5} strokeWidth={0.6} />
                <text
                  x={mid.x} y={mid.y + 15}
                  fontSize="10" fill={STROKE} textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui" letterSpacing="2"
                >
                  38'-0"
                </text>
              </>
            );
          })()}
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: T_STAMP, duration: 0.6, ease: "backOut" }}
        >
          {(() => {
            const pos = p(OX + W / 2, PEAK_Y - 35, 0);
            return (
              <>
                <rect
                  x={pos.x - 75} y={pos.y - 13}
                  width={150} height={26}
                  stroke={STROKE} strokeWidth={1.2} fill="none"
                />
                <text
                  x={pos.x} y={pos.y + 5}
                  fontSize="12" fill={STROKE} textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                  letterSpacing="4" fontWeight="600"
                >
                  FRAMED ✓
                </text>
              </>
            );
          })()}
        </motion.g>
      </svg>
    </div>
  );
}
