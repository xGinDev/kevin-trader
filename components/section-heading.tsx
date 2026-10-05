import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  /** Versión corta del subtítulo para mobile. Sin ella, mobile usa `subtitle`. */
  subtitleMobile?: string | null;
  className?: string;
};

export function SectionHeading({ title, subtitle, subtitleMobile, className }: SectionHeadingProps) {
  const hasMobileVariant = subtitleMobile !== undefined;
  return (
    <Reveal className={cn("flex max-w-[640px] flex-col gap-3 lg:gap-4", className)}>
      <h2 className="text-h2 text-foreground">{title}</h2>
      {subtitle && (
        <p className={cn("text-body text-muted-foreground lg:text-body-lg", hasMobileVariant && "hidden lg:block")}>
          {subtitle}
        </p>
      )}
      {hasMobileVariant && subtitleMobile && (
        <p className="text-body text-muted-foreground lg:hidden">{subtitleMobile}</p>
      )}
    </Reveal>
  );
}
