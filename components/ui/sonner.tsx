"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

// Figma · Toast: popover, borde, Shadow/Overlay, ícono ámbar. Se va solo a los 3 s.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      duration={3000}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-[18px] text-primary" />
        ),
        info: (
          <InfoIcon className="size-[18px]" />
        ),
        warning: (
          <TriangleAlertIcon className="size-[18px]" />
        ),
        error: (
          <OctagonXIcon className="size-[18px] text-destructive" />
        ),
        loading: (
          <Loader2Icon className="size-[18px] animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !w-auto !px-4 !py-3.5 !gap-2.5 !shadow-overlay",
          title: "text-label",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
