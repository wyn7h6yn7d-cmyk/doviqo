"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { hero } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";

const HeroBackground3D = dynamic(
  () =>
    import("@/components/landing/hero-background-3d").then(
      (m) => m.HeroBackground3D,
    ),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-warm)]"
      aria-labelledby="hero-heading"
    >
      {reduce ? (
        <div
          className="pointer-events-none absolute inset-0 -z-[1]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(115%_80%_at_78%_8%,rgb(var(--accent)/0.09),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_65%_at_8%_42%,rgba(199,210,254,0.35),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(75%_50%_at_50%_100%,rgba(148,163,184,0.07),transparent_60%)]" />
        </div>
      ) : (
        <HeroBackground3D />
      )}

      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-r from-[var(--bg-warm)] via-[var(--bg-warm)]/82 to-[var(--bg-warm)]/14 sm:from-[var(--bg-warm)]/94 sm:via-[var(--bg-warm)]/68 sm:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-b from-white/25 via-transparent to-[var(--bg)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(95%_65%_at_50%_-8%,rgb(var(--accent)/0.06),transparent_58%)]"
        aria-hidden
      />

      <div className="noise relative">
        <SectionContainer className="max-w-3xl py-16 sm:py-[4.5rem] lg:py-[5rem]">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--foreground-subtle)]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.hero, ease: EASE_PREMIUM }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="mt-5 max-w-[22ch] text-balance text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.038em] text-[var(--fg)] sm:text-[2.55rem] sm:leading-[1.06] lg:text-[2.75rem]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.hero,
              ease: EASE_PREMIUM,
              delay: 0.05,
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-pretty text-[17px] leading-[1.65] text-[var(--foreground-muted)] sm:text-lg sm:leading-relaxed"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.hero,
              ease: EASE_PREMIUM,
              delay: 0.1,
            }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.hero,
              ease: EASE_PREMIUM,
              delay: 0.12,
            }}
          >
            <Button
              href="/studio"
              className="min-h-12 w-full min-w-[13rem] touch-manipulation sm:w-auto"
              aria-describedby="hero-helper"
            >
              {hero.primaryCta}
            </Button>
            <Button
              href="/#waitlist"
              variant="secondary"
              className="min-h-12 w-full min-w-[13rem] touch-manipulation sm:w-auto"
              aria-describedby="hero-helper"
            >
              {hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.div
            id="hero-helper"
            className="mt-8 max-w-xl space-y-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: DURATION.hero,
              ease: EASE_PREMIUM,
              delay: 0.16,
            }}
          >
            <p className="text-[13px] leading-relaxed text-[var(--foreground-subtle)]">
              {hero.helper}
            </p>
            <div className="rounded-xl border border-white/80 bg-white/85 px-4 py-3.5 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_8px_32px_-8px_rgba(15,23,42,0.05)] backdrop-blur-md">
              <p className="text-[12px] leading-relaxed text-[var(--foreground-muted)]">
                {hero.trustLine}
              </p>
            </div>
          </motion.div>
        </SectionContainer>
      </div>
    </section>
  );
}
