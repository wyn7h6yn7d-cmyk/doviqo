import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProductPreview } from "@/components/landing/product-preview";
import { WhyDoviqo } from "@/components/landing/why-doviqo";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <HowItWorks />
        <ProductPreview />
        <WhyDoviqo />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
