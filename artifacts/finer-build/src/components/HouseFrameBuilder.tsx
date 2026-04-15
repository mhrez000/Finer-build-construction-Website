import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * HouseFrameBuilder — 3D Isometric Version
 * ------------------------------------------------------------------
 * An isometric 3D SVG animation that "builds" a stick-framed house
 * showing front wall, side wall, and roof with real depth.
 * Triggers once when scrolled into view.
 */

// ── 3D projection ──────────────────────────────────────────────
const DX = 0.55; // depth → x offset ratio
const DY = -0.32; // depth → y offset ratio

function p(x: number, y: number, z: number = 0) {
  return { x: x + z * DX, y: y + z * DY };
}

function line(
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number
) {
  const a = p(x1, y1, z1);
  const b = p(x2, y2, z2);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

// ── House dimensions (3D space) ────────────────────────────────
const W = 380; // width
const H = 200; // wall height
const D = 150; // depth
const ROOF_H = 85; // roof peak above top plate
const OX = 120; // origin x offset
const FLOOR_Y = 430; // floor level
const TOP_Y = FLOOR_Y - H; // top plate level (230)
const PEAK_Y = TOP_Y - ROOF_H; // ridge peak (145)
const FOUND_H = 22; // foundation height

const STROKE = "#C4A63E"; // gold
const STROKE_DIM = "#C4A63E";

// ── Component ──────────────────────────────────────────────────
export function HouseFrameBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Helper to create animated line props
  const aLine = (
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number,
    delay: number,
    sw: number = 2,
    opacity: number = 1
  ) => {
    const l = line(x1, y1, z1, x2, y2, z2);
    return {
      x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2,
      strokeWidth: sw,
      initial: { pathLength: 0, opacity: 0 },
      animate: inView ? { pathLength: 1, opacity } : {},
      transition: { delay, duration: 0.5, ease: "easeOut" as const },
    };
  };

  // Front wall stud x-positions (relative to OX)
  const frontStuds = [0, 50, 100, 150, 230, 280, 330, 380];
  // Side wall stud z-positions
  const sideStuds = [0, 40, 80, 120, 150];

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
        aria-label="Animated 3D stick-framed house build sequence"
        role="img"
      >
        {/* ── Foundation (3D box) ────────────────────────── */}
        {/* Front face */}
        <motion.line {...aLine(OX - 10, FLOOR_Y, 0, OX + W + 10, FLOOR_Y, 0, 0.3, 2.5)} />
        <motion.line {...aLine(OX - 10, FLOOR_Y + FOUND_H, 0, OX + W + 10, FLOOR_Y + FOUND_H, 0, 0.35, 2.5)} />
        <motion.line {...aLine(OX - 10, FLOOR_Y, 0, OX - 10, FLOOR_Y + FOUND_H, 0, 0.4, 2.5)} />
        <motion.line {...aLine(OX + W + 10, FLOOR_Y, 0, OX + W + 10, FLOOR_Y + FOUND_H, 0, 0.4, 2.5)} />
        {/* Side face */}
        <motion.line {...aLine(OX + W + 10, FLOOR_Y, 0, OX + W + 10, FLOOR_Y, D, 0.5, 2.5)} />
        <motion.line {...aLine(OX + W + 10, FLOOR_Y + FOUND_H, 0, OX + W + 10, FLOOR_Y + FOUND_H, D, 0.55, 2.5)} />
        <motion.line {...aLine(OX + W + 10, FLOOR_Y, D, OX + W + 10, FLOOR_Y + FOUND_H, D, 0.6, 2)} />
        {/* Back edge */}
        <motion.line {...aLine(OX + W + 10, FLOOR_Y, D, OX - 10, FLOOR_Y, D, 0.5, 1.5, 0.4)} />

        {/* Foundation hatching (front face) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = OX + i * 50;
          return (
            <motion.line
              key={`hatch-${i}`}
              {...aLine(x, FLOOR_Y + FOUND_H, 0, x + 18, FLOOR_Y, 0, 0.65 + i * 0.03, 1, 0.35)}
            />
          );
        })}

        {/* ── Sill plates ────────────────────────────────── */}
        {/* Front sill */}
        <motion.line {...aLine(OX, FLOOR_Y, 0, OX + W, FLOOR_Y, 0, 0.9, 3.5)} />
        {/* Side sill */}
        <motion.line {...aLine(OX + W, FLOOR_Y, 0, OX + W, FLOOR_Y, D, 1.0, 3.5)} />
        {/* Back sill */}
        <motion.line {...aLine(OX + W, FLOOR_Y, D, OX, FLOOR_Y, D, 1.05, 2, 0.5)} />

        {/* ── Front wall studs ───────────────────────────── */}
        {frontStuds.map((sx, i) => (
          <motion.line
            key={`fs-${i}`}
            {...aLine(OX + sx, FLOOR_Y, 0, OX + sx, TOP_Y, 0, 1.2 + i * 0.07)}
          />
        ))}

        {/* ── Side wall studs ────────────────────────────── */}
        {sideStuds.map((sz, i) => (
          <motion.line
            key={`ss-${i}`}
            {...aLine(OX + W, FLOOR_Y, sz, OX + W, TOP_Y, sz, 1.8 + i * 0.08, 2, i === 0 ? 1 : 0.7)}
          />
        ))}

        {/* ── Back wall studs (dimmer) ───────────────────── */}
        {[0, 100, 200, 380].map((sx, i) => (
          <motion.line
            key={`bs-${i}`}
            {...aLine(OX + sx, FLOOR_Y, D, OX + sx, TOP_Y, D, 2.2 + i * 0.06, 1.5, 0.3)}
          />
        ))}

        {/* ── Door frame (front wall) ────────────────────── */}
        <motion.line {...aLine(OX + 170, FLOOR_Y, 0, OX + 170, TOP_Y, 0, 2.5, 2)} />
        <motion.line {...aLine(OX + 215, FLOOR_Y, 0, OX + 215, TOP_Y, 0, 2.55, 2)} />
        <motion.line {...aLine(OX + 170, TOP_Y + 60, 0, OX + 215, TOP_Y + 60, 0, 2.65, 2.5)} />

        {/* ── Window (front wall) ────────────────────────── */}
        <motion.line {...aLine(OX + 50, TOP_Y + 80, 0, OX + 100, TOP_Y + 80, 0, 2.7, 1.5)} />
        <motion.line {...aLine(OX + 50, TOP_Y + 140, 0, OX + 100, TOP_Y + 140, 0, 2.75, 1.5)} />
        <motion.line {...aLine(OX + 50, TOP_Y + 80, 0, OX + 50, TOP_Y + 140, 0, 2.8, 1.5)} />
        <motion.line {...aLine(OX + 100, TOP_Y + 80, 0, OX + 100, TOP_Y + 140, 0, 2.8, 1.5)} />

        {/* ── Window (side wall) ─────────────────────────── */}
        <motion.line {...aLine(OX + W, TOP_Y + 80, 50, OX + W, TOP_Y + 80, 100, 2.85, 1.5, 0.7)} />
        <motion.line {...aLine(OX + W, TOP_Y + 140, 50, OX + W, TOP_Y + 140, 100, 2.9, 1.5, 0.7)} />
        <motion.line {...aLine(OX + W, TOP_Y + 80, 50, OX + W, TOP_Y + 140, 50, 2.85, 1.5, 0.7)} />
        <motion.line {...aLine(OX + W, TOP_Y + 80, 100, OX + W, TOP_Y + 140, 100, 2.9, 1.5, 0.7)} />

        {/* ── Top plates ─────────────────────────────────── */}
        {/* Front double plate */}
        <motion.line {...aLine(OX, TOP_Y, 0, OX + W, TOP_Y, 0, 3.0, 3.5)} />
        <motion.line {...aLine(OX, TOP_Y - 8, 0, OX + W, TOP_Y - 8, 0, 3.1, 1.5, 0.8)} />
        {/* Side plate */}
        <motion.line {...aLine(OX + W, TOP_Y, 0, OX + W, TOP_Y, D, 3.15, 3.5)} />
        <motion.line {...aLine(OX + W, TOP_Y - 8, 0, OX + W, TOP_Y - 8, D, 3.2, 1.5, 0.8)} />
        {/* Back plate */}
        <motion.line {...aLine(OX, TOP_Y, D, OX + W, TOP_Y, D, 3.25, 2, 0.4)} />
        {/* Left plate (connects front to back) */}
        <motion.line {...aLine(OX, TOP_Y, 0, OX, TOP_Y, D, 3.3, 2, 0.5)} />

        {/* ── Roof — front gable ─────────────────────────── */}
        <motion.line {...aLine(OX, TOP_Y, 0, OX + W / 2, PEAK_Y, 0, 3.5, 3.5)} />
        <motion.line {...aLine(OX + W, TOP_Y, 0, OX + W / 2, PEAK_Y, 0, 3.5, 3.5)} />

        {/* ── Roof — back gable ──────────────────────────── */}
        <motion.line {...aLine(OX, TOP_Y, D, OX + W / 2, PEAK_Y, D, 3.7, 2, 0.4)} />
        <motion.line {...aLine(OX + W, TOP_Y, D, OX + W / 2, PEAK_Y, D, 3.7, 2, 0.4)} />

        {/* ── Ridge beam (connects front to back peak) ──── */}
        <motion.line {...aLine(OX + W / 2, PEAK_Y, 0, OX + W / 2, PEAK_Y, D, 3.9, 3)} />

        {/* ── Roof slopes (eaves → ridge) ────────────────── */}
        {/* Right slope — front to back along top plate */}
        <motion.line {...aLine(OX + W, TOP_Y, 0, OX + W, TOP_Y, D, 4.0, 2, 0.5)} />
        {/* Right slope rafters */}
        {[0, 40, 80, 120, D].map((z, i) => (
          <motion.line
            key={`rr-${i}`}
            {...aLine(OX + W, TOP_Y, z, OX + W / 2, PEAK_Y, z, 4.1 + i * 0.08, 1.5, i === 0 ? 1 : 0.5)}
          />
        ))}
        {/* Left slope rafters */}
        {[0, 40, 80, 120, D].map((z, i) => (
          <motion.line
            key={`lr-${i}`}
            {...aLine(OX, TOP_Y, z, OX + W / 2, PEAK_Y, z, 4.1 + i * 0.08, 1.5, i === 0 ? 1 : 0.5)}
          />
        ))}

        {/* ── Collar ties ────────────────────────────────── */}
        {[0, D / 2, D].map((z, i) => (
          <motion.line
            key={`ct-${i}`}
            {...aLine(OX + 70, TOP_Y - 30, z, OX + W - 70, TOP_Y - 30, z, 4.6 + i * 0.1, 1.2, i === 0 ? 0.8 : 0.35)}
          />
        ))}

        {/* ── Ridge peak highlights ──────────────────────── */}
        {(() => {
          const fp = p(OX + W / 2, PEAK_Y, 0);
          const bp = p(OX + W / 2, PEAK_Y, D);
          return (
            <>
              <motion.circle
                cx={fp.x} cy={fp.y} r={5}
                fill={STROKE} stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: [0, 1.5, 1], opacity: 1 } : {}}
                transition={{ delay: 4.2, duration: 0.6 }}
              />
              <motion.circle
                cx={bp.x} cy={bp.y} r={3.5}
                fill={STROKE} stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: [0, 1.5, 1], opacity: 0.5 } : {}}
                transition={{ delay: 4.4, duration: 0.6 }}
              />
            </>
          );
        })()}

        {/* ── Dimension marks ────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ delay: 5.0, duration: 0.5 }}
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
                  x={mid.x}
                  y={mid.y + 15}
                  fontSize="10"
                  fill={STROKE}
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                  letterSpacing="2"
                >
                  38'-0"
                </text>
              </>
            );
          })()}
        </motion.g>

        {/* ── Depth dimension ────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ delay: 5.1, duration: 0.5 }}
        >
          {(() => {
            const a = p(OX + W + 25, FLOOR_Y + FOUND_H + 10, 0);
            const b = p(OX + W + 25, FLOOR_Y + FOUND_H + 10, D);
            const mid = { x: (a.x + b.x) / 2 + 12, y: (a.y + b.y) / 2 };
            return (
              <>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={0.6} />
                <text
                  x={mid.x}
                  y={mid.y}
                  fontSize="9"
                  fill={STROKE}
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                  letterSpacing="2"
                >
                  24'-0"
                </text>
              </>
            );
          })()}
        </motion.g>

        {/* ── "FRAMED ✓" completion stamp ────────────────── */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 5.4, duration: 0.55, ease: "backOut" }}
        >
          {(() => {
            const pos = p(OX + W / 2, PEAK_Y - 35, 0);
            return (
              <>
                <rect
                  x={pos.x - 75}
                  y={pos.y - 13}
                  width={150}
                  height={26}
                  stroke={STROKE}
                  strokeWidth={1.2}
                  fill="none"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  fontSize="12"
                  fill={STROKE}
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                  letterSpacing="4"
                  fontWeight="600"
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
