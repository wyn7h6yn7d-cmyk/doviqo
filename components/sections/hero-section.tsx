"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { hero } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { HeroPreview } from "@/components/landing/hero-preview";

export function HeroSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-sheen opacity-[0.85]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_-15%,rgb(var(--accent)/0.11),transparent_58%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
      </div>

      <div className="noise relative">
        <SectionContainer className="py-16 sm:py-20 lg:py-[5.25rem]">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:items-center">
            <div className="max-w-xl lg:max-w-[36rem]">
              <motion.p
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.hero, ease: EASE_PREMIUM }}
              >
                {hero.eyebrow}
              </motion.p>

              <motion.h1
                id="hero-heading"
                className="mt-5 text-balance text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-5xl sm:leading-[1.06] lg:text-[3rem]"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.04,
                }}
              >
                {hero.headline}
              </motion.h1>

              <motion.p
                className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-white/65 sm:text-lg"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.08,
                }}
              >
                {hero.subheadline}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.12,
                }}
              >
                <Button href="#waitlist" className="w-full min-w-[13rem] sm:w-auto">
                  {hero.primaryCta}
                </Button>
                <Button
                  href="#product"
                  variant="secondary"
                  className="w-full min-w-[13rem] sm:w-auto"
                >
                  {hero.secondaryCta}
                </Button>
              </motion.div>

              <motion.p
                className="mt-6 max-w-lg text-[13px] leading-relaxed text-white/45"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.16,
                }}
              >
                {hero.helper}
              </motion.p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroPreview />
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}
