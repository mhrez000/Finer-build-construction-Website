import { useEffect, useRef } from "react";

/**
 * CursorTrail
 * ------------------------------------------------------------------
 * A thin gold line that trails behind the cursor with cinematic easing,
 * creating an architectural drawing feel. Desktop only — hidden on touch.
 *
 * Uses a lightweight canvas element (no WebGL, no Three.js).
 * The trail is a series of points with exponential decay, drawn as a
 * smooth quadratic Bezier path that fades from gold to transparent.
 */

interface Point {
  x: number;
  y: number;
  age: number;
}

const TRAIL_LENGTH = 28;
const FADE_SPEED = 0.025;
const LINE_WIDTH = 1.5;
const GOLD = { r: 196, g: 166, b: 62 }; // ~#C4A63E matches accent

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Detect touch device — skip entirely
    const checkTouch = () => {
      isTouchRef.current = true;
    };
    window.addEventListener("touchstart", checkTouch, { once: true });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    // Animation loop
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      if (isTouchRef.current) return;

      const points = pointsRef.current;
      const { x, y } = mouseRef.current;

      // Add new point at cursor position
      if (x > 0 && y > 0) {
        points.unshift({ x, y, age: 0 });
      }

      // Trim trail length
      while (points.length > TRAIL_LENGTH) {
        points.pop();
      }

      // Age all points
      for (const p of points) {
        p.age += FADE_SPEED;
      }

      // Remove fully faded points
      while (points.length > 0 && points[points.length - 1].age >= 1) {
        points.pop();
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length < 3) return;

      // Draw smooth trail using quadratic bezier curves
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < points.length - 2; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const p2 = points[i + 2];

        // Midpoints for smooth curve
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;

        // Opacity fades along the trail length and with age
        const progress = i / points.length;
        const alpha = Math.max(0, (1 - progress) * (1 - p0.age) * 0.55);

        // Line width tapers toward the tail
        const width = LINE_WIDTH * (1 - progress * 0.7);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p1.x, p1.y, mx, my);

        ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", checkTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 45 }}
      aria-hidden="true"
    />
  );
}
