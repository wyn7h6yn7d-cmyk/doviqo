"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { howItWorks } from "@/lib/site-content";
import { sectionUi } from "@/lib/ui";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";

export function HowItWorksSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={howItWorks.id}
      className="section-y relative overflow-hidden border-b border-[var(--border-strong)] bg-[var(--bg)]"
      aria-labelledby="how-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_30%,rgb(var(--accent)/0.08),transparent_55%)]"
        aria-hidden
      />

      <SectionContainer className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px", amount: 0.2 }}
          transition={{ duration: DURATION.reveal * 0.85, ease: EASE_PREMIUM }}
        >
          <div className="max-w-2xl">
            {howItWorks.eyebrow ? (
              <p className={sectionUi.eyebrow}>{howItWorks.eyebrow}</p>
            ) : null}
            <h2
              id="how-heading"
              className={`${sectionUi.titleLg} ${howItWorks.eyebrow ? "mt-3" : ""}`}
            >
              {howItWorks.title}
            </h2>
            {howItWorks.lead ? (
              <p className={sectionUi.lead}>{howItWorks.lead}</p>
            ) : null}
          </div>

          <div className="relative mt-10 max-w-3xl">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.4)] to-transparent"
              aria-hidden
            />
            <ol className="divide-y divide-[var(--border-strong)] rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-raised)_72%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
              {howItWorks.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-5 px-4 py-6 sm:gap-8 sm:px-6 sm:py-7"
                >
                  <span
                    className="w-8 shrink-0 pt-0.5 text-right text-[13px] font-semibold tabular-nums text-[rgb(var(--accent-cyan))]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p
              className="max-w-xl text-[14px] leading-relaxed text-[var(--foreground-muted)]"
              id="how-studio-hint"
            >
              {howItWorks.studioCtaHint}
            </p>
            <Button
              href="/studio"
              className="min-h-12 w-full shrink-0 px-7 text-[15px] font-semibold shadow-[0_0_40px_-14px_rgb(124,92,255/0.45)] sm:w-auto"
              aria-describedby="how-studio-hint"
            >
              {howItWorks.studioCta}
            </Button>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
