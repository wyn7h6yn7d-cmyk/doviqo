"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Glow } from "@/components/ui/glow";
import { GridBackground } from "@/components/ui/grid-background";
import { HeroHeadline } from "@/components/hero/hero-headline";
import { HeroCta } from "@/components/hero/hero-cta";
import { HeroPreviewWithEnter } from "@/components/hero/hero-preview";

const HeroBackground = dynamic(
  () =>
    import("@/components/hero/hero-background").then((mod) => ({
      default: mod.HeroBackground,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 bg-background"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 70% at 50% -15%, rgba(95, 110, 150, 0.07), transparent 58%),
            radial-gradient(ellipse 80% 55% at 85% 25%, rgba(70, 110, 120, 0.05), transparent 55%)
          `,
        }}
      />
    ),
  },
);

export function HeroSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-sheen opacity-[0.85]" />
        <HeroBackground />
        <Glow />
        {/* Readability: darken base + gentle vignette; keeps copy crisp without muddy gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/[0.52] to-black/[0.88]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <GridBackground className="opacity-[0.04]" />
      </div>

      <SectionContainer className="noise relative pt-14 sm:pt-16 lg:min-h-[min(100vh-3.5rem,880px)] lg:pt-20">
        <div className="grid items-center gap-12 pb-14 pt-8 sm:gap-14 sm:pb-16 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16 lg:pb-20 lg:pt-12">
          <div className="flex flex-col justify-center lg:max-w-none lg:pr-4 xl:pr-8">
            <HeroHeadline />
            <HeroCta />
          </div>

          <Reveal className="relative flex items-center justify-center lg:min-h-[min(560px,58vh)]">
            <HeroPreviewWithEnter reduce={reduce} />
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
