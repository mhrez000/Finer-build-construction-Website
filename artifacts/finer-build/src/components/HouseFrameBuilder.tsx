import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * HouseFrameBuilder — Realistic 3D Transformer Assembly
 * ------------------------------------------------------------------
 * Every stud, plate, rafter and beam is rendered as a filled 3D box
 * with three shaded faces (front/side/top) for real dimensionality.
 * Concrete slab appears first, then wood pieces drop and snap into
 * place with spring physics.
 */

// ── 3D projection ──────────────────────────────────────────────
const DX = 0.55;
const DY = -0.32;

function p(x: number, y: number, z: number = 0) {
  return { x: x + z * DX, y: y + z * DY };
}

// ── Dimensions ─────────────────────────────────────────────────
const W = 380;
const H = 200;
const D = 150;
const ROOF_H = 85;
const OX = 120;
const FLOOR_Y = 430;
const TOP_Y = FLOOR_Y - H;
const PEAK_Y = TOP_Y - ROOF_H;
const FOUND_H = 22;
const STUD_T = 5;      // stud thickness (3D)
const PLATE_T = 7;     // plate/beam thickness
const RAFTER_T = 6;

// ── Realistic material colors ──────────────────────────────────
const C = {
  // Concrete
  concreteFront: "#C4BEB5",
  concreteTop:   "#D8D2C9",
  concreteSide:  "#A8A299",
  concreteEdge:  "#706B62",
  // OSB sheathing
  osbFill: "#C9A876",
  osbEdge: "#8B7148",
  // Wood studs (pine 2x4 look)
  woodLight: "#E2C99A",
  woodMid:   "#C8AA72",
  woodDark:  "#8E7448",
  woodEdge:  "#5C4628",
  // Roof
  roofTop:  "#B8936A",
  roofSide: "#96724E",
  // Highlight
  gold: "#C4A63E",
};

// Spring presets
const SNAP = { type: "spring" as const, stiffness: 120, damping: 14 };
const SOFT = { type: "spring" as const, stiffness: 70, damping: 13 };

type Face = { x: number; y: number }[];
const pts = (face: Face) => face.map((pt) => `${pt.x},${pt.y}`).join(" ");

// ── 3D Vertical Stud component ─────────────────────────────────
function VerticalStud({
  x, z, fromY, toY, t = STUD_T,
}: { x: number; z: number; fromY: number; toY: number; t?: number }) {
  // Front face (facing viewer)
  const f: Face = [
    p(x, fromY, z), p(x + t, fromY, z),
    p(x + t, toY, z), p(x, toY, z),
  ];
  // Right face
  const r: Face = [
    p(x + t, fromY, z), p(x + t, fromY, z + t),
    p(x + t, toY, z + t), p(x + t, toY, z),
  ];
  // Top cap
  const top: Face = [
    p(x, toY, z), p(x + t, toY, z),
    p(x + t, toY, z + t), p(x, toY, z + t),
  ];
  return (
    <g>
      <polygon points={pts(r)} fill={C.woodDark} stroke={C.woodEdge} strokeWidth={0.4} />
      <polygon points={pts(top)} fill={C.woodLight} stroke={C.woodEdge} strokeWidth={0.4} />
      <polygon points={pts(f)} fill={C.woodMid} stroke={C.woodEdge} strokeWidth={0.4} />
    </g>
  );
}

// ── 3D Horizontal Plate component (runs along X axis) ──────────
function HorizontalPlate({
  x1, x2, y, z, t = PLATE_T,
}: { x1: number; x2: number; y: number; z: number; t?: number }) {
  // Front face (facing viewer)
  const f: Face = [
    p(x1, y, z), p(x2, y, z),
    p(x2, y + t, z), p(x1, y + t, z),
  ];
  // Top face
  const top: Face = [
    p(x1, y, z), p(x2, y, z),
    p(x2, y, z + t), p(x1, y, z + t),
  ];
  // Right end cap
  const right: Face = [
    p(x2, y, z), p(x2, y + t, z),
    p(x2, y + t, z + t), p(x2, y, z + t),
  ];
  return (
    <g>
      <polygon points={pts(right)} fill={C.woodDark} stroke={C.woodEdge} strokeWidth={0.4} />
      <polygon points={pts(top)} fill={C.woodLight} stroke={C.woodEdge} strokeWidth={0.4} />
      <polygon points={pts(f)} fill={C.woodMid} stroke={C.woodEdge} strokeWidth={0.4} />
    </g>
  );
}

