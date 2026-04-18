import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { DemoSection } from "@/components/sections/demo-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { WaitlistSection } from "@/components/sections/waitlist-section";

export default function Home() {
  return (
    <div className="bg-page-studio min-h-screen text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <DemoSection />
        <BenefitsSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
