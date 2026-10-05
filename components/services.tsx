import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { sectionIds, services } from "@/content";

export function Services() {
  return (
    <section id={sectionIds.services}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <SectionHeading
          title={services.title}
          subtitle={services.subtitle}
          subtitleMobile={services.subtitleMobile}
        />
        <RevealGroup className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {services.items.map((service, index) => (
            <RevealItem key={service.title} index={index}>
              <ServiceCard {...service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
