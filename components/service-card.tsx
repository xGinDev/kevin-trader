"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sectionIds, services, type InterestValue } from "@/content";
import { preselectInterest } from "@/lib/contact-events";

type ServiceCardProps = {
  title: string;
  forWho: string;
  includes: readonly string[];
  format: string;
  duration: string;
  price: string;
  cta: string;
  interest: InterestValue;
};

/** Hover: borde input + sombra y translateY −2 px (200 ms). El CTA lleva a #contacto con el servicio preseleccionado. */
export function ServiceCard({ title, forWho, includes, format, duration, price, cta, interest }: ServiceCardProps) {
  const meta = [
    { label: services.metaLabels.format, value: format },
    { label: services.metaLabels.duration, value: duration },
    { label: services.metaLabels.price, value: price },
  ];

  return (
    <Card className="h-full gap-5 p-7 transition-[translate,border-color,box-shadow] duration-200 ease-brand hover:-translate-y-0.5 hover:border-input hover:shadow-card has-focus-visible:border-input motion-reduce:hover:translate-y-0">
      <CardHeader className="gap-2 px-0">
        <CardTitle className="text-h3 text-foreground">
          <h3>{title}</h3>
        </CardTitle>
        <CardDescription className="text-body-sm">{forWho}</CardDescription>
      </CardHeader>

      <ul className="flex flex-col gap-2.5">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-body-sm text-foreground">
            <Check className="mt-px size-[18px] shrink-0 text-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <Separator />

      <dl className="flex flex-wrap gap-x-5 gap-y-3">
        {meta.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-label-sm text-muted-foreground">{item.label}</dt>
            <dd className="text-label text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>

      <Button asChild variant="outline" className="mt-auto w-full">
        <a href={`#${sectionIds.contact}`} onClick={() => preselectInterest(interest)}>
          {cta}
        </a>
      </Button>
    </Card>
  );
}
