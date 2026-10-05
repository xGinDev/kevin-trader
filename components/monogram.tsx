import { site } from "@/content";

/** Placeholder de marca: iniciales en marco cuadrado con una marca de nivel ámbar. */
export function Monogram() {
  return (
    <span
      aria-hidden
      className="relative flex size-10 shrink-0 items-center justify-center rounded-md border-[1.5px] border-foreground text-[15px] font-semibold tracking-[0.02em] text-foreground"
    >
      {site.initials}
      <span className="absolute top-[28.5px] left-[4.5px] h-0.5 w-3.5 bg-primary" />
    </span>
  );
}

export function Brand() {
  return (
    <span className="flex items-center gap-3">
      <Monogram />
      <span className="text-label text-foreground">{site.name}</span>
    </span>
  );
}
