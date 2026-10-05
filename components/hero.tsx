import { Photo } from "@/components/photo";
import { PriceTrace } from "@/components/price-trace";
import { Button } from "@/components/ui/button";
import { ctaLabel, hero, images, sectionIds } from "@/content";

/** El hero no se anima al aparecer: ya está en pantalla. Solo el PriceTrace se dibuja. */
export function Hero() {
  return (
    <section id={sectionIds.hero} className="relative">
      {/* Figma: el trazo sobresale 90 px (desktop) y 60 px (mobile) bajo el hero. */}
      <PriceTrace
        breakpoint="desktop"
        className="absolute -bottom-[90px] left-0 hidden h-[560px] w-full lg:block"
      />
      <PriceTrace breakpoint="mobile" className="absolute -bottom-[60px] left-0 h-[360px] w-full lg:hidden" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pt-6 pb-24 lg:flex-row lg:items-center lg:gap-20 lg:px-20 lg:pt-24 lg:pb-[220px]">
        <div className="flex flex-1 flex-col gap-6 lg:gap-7">
          <p className="text-label text-muted-foreground">{hero.eyebrow}</p>
          <h1 className="max-w-[700px] text-display text-balance text-foreground">{hero.title}</h1>
          <p className="max-w-[600px] text-body text-muted-foreground lg:text-body-lg">
            <span className="lg:hidden">{hero.introMobile}</span>
            <span className="hidden lg:inline">{hero.intro}</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <a href={`#${sectionIds.contact}`}>{ctaLabel}</a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a href={`#${sectionIds.method}`}>{hero.secondaryCta}</a>
            </Button>
          </div>
          <p className="text-body-sm text-muted-foreground">{hero.note}</p>
        </div>

        <Photo
          {...images.portrait}
          sizes="(min-width: 1024px) 440px, 100vw"
          priority
          className="order-first aspect-[7/6] w-full lg:order-none lg:aspect-auto lg:h-[540px] lg:w-[440px] lg:shrink-0"
        />
      </div>
    </section>
  );
}
