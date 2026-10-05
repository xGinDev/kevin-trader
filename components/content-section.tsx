import { ContentCard } from "@/components/content-card";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import { MobileCarousel } from "@/components/mobile-carousel";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { content, links, sectionIds } from "@/content";

const socialLinks = [
  { label: "YouTube", href: links.youtube, Icon: YoutubeIcon },
  { label: "Instagram", href: links.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: links.tiktok, Icon: null },
];

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 rounded-sm text-label text-foreground transition-colors duration-150 outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring lg:h-auto"
          >
            {Icon && <Icon className="size-[18px]" />}
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Sección "Contenido" (nombre de Figma: Content). */
export function ContentSection() {
  return (
    <section id={sectionIds.content} className="bg-card">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 py-[72px] lg:gap-14 lg:px-20 lg:py-32">
        <div className="flex items-end justify-between gap-8">
          <SectionHeading
            title={content.title}
            subtitle={content.subtitle}
            subtitleMobile={content.subtitleMobile}
            className="max-w-[560px]"
          />
          <SocialLinks className="hidden items-center gap-5 lg:flex" />
        </div>

        <RevealGroup className="hidden items-start gap-6 lg:grid lg:grid-cols-4">
          {content.items.map((item, index) => (
            <RevealItem key={item.title} index={index}>
              <ContentCard {...item} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="lg:hidden">
          <MobileCarousel label={content.title} itemLabel="Publicación" itemClassName="basis-[292px]">
            {content.items.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </MobileCarousel>
        </div>

        <SocialLinks className="flex items-center gap-5 lg:hidden" />
      </div>
    </section>
  );
}
