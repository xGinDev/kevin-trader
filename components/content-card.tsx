import Image from "next/image";
import { Play } from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type ContentCardProps = {
  type: "video" | "post";
  title: string;
  meta: string;
  href: string;
  thumbnail: string | null;
};

/** Enlace externo a la red. Hover: la miniatura cambia a accent y el título se subraya; sin zoom de imagen. */
export function ContentCard({ type, title, meta, href, thumbnail }: ContentCardProps) {
  const isVideo = type === "video";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3.5 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card"
    >
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-border bg-muted transition-colors duration-150 group-hover:bg-accent",
          // En el carrusel mobile todas las miniaturas van en 16:9 para que la fila tenga la misma altura.
          isVideo ? "aspect-video" : "aspect-video lg:aspect-square",
        )}
      >
        {thumbnail ? (
          <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 302px, 280px" className="object-cover" />
        ) : (
          <>
            <span className="flex size-11 items-center justify-center rounded-full bg-background">
              {isVideo ? (
                <Play className="size-[18px] text-foreground" aria-hidden />
              ) : (
                <InstagramIcon className="size-[18px] text-foreground" />
              )}
            </span>
            <span className="text-label-sm text-muted-foreground">
              {isVideo ? "Miniatura del video (16:9)" : "Imagen del post (1:1)"}
            </span>
          </>
        )}
      </div>
      <span className="text-label text-foreground underline-offset-4 group-hover:underline">{title}</span>
      <span className="text-body-sm text-muted-foreground">{meta}</span>
    </a>
  );
}
