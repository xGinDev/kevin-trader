"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { sectionIds, whatsappHref } from "@/content";
import { duration, ease } from "@/lib/motion";

/** Visible cuando el hero salió del viewport y Contacto todavía no está en pantalla. */
function useWhatsAppVisibility() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(sectionIds.hero);
    const contact = document.getElementById(sectionIds.contact);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === contact) setContactVisible(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (contact) observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return !heroVisible && !contactVisible;
}

/**
 * CUSTOM 3/3 · botón flotante. Aparece con fade + 8 px en 200 ms (sale en 150 ms).
 * Hover: scale 1.04 y Tooltip. Press: 0.94. Glifo provisional (lucide MessageCircle):
 * reemplazar por el SVG oficial de WhatsApp.
 */
export function WhatsAppButton() {
  const visible = useWhatsAppVisibility();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-30 lg:right-6 lg:bottom-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: reduced ? duration.reduced : duration.enter, ease } }}
          exit={{ opacity: 0, y: 8, transition: { duration: duration.exit, ease } }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-overlay outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: duration.press, ease }}
              >
                <MessageCircle className="size-[26px]" aria-hidden />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10} className="hidden lg:block">
              Escríbeme por WhatsApp
            </TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
