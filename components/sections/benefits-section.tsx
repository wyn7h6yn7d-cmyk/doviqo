"use client";

import { benefits } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

export function BenefitsSection() {
  return (
    <section
      id={benefits.id}
      className="section-y border-t border-white/[0.05] bg-black/[0.12]"
      aria-labelledby="why-heading"
    >
      <SectionContainer>
        <Reveal>
          <h2
            id="why-heading"
            className="max-w-2xl text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {benefits.title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/55 sm:text-base">
            {benefits.intro}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:gap-4">
          {benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <li className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-sm font-medium text-white/88">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/52">
                  {item.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
