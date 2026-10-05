"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Trazos exportados de Figma (PriceTrace, Breakpoint=Desktop / Mobile).
const traces = {
  desktop: {
    width: 1440,
    height: 560,
    d: "M0 322.977L17.7 325.177L35.4 337.977L53.1 326.977L70.8 321.677L88.5 307.177L106.1 331.977L123.8 333.377L141.5 335.677L159.2 324.177L176.9 305.077L194.6 321.577L212.3 342.377L230 340.577L247.7 328.277L265.4 316.077L283.1 300.877L300.8 292.477L318.4 272.877L336.1 288.777L353.8 290.877L371.5 308.577L389.2 320.877L406.9 299.877L424.6 302.077L442.3 283.677L460 302.177L477.7 300.477L495.4 299.177L513.1 296.777L530.7 283.377L548.4 258.777L566.1 234.777L583.8 259.577L601.5 280.377L619.2 294.677L636.9 298.177L654.6 311.577L672.3 317.577L690 309.477L707.7 302.977L725.3 290.877L743 283.077L760.7 289.777L778.4 282.577L796.1 259.577L813.8 260.577L831.5 242.777L849.2 239.977L866.9 230.777L884.6 214.677L902.3 192.177L920 215.977L937.6 217.677L955.3 196.177L973 220.377L990.7 216.177L1008.4 225.577L1026.1 208.877L1043.8 210.277L1061.5 234.277L1079.2 217.777L1096.9 226.077L1114.6 219.977L1132.3 215.877L1149.9 227.177L1167.6 209.877L1185.3 224.377L1203 238.677L1220.7 217.177L1238.4 192.277",
    last: { x: 1238.4, y: 192.28 },
  },
  mobile: {
    width: 390,
    height: 360,
    d: "M0 207.566L9.9 221.866L19.7 215.566L29.6 206.766L39.5 214.666L49.3 216.166L59.2 210.966L69.1 219.566L78.9 228.066L88.8 229.766L98.6 235.966L108.5 240.566L118.4 250.966L128.2 242.666L138.1 238.666L148 245.366L157.8 251.766L167.7 237.266L177.6 243.066L187.4 241.866L197.3 255.366L207.2 265.166L217 252.666H226.9L236.8 266.066L246.6 271.766L256.5 275.966L266.3 277.966L276.2 290.766L286.1 303.466L295.9 298.666L305.8 292.666L315.7 302.866L325.5 296.666L335.4 284.666",
    last: { x: 335.4, y: 284.69 },
  },
} as const;

const SESSION_KEY = "price-trace-drawn";
const TRACE_DURATION = 1.2;
const TRACE_DELAY = 0.15;

type Mode = "pending" | "animate" | "static";

/** Se dibuja una vez por sesión al cargar. Con movimiento reducido, completo y estático. */
function useTraceMode(): Mode {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    let alreadyDrawn = false;
    try {
      alreadyDrawn = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Sin sessionStorage: se anima en cada carga.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende de sessionStorage, solo existe en el cliente
    setMode(reduced || alreadyDrawn ? "static" : "animate");
  }, [reduced]);

  return mode;
}

type PriceTraceProps = {
  breakpoint: "desktop" | "mobile";
  className?: string;
};

export function PriceTrace({ breakpoint, className }: PriceTraceProps) {
  const mode = useTraceMode();
  const trace = traces[breakpoint];
  const animate = mode === "animate";

  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${trace.width} ${trace.height}`}
      preserveAspectRatio="xMaxYMid slice"
      className={cn("pointer-events-none", mode === "pending" && "opacity-0", className)}
    >
      <motion.path
        d={trace.d}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: TRACE_DURATION, delay: TRACE_DELAY, ease }}
      />
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.enter, delay: TRACE_DELAY + TRACE_DURATION, ease }}
      >
        <line
          x1={trace.last.x}
          y1={trace.last.y - 0.75}
          x2={trace.width}
          y2={trace.last.y - 0.75}
          stroke="var(--primary)"
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />
        <circle cx={trace.last.x} cy={trace.last.y} r={3.5} fill="var(--primary)" />
      </motion.g>
    </svg>
  );
}
