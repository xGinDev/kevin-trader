"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  /** Para grupos (RadioGroup) el título no es un <label for>. */
  asGroup?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function helperId(id: string) {
  return `${id}-helper`;
}

export function labelId(id: string) {
  return `${id}-label`;
}

/**
 * Figma · FormField: label, control y ayuda. El error reemplaza la ayuda,
 * dice qué pasó y cómo corregirlo, y aparece con altura animada (180 ms).
 */
export function FormField({ id, label, helper, error, asGroup, className, children }: FormFieldProps) {
  const reduced = useReducedMotion();
  const message = error ?? helper;
  const transition = { duration: reduced ? 0 : duration.error, ease };

  return (
    <Field className={cn("gap-2", className)} aria-labelledby={asGroup ? labelId(id) : undefined}>
      {asGroup ? (
        <p id={labelId(id)} className="text-label text-foreground">
          {label}
        </p>
      ) : (
        <FieldLabel htmlFor={id} className="text-label text-foreground">
          {label}
        </FieldLabel>
      )}
      {children}
      <AnimatePresence initial={false} mode="popLayout">
        {message && (
          <motion.div
            key={error ? "error" : "helper"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden"
          >
            {error ? (
              <FieldError id={helperId(id)} className="text-body-sm">
                {error}
              </FieldError>
            ) : (
              <FieldDescription id={helperId(id)} className="text-body-sm">
                {helper}
              </FieldDescription>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Field>
  );
}
