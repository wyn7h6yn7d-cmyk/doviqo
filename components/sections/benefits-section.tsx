"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { benefits } from "@/lib/site-content";
import { sectionUi } from "@/lib/ui";
import { SectionContainer } from "@/components/layout/section-container";

export function BenefitsSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={benefits.id}
      className="section-y section-surface-alt relative overflow-hidden border-b border-[var(--border-strong)]"
      aria-labelledby="benefits-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.28]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.14)_0%,transparent_65%)] blur-3xl"
        aria-hidden
      />

      <SectionContainer className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px", amount: 0.15 }}
          transition={{ duration: DURATION.reveal * 0.85, ease: EASE_PREMIUM }}
        >
          <div className="max-w-2xl">
            {benefits.eyebrow ? (
              <p className={sectionUi.eyebrow}>{benefits.eyebrow}</p>
            ) : null}
            <h2
              id="benefits-heading"
              className={`${sectionUi.titleLg} ${benefits.eyebrow ? "mt-3" : ""}`}
            >
              {benefits.title}
            </h2>
            {benefits.lead ? (
              <p className={sectionUi.lead}>{benefits.lead}</p>
            ) : null}
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-x-12 lg:gap-y-10">
            {benefits.items.map((item) => (
              <li
                key={item.title}
                className="glass-panel edge-lit group min-w-0 rounded-2xl p-6 transition duration-300 hover:border-[rgb(var(--accent)/0.28)] hover:shadow-[0_0_44px_-22px_rgb(var(--accent)/0.28)]"
              >
                <div className="mb-3 h-px w-12 bg-gradient-to-r from-[rgb(var(--accent-bright))] to-[rgb(var(--accent-cyan))] opacity-90 transition group-hover:w-16" />
                <h3 className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
