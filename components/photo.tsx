import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string | null;
  alt: string;
  placeholderTitle: string;
  placeholderNote: string;
  placeholderNoteMobile?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Foto real si `src` existe; si no, el recuadro provisional de Figma. */
export function Photo({
  src,
  alt,
  placeholderTitle,
  placeholderNote,
  placeholderNoteMobile,
  sizes,
  priority,
  className,
}: PhotoProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl bg-muted", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-dashed border-border bg-muted px-6 text-center lg:px-8",
        className,
      )}
    >
      <ImageIcon className="size-6 text-muted-foreground" aria-hidden />
      <p className="text-label text-foreground">{placeholderTitle}</p>
      <p className={cn("max-w-[360px] text-body-sm text-muted-foreground", placeholderNoteMobile && "hidden lg:block")}>
        {placeholderNote}
      </p>
      {placeholderNoteMobile && (
        <p className="max-w-[302px] text-body-sm text-muted-foreground lg:hidden">{placeholderNoteMobile}</p>
      )}
    </div>
  );
}
