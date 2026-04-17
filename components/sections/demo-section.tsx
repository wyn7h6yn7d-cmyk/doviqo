"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { productProof } from "@/lib/site-content";
import { sectionUi } from "@/lib/ui";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";

export function DemoSection() {
  const p = productProof;
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={p.id}
      className="section-y section-surface relative overflow-hidden border-b border-[var(--border-strong)]"
      aria-labelledby="product-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_0%,rgb(var(--accent)/0.11),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.1)_0%,transparent_65%)] blur-3xl"
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
            <h2 id="product-heading" className={sectionUi.titleMd}>
              {p.title}
            </h2>
            <p className={sectionUi.lead}>{p.lead}</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4">
            <div className="glass-panel edge-lit flex min-h-[140px] flex-col rounded-xl p-5 transition duration-300 hover:border-[rgb(var(--accent)/0.28)] hover:shadow-[0_0_48px_-18px_rgb(var(--accent)/0.3)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                {p.inputStep.label}
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                {p.inputStep.body}
              </p>
            </div>

            <div
              className="flex items-center justify-center py-0.5 text-[rgb(var(--accent-cyan)/0.6)] lg:py-0"
              aria-hidden
            >
              <span className="hidden text-lg font-light lg:inline">→</span>
              <span className="text-sm font-light lg:hidden">↓</span>
            </div>

            <div className="relative flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-[rgb(var(--accent)/0.38)] bg-[linear-gradient(145deg,rgb(var(--accent)/0.2)_0%,rgba(14,17,24,0.94)_55%,rgba(8,10,16,0.88)_100%)] p-5 shadow-[0_0_52px_-14px_rgb(var(--accent)/0.32)] backdrop-blur-xl transition duration-300 hover:shadow-[0_0_56px_-12px_rgb(var(--accent)/0.38)]">
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.22)_0%,transparent_70%)] blur-2xl"
                aria-hidden
              />
              <div className="relative flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(124,92,255)] to-[rgb(79,70,229)] text-[11px] font-bold text-white shadow-[0_0_22px_-4px_rgb(124,92,255/0.55)]">
                  D
                </span>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-bright))]">
                  {p.processStep.label}
                </p>
              </div>
              <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                {p.processStep.body}
              </p>
            </div>

            <div
              className="flex items-center justify-center py-0.5 text-[rgb(var(--accent-cyan)/0.6)] lg:py-0"
              aria-hidden
            >
              <span className="hidden text-lg font-light lg:inline">→</span>
              <span className="text-sm font-light lg:hidden">↓</span>
            </div>

            <div className="glass-panel edge-lit flex min-h-[140px] flex-col rounded-xl p-5 transition duration-300 hover:border-[rgb(var(--accent-cyan)/0.3)] hover:shadow-[0_0_48px_-18px_rgb(var(--accent-cyan)/0.28)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                {p.outputStep.label}
              </p>
              <ul className="mt-3 space-y-2 text-[14px] leading-snug text-[var(--fg)]">
                {p.outputStep.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent-cyan))] shadow-[0_0_10px_rgb(var(--accent-cyan)/0.55)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button
              href="/studio"
              className="min-h-12 touch-manipulation"
              aria-describedby="product-cta-hint"
            >
              {p.cta}
            </Button>
            <p
              id="product-cta-hint"
              className="text-[13px] text-[var(--foreground-subtle)]"
            >
              {p.ctaHint}
            </p>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
