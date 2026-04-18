"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { hero } from "@/lib/site-content";
import { HeroProductPreview } from "@/components/landing/hero-product-preview";
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
      className="relative overflow-hidden border-b border-[var(--border-strong)] bg-[var(--bg-deep)]"
      aria-labelledby="hero-heading"
    >
      <div className="ambient-orbs" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-[1] mesh-grid opacity-[0.4]" aria-hidden />

      {reduce ? (
        <div
          className="pointer-events-none absolute inset-0 -z-[1]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(115%_80%_at_78%_8%,rgb(var(--accent)/0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_65%_at_8%_42%,rgb(var(--accent-cyan)/0.12),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(75%_50%_at_50%_100%,rgba(15,23,42,0.35),transparent_60%)]" />
        </div>
      ) : (
        <HeroBackground3D />
      )}

      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-r from-[var(--bg-deep)] via-[color-mix(in_srgb,var(--bg-deep)_58%,transparent)] to-[color-mix(in_srgb,var(--bg-deep)_22%,transparent)] sm:from-[var(--bg-deep)] sm:via-[color-mix(in_srgb,var(--bg-deep)_46%,transparent)] sm:to-[color-mix(in_srgb,var(--bg-deep)_8%,transparent)] lg:via-[color-mix(in_srgb,var(--bg-deep)_34%,transparent)] lg:to-[color-mix(in_srgb,var(--bg-deep)_5%,transparent)] xl:to-[color-mix(in_srgb,var(--bg-deep)_3%,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-b from-[rgb(var(--accent)/0.06)] via-transparent to-[var(--bg)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(95%_65%_at_50%_-8%,rgb(var(--accent-cyan)/0.08),transparent_58%)]"
        aria-hidden
      />

      <div className="noise relative">
        <SectionContainer className="py-14 sm:py-[4.25rem] lg:py-[5rem]">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)] xl:gap-16">
            <div className="min-w-0 max-w-xl lg:max-w-none">
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gradient-accent"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.hero, ease: EASE_PREMIUM }}
              >
                {hero.eyebrow}
              </motion.p>

              <motion.h1
                id="hero-heading"
                className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.038em] text-[var(--fg)] sm:text-[2.45rem] sm:leading-[1.05] lg:text-[2.65rem]"
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
                className="mt-5 text-pretty text-[17px] leading-[1.6] text-[var(--foreground-muted)] sm:text-lg sm:leading-relaxed"
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

              <motion.p
                className="mt-4 text-pretty text-[14px] leading-[1.5] text-[var(--foreground-muted)] sm:text-[15px]"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.11,
                }}
              >
                {hero.clarification}
              </motion.p>

              <motion.div
                className="mt-6 rounded-xl border border-[rgb(var(--accent)/0.28)] bg-[linear-gradient(135deg,rgb(var(--accent)/0.12)_0%,color-mix(in_srgb,var(--surface)_55%,transparent)_100%)] px-4 py-3 shadow-[0_0_40px_-20px_rgb(var(--accent)/0.35)] sm:px-5 sm:py-3.5"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.hero,
                  ease: EASE_PREMIUM,
                  delay: 0.115,
                }}
                role="note"
              >
                <p className="text-[13px] font-medium leading-snug text-[var(--fg)] sm:text-[14px]">
                  {hero.demoCallout}
                </p>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
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
                  className="min-h-[3.15rem] w-full min-w-[14rem] touch-manipulation px-8 text-[15px] font-semibold shadow-[0_0_0_1px_rgb(var(--accent-cyan)/0.18)_inset,0_1px_0_rgba(255,255,255,0.1)_inset,0_18px_56px_-12px_rgb(124,92,255/0.55)] sm:w-auto"
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
                className="mt-7 max-w-md"
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
              </motion.div>
            </div>

            <motion.div
              className="min-w-0 lg:justify-self-end lg:w-full"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.hero,
                ease: EASE_PREMIUM,
                delay: 0.08,
              }}
            >
              <HeroProductPreview className="w-full max-w-[460px] lg:ml-auto" />
            </motion.div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}
