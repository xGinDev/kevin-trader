import { Reveal } from "@/components/reveal";
import { RiskCalculator } from "@/components/risk-calculator";
import { SectionHeading } from "@/components/section-heading";
import { calculator, sectionIds } from "@/content";

export function RiskCalculatorSection() {
  return (
    <section id={sectionIds.calculator}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <SectionHeading
          title={calculator.sectionTitle}
          subtitle={calculator.sectionSubtitle}
          subtitleMobile={calculator.sectionSubtitleMobile}
        />
        <Reveal>
          <RiskCalculator />
        </Reveal>
      </div>
    </section>
  );
}
