"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";

import { formatNumber } from "@/lib/format";
import { ease } from "@/lib/motion";

type StatItemProps = {
  value: number;
  label: string;
};

/**
 * Cuenta desde 0 una sola vez al entrar en viewport (700 ms; un conteo de 200 ms no se lee).
 * Con movimiento reducido se muestra el valor final. El servidor ya renderiza el valor final.
 */
export function StatItem({ value, label }: StatItemProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const count = useMotionValue(value);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useMotionValueEvent(count, "change", (latest) => setDisplay(Math.round(latest)));

  useEffect(() => {
    if (reduced || started.current) return;
    if (!inView) {
      count.set(0);
      return;
    }
    started.current = true;
    const controls = animate(count, value, { duration: 0.7, ease });
    return () => controls.stop();
  }, [inView, reduced, value, count]);

  return (
    <div className="flex flex-col gap-1">
      <p ref={ref} className="text-stat text-foreground">
        <span aria-hidden>{formatNumber(display)}</span>
        <span className="sr-only">{formatNumber(value)}</span>
      </p>
      <p className="max-w-[200px] text-body-sm text-muted-foreground">{label}</p>
    </div>
  );
}
