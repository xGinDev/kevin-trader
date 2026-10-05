import { Reveal } from "@/components/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq, sectionIds } from "@/content";

export function Faq() {
  return (
    <section id={sectionIds.faq} className="bg-card">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:flex-row lg:items-start lg:gap-20 lg:px-20 lg:py-32">
        <Reveal className="flex flex-col gap-4 lg:w-[400px] lg:shrink-0">
          <h2 className="text-h2 text-foreground">{faq.title}</h2>
          <p className="hidden text-body text-muted-foreground lg:block">{faq.subtitle}</p>
        </Reveal>
        <Accordion type="single" collapsible className="flex-1">
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="max-w-[640px]">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
