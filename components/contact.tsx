import { Calendar, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { contact, links, sectionIds, whatsappHref } from "@/content";

const options = [
  { ...contact.whatsappOption, href: whatsappHref, Icon: MessageCircle },
  { ...contact.bookingOption, href: links.bookingUrl, Icon: Calendar },
];

export function Contact() {
  return (
    <section id={sectionIds.contact}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:flex-row lg:items-start lg:gap-20 lg:px-20 lg:py-32">
        <Reveal className="flex flex-1 flex-col gap-8 lg:gap-6">
          <h2 className="text-display text-foreground">{contact.title}</h2>
          <p className="max-w-[520px] text-body text-muted-foreground lg:text-body-lg">{contact.intro}</p>
          <ul className="flex max-w-[520px] flex-col gap-8 lg:gap-3">
            {options.map(({ title, note, href, Icon }) => (
              <li key={title}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-border py-4 pr-5 pl-4 transition-colors duration-150 outline-none hover:border-input hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-label text-foreground">{title}</span>
                    <span className="text-body-sm text-muted-foreground">{note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="hidden text-body-sm text-muted-foreground lg:block">{contact.formNote}</p>
        </Reveal>

        <div className="w-full lg:w-[560px] lg:shrink-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
