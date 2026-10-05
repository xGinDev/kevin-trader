"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { duration, ease } from "@/lib/motion";

// Figma · Aparición de secciones: whileInView una vez (amount 0.2), opacity 0→1 e y 8→0
// en 220 ms. Tarjetas con stagger de 40 ms, máximo 3. Con movimiento reducido: solo opacity, 150 ms.

const STAGGER = 0.04;
const MAX_STAGGERED = 3;

function useRevealVariants(): Variants {
  const reduced = useReducedMotion();
  return {
    // El estado inicial no depende de `reduced` para que coincida con el HTML del servidor;
    // MotionConfig reducedMotion="user" ya anula el desplazamiento.
    hidden: { opacity: 0, y: 8 },
    visible: (index: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? duration.reduced : duration.reveal,
        ease,
        delay: reduced ? 0 : Math.min(index, MAX_STAGGERED - 1) * STAGGER,
      },
    }),
  };
}

const viewport = { once: true, amount: 0.2 } as const;

type RevealProps = React.ComponentProps<typeof motion.div>;

/** Un bloque que aparece solo (por ejemplo, el encabezado de una sección). */
export function Reveal(props: RevealProps) {
  const variants = useRevealVariants();
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...props}
    />
  );
}

/** Grupo de tarjetas: dispara la aparición de sus RevealItem en cascada. */
export function RevealGroup(props: RevealProps) {
  return <motion.div initial="hidden" whileInView="visible" viewport={viewport} {...props} />;
}

export function RevealItem({ index, ...props }: RevealProps & { index: number }) {
  const variants = useRevealVariants();
  return <motion.div variants={variants} custom={index} {...props} />;
}
