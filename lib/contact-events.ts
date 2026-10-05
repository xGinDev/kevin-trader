import type { InterestValue } from "@/content";

/** ServiceCard → ContactForm: preselecciona "¿Qué te interesa?" al ir a #contacto. */
export const PRESELECT_INTEREST_EVENT = "contact:preselect-interest";

export function preselectInterest(interest: InterestValue) {
  window.dispatchEvent(new CustomEvent<InterestValue>(PRESELECT_INTEREST_EVENT, { detail: interest }));
}