// ── 3D Depth Plate (runs along Z axis / into depth) ────────────
function DepthPlate({
  x, y, z1, z2, t = PLATE_T,
}: { x: number; y: number; z1: number; z2: number; t?: number }) {
  // Front-facing side face
  const side: Face = [
    p(x, y, z1), p(x, y, z2),
    p(x, y + t, z2), p(x, y + t, z1),
  ];
  // Top face
  const top: Face = [
    p(x, y, z1), p(x, y, z2),
    p(x + t, y, z2), p(x + t, y, z1),
  ];
  return (
    <g>
      <polygon points={pts(top)} fill={C.woodLight} stroke={C.woodEdge} strokeWidth={0.4} />
      <polygon points={pts(side)} fill={C.woodMid} stroke={C.woodEdge} strokeWidth={0.4} />
    </g>
  );
}

// ── Rafter (angled) as 3D filled beam ──────────────────────────
function Rafter({
  x1, y1, x2, y2, z, t = RAFTER_T,
}: { x1: number; y1: number; x2: number; y2: number; z: number; t?: number }) {
  // Compute perpendicular offset for thickness
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const perpX = (-dy / len) * t;
  const perpY = (dx / len) * t;

  const a = p(x1, y1, z);
  const b = p(x2, y2, z);
  // Top edge of rafter
  const a2 = { x: a.x + perpX, y: a.y + perpY };
  const b2 = { x: b.x + perpX, y: b.y + perpY };

  // Main face
  const face: Face = [a, b, b2, a2];

  // Side (depth) face
  const aBack = p(x1, y1, z + t);
  const bBack = p(x2, y2, z + t);
  const side: Face = [a, b, bBack, aBack];

  return (
    <g>
      <polygon points={pts(side)} fill={C.roofSide} stroke={C.woodEdge} strokeWidth={0.3} />
      <polygon points={pts(face)} fill={C.roofTop} stroke={C.woodEdge} strokeWidth={0.3} />
    </g>
  );
}

// ── SlideIn wrapper for any 3D piece ───────────────────────────
function SlideIn({
  children, delay, from, inView, spring = SNAP,
}: {
  children: React.ReactNode;
  delay: number;
  from: "top" | "bottom" | "left" | "right";
  inView: boolean;
  spring?: typeof SNAP;
}) {
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
      animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ delay, ...spring }}
    >
      {children}
    </motion.g>
  );
}

