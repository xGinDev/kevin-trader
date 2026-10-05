import { MobileCarousel } from "@/components/mobile-carousel";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Testimonial } from "@/components/testimonial";
import { sectionIds, testimonials } from "@/content";

export function Testimonials() {
  return (
    <section id={sectionIds.testimonials}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <SectionHeading
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          subtitleMobile={testimonials.subtitleMobile}
        />

        <RevealGroup className="hidden gap-6 lg:grid lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <RevealItem key={item.name} index={index}>
              <Testimonial {...item} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="lg:hidden">
          <MobileCarousel label={testimonials.title} itemLabel="Testimonio" itemClassName="basis-[322px]" showDots>
            {testimonials.items.map((item) => (
              <Testimonial key={item.name} {...item} />
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
