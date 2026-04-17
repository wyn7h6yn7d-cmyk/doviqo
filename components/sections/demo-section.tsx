"use client";

import { demo, nav } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

export function DemoSection() {
  return (
    <section
      id={demo.id}
      className="section-y relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
      aria-labelledby="product-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 mesh-grid opacity-[0.65]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[var(--bg)]"
        aria-hidden
      />

      <SectionContainer className="relative">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {demo.proofCaption}
          </p>
          <h2
            id="product-heading"
            className="mt-3 max-w-2xl text-balance text-[1.65rem] font-semibold tracking-[-0.035em] text-[var(--fg)] sm:text-[1.85rem] lg:text-[2rem]"
          >
            {demo.title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-[1.65] text-[var(--foreground-muted)] sm:text-[17px] sm:leading-relaxed">
            {demo.description}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="mt-12 overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-white shadow-glow-accent"
            role="region"
            aria-label="Näidis: märkmed ja struktureeritud tulemus"
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_88%,white)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-[var(--border)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                  {demo.input.label}
                </p>
                <p className="mt-2.5 text-[15px] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                  {demo.input.meetingTitle}
                </p>
                <p className="mt-1 text-[12px] text-[var(--foreground-subtle)]">
                  Osalejad: {demo.input.participants}
                </p>
                <ul className="mt-6 space-y-2.5 font-mono text-[12px] leading-relaxed text-[var(--foreground-muted)] sm:text-[13px]">
                  {demo.input.bullets.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                  {demo.output.label}
                </p>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                  {demo.output.actionsTitle}
                </p>
                <ul className="mt-2.5 space-y-2 text-[13px] leading-snug text-[var(--fg)]">
                  {demo.output.actions.map((a) => (
                    <li key={a}>· {a}</li>
                  ))}
                </ul>
                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
                  {demo.output.followTitle}
                </p>
                <pre className="mt-2 max-h-[min(280px,50vh)] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-words rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_40%,white)] px-3 py-2.5 font-mono text-[11px] leading-relaxed text-[var(--foreground-muted)] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] sm:text-[12px]">
                  {demo.output.followBody}
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--surface-muted))] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
              <p className="text-[13px] leading-snug text-[var(--foreground-muted)]">
                {demo.footerHint}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/studio" className="min-h-12 touch-manipulation">
                  {demo.studioCta}
                </Button>
                <Button
                  href="/#waitlist"
                  variant="secondary"
                  className="min-h-12 touch-manipulation"
                >
                  {nav.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
