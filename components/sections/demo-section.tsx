"use client";

import { demo } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

export function DemoSection() {
  return (
    <section
      id={demo.id}
      className="section-y border-b border-white/[0.05] bg-black/[0.2]"
      aria-labelledby="product-heading"
    >
      <SectionContainer>
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
            {demo.eyebrow}
          </p>
          <h2
            id="product-heading"
            className="mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {demo.title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/55 sm:text-base">
            {demo.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-4">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/42">
                Sisend
              </p>
              <p className="mt-3 text-sm font-medium text-white/88">
                {demo.input.meetingTitle}
              </p>
              <p className="mt-1 text-[12px] text-white/45">
                Osalejad: {demo.input.participants}
              </p>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
                {demo.input.label}
              </p>
              <ul className="mt-2 space-y-2 font-mono text-[12px] leading-relaxed text-white/58 sm:text-[13px]">
                {demo.input.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col justify-center rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-8 text-center lg:min-w-[200px] lg:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                {demo.transform.label}
              </p>
              <p className="mt-3 text-sm font-medium leading-snug text-white/90">
                {demo.transform.title}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                {demo.transform.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-soft-md sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/42">
                {demo.output.label}
              </p>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
                {demo.output.actionsTitle}
              </p>
              <ul className="mt-2 space-y-2 text-[13px] leading-snug text-white/[0.84]">
                {demo.output.actions.map((a) => (
                  <li key={a}>· {a}</li>
                ))}
              </ul>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
                {demo.output.followTitle}
              </p>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/65 sm:text-[12px]">
                {demo.output.followBody}
              </pre>
            </div>
          </Reveal>
        </div>

      </SectionContainer>
    </section>
  );
}
