"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import { Brand } from "@/components/monogram";
import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ctaLabel, headerNav, links, sectionIds, sheetNav } from "@/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/** Sticky, fondo background/85 con blur. En mobile "Hablemos" queda visible y el resto va en el Sheet. */
export function Header() {
  const active = useActiveSection();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-[6px]">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between pr-3 pl-5 lg:h-[72px] lg:px-20">
        <a
          href={`#${sectionIds.hero}`}
          className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring"
          aria-label="Ir al inicio"
        >
          <Brand />
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          <nav aria-label="Secciones" className="flex items-center gap-7">
            {headerNav.map((item) => (
              <NavLink key={item.id} href={`#${item.id}`} label={item.label} active={active === item.id} />
            ))}
          </nav>
          <Button asChild>
            <a href={`#${sectionIds.contact}`}>{ctaLabel}</a>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild size="sm">
            <a href={`#${sectionIds.contact}`}>{ctaLabel}</a>
          </Button>
          <MobileMenu active={active} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);
  const pendingTarget = useRef<string | null>(null);

  // Al tocar un enlace: se cierra y luego hace scroll, cuando el Sheet ya liberó el bloqueo de scroll.
  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    pendingTarget.current = id;
    setOpen(false);
  }

  function handleCloseAutoFocus(event: Event) {
    const id = pendingTarget.current;
    if (!id) return;
    event.preventDefault();
    pendingTarget.current = null;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    }, 0);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menú">
          <Menu className="size-[22px]" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        onCloseAutoFocus={handleCloseAutoFocus}
        aria-describedby={undefined}
        className="w-[320px] gap-2 border-l border-border bg-card px-6 pt-4 pb-8 data-[side=right]:w-[320px] data-[side=right]:sm:max-w-[320px]"
      >
        <SheetTitle className="sr-only">Menú</SheetTitle>
        <div className="flex justify-end">
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar menú">
              <X className="size-[22px]" />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label="Secciones" className="flex flex-col">
          {sheetNav.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-sm py-3 text-[20px] leading-7 font-semibold tracking-[-0.005em] transition-colors duration-150 outline-none focus-visible:ring-3 focus-visible:ring-ring",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span aria-hidden className={cn("h-5 w-0.5", isActive ? "bg-primary" : "bg-border")} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex-1" />

        <Button asChild className="w-full">
          <a href={`#${sectionIds.contact}`} onClick={(event) => handleNavClick(event, sectionIds.contact)}>
            {ctaLabel}
          </a>
        </Button>
        <SocialIcons className="pt-4" />
      </SheetContent>
    </Sheet>
  );
}

export function SocialIcons({ className }: { className?: string }) {
  const linkClass =
    "rounded-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring";
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <a href={links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={linkClass}>
        <YoutubeIcon className="size-5" />
      </a>
      <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}>
        <InstagramIcon className="size-5" />
      </a>
      <a href={links.tiktok} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "text-label")}>
        TikTok
      </a>
    </div>
  );
}
