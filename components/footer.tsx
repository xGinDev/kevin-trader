import { SocialIcons } from "@/components/header";
import { Brand } from "@/components/monogram";
import { RiskDisclaimer } from "@/components/risk-disclaimer";
import { disclaimer, footerNav, site } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pt-12 pb-10 lg:gap-10 lg:px-20 lg:pt-16 lg:pb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Brand />
          <nav aria-label="Secciones" className="hidden lg:block">
            <ul className="flex gap-6">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="rounded-sm text-label text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <SocialIcons className="gap-4" />
        </div>
        <RiskDisclaimer variant="full" />
        <p className="text-body-sm text-muted-foreground">
          © {site.copyrightYear} {site.name}. {disclaimer.copyrightNote}
        </p>
      </div>
    </footer>
  );
}
