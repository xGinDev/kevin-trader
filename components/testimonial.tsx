import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

type TestimonialProps = {
  quote: string;
  name: string;
  context: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .replace(/[^\p{L}]/gu, "")
    .slice(0, 2)
    .toUpperCase();
}

/** Habla del proceso, nunca de ganancias. Solo con consentimiento escrito; nombre e inicial del apellido. */
export function Testimonial({ quote, name, context }: TestimonialProps) {
  return (
    <Card className="h-full p-7">
      <figure className="flex h-full flex-col justify-between gap-6">
        <blockquote className="text-body-lg text-foreground">{quote}</blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar className="size-10 after:hidden">
            <AvatarFallback className="bg-muted text-label-sm text-muted-foreground">{initials(name)}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col gap-0.5">
            <span className="text-label text-foreground">{name}</span>
            <span className="text-body-sm text-muted-foreground">{context}</span>
          </span>
        </figcaption>
      </figure>
    </Card>
  );
}
