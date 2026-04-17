"use client";

import { howItWorks } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

export function HowItWorksSection() {
  return (
    <section
      id={howItWorks.id}
      className="section-y border-b border-[var(--border)] bg-white"
      aria-labelledby="how-heading"
    >
      <SectionContainer>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {howItWorks.eyebrow}
          </p>
          <h2
            id="how-heading"
            className="mt-3 max-w-2xl text-balance text-[1.65rem] font-semibold tracking-[-0.035em] text-[var(--fg)] sm:text-[1.85rem] lg:text-[2rem]"
          >
            {howItWorks.title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-[1.65] text-[var(--foreground-muted)] sm:text-[17px]">
            {howItWorks.lead}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={0.05 * (i + 1)}>
              <li className="relative flex flex-col rounded-[1.05rem] border border-[var(--border)] bg-white p-6 shadow-soft-sm">
                <span
                  className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--fg)] text-[13px] font-semibold text-white shadow-float"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[var(--fg)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}
