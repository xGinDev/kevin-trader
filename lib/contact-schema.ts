import { z } from "zod";

import { experienceLevels, interestOptions } from "@/content";

// El mismo esquema valida en el cliente (onBlur) y en la Server Action.
// Cada error dice qué pasó y cómo corregirlo.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function contactError(value: string): string | null {
  if (value.includes("@")) {
    const domain = value.split("@")[1] ?? "";
    if (domain === "") return "Revisa el email: falta lo que va después de la @ (por ejemplo, correo.com).";
    if (!domain.includes(".")) return "Revisa el email: le falta el dominio (por ejemplo, .com).";
    if (!EMAIL.test(value)) return "Revisa el email: debe tener la forma nombre@correo.com.";
    return null;
  }
  if (/[a-z]/i.test(value)) return "Escribe un email (nombre@correo.com) o un número de WhatsApp.";
  const digits = value.replace(/[\s()+.-]/g, "");
  if (!/^\d{7,15}$/.test(digits)) {
    return "Revisa el número: escríbelo con el indicativo del país, por ejemplo +57 300 000 0000.";
  }
  return null;
}

export function isEmail(value: string) {
  return value.includes("@");
}

const levelValues = experienceLevels.map((level) => level.value) as [string, ...string[]];
const interestValues = interestOptions.map((option) => option.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre para saber cómo llamarte.")
    .max(80, "Usa un nombre más corto (máximo 80 caracteres)."),
  contact: z
    .string()
    .trim()
    .min(1, "Déjame un email o un WhatsApp para poder responderte.")
    .superRefine((value, ctx) => {
      const message = contactError(value);
      if (message) ctx.addIssue({ code: "custom", message });
    }),
  level: z.enum(levelValues, { error: "Elige la opción que más se parece a tu situación." }),
  interest: z.enum(interestValues, { error: "Elige qué te interesa para preparar la llamada." }),
  message: z.string().trim().max(2000, "Resume un poco el mensaje (máximo 2.000 caracteres)."),
  /** Honeypot: los humanos no lo ven ni lo llenan. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = keyof ContactInput;
