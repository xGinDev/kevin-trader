"use server";

import { Resend } from "resend";

import { experienceLevels, interestOptions } from "@/content";
import { contactSchema, isEmail, type ContactField, type ContactInput } from "@/lib/contact-schema";

export type ContactState =
  | { status: "idle" }
  | { status: "sent"; firstName: string; channel: "email" | "whatsapp" }
  | { status: "invalid"; fieldErrors: Partial<Record<ContactField, string>> }
  | { status: "error" };

/** Envía el formulario por email con Resend. Sin base de datos: nada se guarda. */
export async function sendContact(_prev: ContactState, input: ContactInput): Promise<ContactState> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "invalid", fieldErrors };
  }

  const data = parsed.data;
  const firstName = data.name.split(/\s+/)[0];
  const channel = isEmail(data.contact) ? "email" : "whatsapp";

  // Honeypot lleno: respondemos como si se hubiera enviado.
  if (data.website) return { status: "sent", firstName, channel };

  const level = experienceLevels.find((item) => item.value === data.level)?.label ?? data.level;
  const interest = interestOptions.find((item) => item.value === data.interest)?.label ?? data.interest;
  const text = [
    `Nombre: ${data.name}`,
    `Contacto: ${data.contact}`,
    `Experiencia: ${level}`,
    `Le interesa: ${interest}`,
    "",
    data.message || "(Sin mensaje)",
  ].join("\n");

  // Solo en desarrollo: CONTACT_DRY_RUN=1 imprime el correo en vez de enviarlo.
  if (process.env.NODE_ENV !== "production" && process.env.CONTACT_DRY_RUN === "1") {
    console.info(`[contact] envío simulado\n${text}`);
    return { status: "sent", firstName, channel };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] Faltan RESEND_API_KEY o CONTACT_TO_EMAIL.");
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Formulario web <${process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to,
      replyTo: channel === "email" ? data.contact : undefined,
      subject: `Nuevo contacto: ${data.name} · ${interest}`,
      text,
    });
    if (error) {
      console.error("[contact] Resend devolvió un error:", error);
      return { status: "error" };
    }
  } catch (error) {
    console.error("[contact] No se pudo enviar:", error);
    return { status: "error" };
  }

  return { status: "sent", firstName, channel };
}
