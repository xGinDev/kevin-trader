"use client";

import { useEffect, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type MobileCarouselProps = {
  label: string;
  itemLabel: string;
  itemClassName: string;
  showDots?: boolean;
  children: React.ReactNode[];
};

/** Carousel de shadcn para mobile: tarjetas que asoman por la derecha y puntos de posición. */
export function MobileCarousel({ label, itemLabel, itemClassName, showDots = false, children }: MobileCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-8">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        aria-label={label}
        className="-mr-5"
      >
        <CarouselContent className="-ml-3 pr-5">
          {children.map((child, index) => (
            <CarouselItem
              key={index}
              aria-label={`${itemLabel} ${index + 1} de ${children.length}`}
              className={cn("pl-3", itemClassName)}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {showDots && (
        <div className="-my-2 flex items-center gap-0">
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Ir a ${itemLabel.toLowerCase()} ${index + 1}`}
              aria-current={selected === index ? "true" : undefined}
              className="group flex h-6 items-center rounded-full px-[3px] outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-200 ease-brand",
                  selected === index ? "w-4 bg-foreground" : "w-1.5 bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
