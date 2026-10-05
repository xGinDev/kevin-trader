import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { StatItem } from "@/components/stat-item";
import { about, images, sectionIds } from "@/content";

export function About() {
  return (
    <section id={sectionIds.about}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-20">
          <Photo
            {...images.working}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="order-last h-60 w-full lg:order-none lg:h-[600px] lg:w-[520px] lg:shrink-0"
          />
          <Reveal className="flex flex-1 flex-col gap-8 lg:gap-6">
            <h2 className="text-h2 text-foreground">{about.title}</h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[600px] text-body text-muted-foreground lg:text-body-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:gap-14">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-6">
            {about.stats.map((stat) => (
              <div key={stat.label} className="border-t border-border pt-6">
                <StatItem value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
          <p className="text-body-sm text-muted-foreground">{about.statsNote}</p>
        </div>
      </div>
    </section>
  );
}
