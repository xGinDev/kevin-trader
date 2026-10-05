"use client";

import { motion } from "motion/react";

import { duration, ease } from "@/lib/motion";

type MethodStepProps = {
  step: number;
  title: string;
  body: string;
};

/** La numeración es real: los pasos son una secuencia. El tick ámbar se dibuja de 0 a 32 px al entrar (200 ms). */
export function MethodStep({ step, title, body }: MethodStepProps) {
  return (
    <li className="flex flex-col gap-3.5">
      <div aria-hidden className="h-0.5 w-full bg-border">
        <motion.div
          className="h-0.5 w-8 origin-left bg-primary"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: duration.enter, ease }}
        />
      </div>
      <p className="text-label-sm text-muted-foreground">Paso {step}</p>
      <h3 className="text-h3 text-foreground">{title}</h3>
      <p className="text-body text-muted-foreground">{body}</p>
    </li>
  );
}