// ── Component ──────────────────────────────────────────────────
export function HouseFrameBuilder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const frontStuds = [0, 50, 100, 150, 230, 280, 330, 380];
  const sideStuds = [0, 40, 80, 120, 150];

  // Timing
  const T_SLAB = 0.2;
  const T_SILL = 1.6;
  const T_STUDS = 2.0;
  const T_PLATES = 3.3;
  const T_OPEN = 3.9;
  const T_ROOF = 4.4;
  const T_RIDGE = 5.6;
  const T_STAMP = 6.3;

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 850 550"
        className="w-full h-auto"
        fill="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        aria-label="Realistic 3D house frame assembly"
        role="img"
      >
        {/* ══════ PHASE 1 — Concrete Slab (filled 3D box) ══════ */}
        {(() => {
          const ftl = p(OX - 10, FLOOR_Y, 0);
          const ftr = p(OX + W + 10, FLOOR_Y, 0);
          const fbr = p(OX + W + 10, FLOOR_Y + FOUND_H, 0);
          const fbl = p(OX - 10, FLOOR_Y + FOUND_H, 0);
          const btr = p(OX + W + 10, FLOOR_Y, D);
          const bbr = p(OX + W + 10, FLOOR_Y + FOUND_H, D);
          const btl = p(OX - 10, FLOOR_Y, D);
          const front: Face = [ftl, ftr, fbr, fbl];
          const top: Face = [ftl, ftr, btr, btl];
          const side: Face = [ftr, btr, bbr, fbr];
          return (
            <motion.g
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: T_SLAB, duration: 0.9, ease: "easeOut" }}
            >
              <polygon points={pts(side)} fill={C.concreteSide} stroke={C.concreteEdge} strokeWidth={0.8} />
              <polygon points={pts(top)} fill={C.concreteTop} stroke={C.concreteEdge} strokeWidth={0.8} />
              <polygon points={pts(front)} fill={C.concreteFront} stroke={C.concreteEdge} strokeWidth={0.8} />
              {/* Concrete seams */}
              {[OX + W * 0.33, OX + W * 0.67].map((x, i) => {
                const a = p(x, FLOOR_Y, 0);
                const b = p(x, FLOOR_Y, D);
                return <line key={`seam-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.concreteEdge} strokeWidth={0.5} opacity={0.5} />;
              })}
            </motion.g>
          );
        })()}

        {/* ══════ PHASE 2 — Sill plates (slide in) ══════ */}
        <SlideIn delay={T_SILL} from="left" inView={inView}>
          <HorizontalPlate x1={OX} x2={OX + W} y={FLOOR_Y - PLATE_T} z={0} />
        </SlideIn>
        <SlideIn delay={T_SILL + 0.15} from="right" inView={inView}>
          <DepthPlate x={OX + W} y={FLOOR_Y - PLATE_T} z1={0} z2={D} />
        </SlideIn>

        {/* ══════ PHASE 3 — Front wall studs (drop from above) ══════ */}
        {frontStuds.map((sx, i) => (
          <SlideIn key={`fs-${i}`} delay={T_STUDS + i * 0.08} from="top" inView={inView}>
            <VerticalStud x={OX + sx} z={0} fromY={FLOOR_Y - PLATE_T} toY={TOP_Y} />
          </SlideIn>
        ))}

        {/* ══════ PHASE 3b — Side wall studs ══════ */}
        {sideStuds.map((sz, i) => (
          <SlideIn key={`ss-${i}`} delay={T_STUDS + 0.5 + i * 0.08} from="top" inView={inView}>
            <VerticalStud x={OX + W} z={sz} fromY={FLOOR_Y - PLATE_T} toY={TOP_Y} />
          </SlideIn>
        ))}

        {/* Back wall studs (dimmer) */}
        {[0, 100, 200, 380].map((sx, i) => (
          <motion.g
            key={`bs-${i}`}
            initial={{ y: -350, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 0.5 } : {}}
            transition={{ delay: T_STUDS + 1.1 + i * 0.06, ...SNAP }}
          >
            <VerticalStud x={OX + sx} z={D} fromY={FLOOR_Y - PLATE_T} toY={TOP_Y} t={STUD_T - 1} />
          </motion.g>
        ))}

        {/* ══════ PHASE 4 — Top plates (slide in from sides) ══════ */}
        <SlideIn delay={T_PLATES} from="left" inView={inView}>
          <HorizontalPlate x1={OX} x2={OX + W} y={TOP_Y - PLATE_T} z={0} />
        </SlideIn>
        <SlideIn delay={T_PLATES + 0.15} from="right" inView={inView}>
          <DepthPlate x={OX + W} y={TOP_Y - PLATE_T} z1={0} z2={D} />
        </SlideIn>
        {/* Back top plate (dimmed, fade in) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ delay: T_PLATES + 0.3, duration: 0.6 }}
        >
          <HorizontalPlate x1={OX} x2={OX + W} y={TOP_Y - PLATE_T} z={D} t={PLATE_T - 2} />
        </motion.g>

        {/* ══════ PHASE 5 — Door + window openings ══════ */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: T_OPEN, duration: 0.5, ease: "backOut" }}
          style={{ transformOrigin: `${p(OX + 192, TOP_Y + 80, 0).x}px ${p(OX + 192, TOP_Y + 80, 0).y}px` }}
        >
          {/* Door king studs */}
          <VerticalStud x={OX + 170} z={0} fromY={FLOOR_Y - PLATE_T} toY={TOP_Y} />
          <VerticalStud x={OX + 215} z={0} fromY={FLOOR_Y - PLATE_T} toY={TOP_Y} />
          {/* Door header */}
          <HorizontalPlate x1={OX + 170} x2={OX + 220} y={TOP_Y + 60} z={0} t={5} />
          {/* Front window frame */}
          {(() => {
            const c = [
              p(OX + 50, TOP_Y + 80, 0),
              p(OX + 100, TOP_Y + 80, 0),
              p(OX + 100, TOP_Y + 140, 0),
              p(OX + 50, TOP_Y + 140, 0),
            ];
            return (
              <polygon
                points={pts(c)}
                fill="rgba(210, 215, 220, 0.3)"
                stroke={C.woodEdge}
                strokeWidth={1.5}
              />
            );
          })()}
          {/* Side window frame */}
          {(() => {
            const c = [
              p(OX + W, TOP_Y + 80, 50),
              p(OX + W, TOP_Y + 80, 100),
              p(OX + W, TOP_Y + 140, 100),
              p(OX + W, TOP_Y + 140, 50),
            ];
            return (
              <polygon
                points={pts(c)}
                fill="rgba(210, 215, 220, 0.3)"
                stroke={C.woodEdge}
                strokeWidth={1.5}
              />
            );
          })()}
        </motion.g>

        {/* ══════ PHASE 6 — Gable rafters (slide in) ══════ */}
        <SlideIn delay={T_ROOF} from="left" inView={inView} spring={SOFT}>
          <Rafter x1={OX} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={0} />
        </SlideIn>
        <SlideIn delay={T_ROOF + 0.05} from="right" inView={inView} spring={SOFT}>
          <Rafter x1={OX + W} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={0} />
        </SlideIn>

        {/* Back gable (dimmed) */}
        <motion.g
          initial={{ opacity: 0, x: -200 }}
          animate={inView ? { opacity: 0.4, x: 0 } : {}}
          transition={{ delay: T_ROOF + 0.2, ...SOFT }}
        >
          <Rafter x1={OX} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={D} t={RAFTER_T - 2} />
          <Rafter x1={OX + W} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={D} t={RAFTER_T - 2} />
        </motion.g>

        {/* Interior rafters (drop from top) */}
        {[40, 80, 120].map((z, i) => (
          <motion.g
            key={`ir-${i}`}
            initial={{ y: -300, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 0.75 } : {}}
            transition={{ delay: T_ROOF + 0.4 + i * 0.1, ...SNAP }}
          >
            <Rafter x1={OX} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={z} t={RAFTER_T - 2} />
            <Rafter x1={OX + W} y1={TOP_Y - PLATE_T} x2={OX + W / 2} y2={PEAK_Y} z={z} t={RAFTER_T - 2} />
          </motion.g>
        ))}

        {/* ══════ PHASE 7 — Ridge beam (slides in) ══════ */}
        <SlideIn delay={T_RIDGE} from="right" inView={inView}>
          <DepthPlate x={OX + W / 2} y={PEAK_Y} z1={0} z2={D} t={6} />
        </SlideIn>

        {/* ══════ PHASE 8 — Ridge peak highlight ══════ */}
        {(() => {
          const fp = p(OX + W / 2, PEAK_Y, 0);
          return (
            <motion.circle
              cx={fp.x} cy={fp.y} r={5}
              fill={C.gold} stroke="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: [0, 1.8, 1], opacity: 1 } : {}}
              transition={{ delay: T_RIDGE + 0.15, duration: 0.7 }}
            />
          );
        })()}

        {/* ══════ PHASE 9 — Dimension + stamp ══════ */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: T_STAMP - 0.4, duration: 0.5 }}
        >
          {(() => {
            const a = p(OX - 10, FLOOR_Y + FOUND_H + 25, 0);
            const b = p(OX + W + 10, FLOOR_Y + FOUND_H + 25, 0);
            const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            return (
              <g stroke={C.woodEdge}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={0.6} />
                <line x1={a.x} y1={a.y - 5} x2={a.x} y2={a.y + 5} strokeWidth={0.6} />
                <line x1={b.x} y1={b.y - 5} x2={b.x} y2={b.y + 5} strokeWidth={0.6} />
                <text
                  x={mid.x} y={mid.y + 15}
                  fontSize="10" fill={C.woodEdge} textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui" letterSpacing="2"
                  stroke="none"
                >
                  38'-0"
                </text>
              </g>
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
              <g>
                <rect
                  x={pos.x - 75} y={pos.y - 13}
                  width={150} height={26}
                  fill="rgba(255,255,255,0.85)"
                  stroke={C.gold} strokeWidth={1.2}
                />
                <text
                  x={pos.x} y={pos.y + 5}
                  fontSize="12" fill={C.gold} textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                  letterSpacing="4" fontWeight="600"
                >
                  FRAMED ✓
                </text>
              </g>
            );
          })()}
        </motion.g>
      </svg>
    </div>
  );
}
