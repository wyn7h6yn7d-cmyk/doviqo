"use client";

import { benefits } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

export function BenefitsSection() {
  return (
    <section
      id={benefits.id}
      className="section-y relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
      aria-labelledby="benefits-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_20%_0%,rgb(var(--accent)/0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-[var(--bg)]"
        aria-hidden
      />

      <SectionContainer className="relative">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {benefits.eyebrow}
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 max-w-3xl text-balance text-[1.65rem] font-semibold tracking-[-0.035em] text-[var(--fg)] sm:text-[1.85rem] lg:text-[2rem]"
          >
            {benefits.title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-[1.65] text-[var(--foreground-muted)] sm:text-[17px]">
            {benefits.lead}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * (i + 1)}>
              <li className="h-full rounded-[1.1rem] border border-[var(--border)] bg-white p-6 shadow-float backdrop-blur-sm sm:p-7">
                <div
                  className="mb-4 h-px w-10 rounded-full bg-gradient-to-r from-indigo-500/80 to-indigo-300/40"
                  aria-hidden
                />
                <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
