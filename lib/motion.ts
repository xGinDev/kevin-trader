// Figma · Notas de interacción

/** Curva única: ease-out personalizado. */
export const ease = [0.23, 1, 0.32, 1] as const;

/** Duraciones en segundos. Salir es ~25 % más rápido que entrar. */
export const duration = {
  press: 0.15,
  hover: 0.15,
  enter: 0.2,
  exit: 0.15,
  reveal: 0.22,
  panel: 0.24,
  error: 0.18,
  reduced: 0.15,
} as const;
