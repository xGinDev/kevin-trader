import { MethodStep } from "@/components/method-step";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { ctaLabel, howWeStart, links, sectionIds } from "@/content";

export function HowWeStart() {
  return (
    <section id={sectionIds.howWeStart} className="bg-card">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <SectionHeading title={howWeStart.title} subtitle={howWeStart.subtitle} subtitleMobile={null} />
        <ol className="grid gap-8 lg:grid-cols-3">
          {howWeStart.steps.map((step, index) => (
            <MethodStep key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </ol>
        <div className="flex flex-col gap-3 lg:flex-row">
          <Button asChild className="w-full lg:w-auto">
            <a href={`#${sectionIds.contact}`}>{ctaLabel}</a>
          </Button>
          <Button asChild variant="ghost" className="hidden lg:inline-flex">
            <a href={links.bookingUrl} target="_blank" rel="noopener noreferrer">
              {howWeStart.bookingCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
