import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ContentSection } from "@/components/content-section";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowWeStart } from "@/components/how-we-start";
import { Method } from "@/components/method";
import { RiskCalculatorSection } from "@/components/risk-calculator-section";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Method />
        <Services />
        <HowWeStart />
        <Testimonials />
        <ContentSection />
        <RiskCalculatorSection />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
