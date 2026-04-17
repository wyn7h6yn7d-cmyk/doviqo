import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ProductPreviewSection } from "@/components/sections/product-preview-section";
import { WhyDoviqoSection } from "@/components/sections/why-doviqo-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <WhyDoviqoSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
