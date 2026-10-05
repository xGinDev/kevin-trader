import { MethodStep } from "@/components/method-step";
import { SectionHeading } from "@/components/section-heading";
import { method, sectionIds } from "@/content";

export function Method() {
  return (
    <section id={sectionIds.method} className="bg-card">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <SectionHeading title={method.title} subtitle={method.subtitle} subtitleMobile={method.subtitleMobile} />
        <ol className="grid gap-8 lg:grid-cols-4">
          {method.steps.map((step, index) => (
            <MethodStep key={step.title} step={index + 1} title={step.title} body={step.body} />
          ))}
        </ol>
      </div>
    </section>
  );
}
