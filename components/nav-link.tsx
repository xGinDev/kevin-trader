"use client";

import { motion } from "motion/react";

import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

/** Enlace del header. El indicador ámbar se desliza entre enlaces con layoutId (200 ms). */
export function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative flex flex-col items-start gap-1.5 rounded-sm px-1 py-2 text-label transition-colors duration-150 outline-none focus-visible:ring-3 focus-visible:ring-ring",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <span className="relative h-0.5 w-5">
        {active && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute inset-0 bg-primary"
            transition={{ duration: duration.enter, ease }}
          />
        )}
      </span>
    </a>
  );
}
