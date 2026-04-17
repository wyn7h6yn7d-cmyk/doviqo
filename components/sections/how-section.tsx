"use client";

import { how } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

function StepIcon({ kind }: { kind: 0 | 1 | 2 }) {
  const c = "h-5 w-5 text-accent";
  if (kind === 0)
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 6h12M8 12h12M8 18h8M4 6h.01M4 12h.01M4 18h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === 1)
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 7h12M8 12h8M8 17h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="5" cy="7" r="1.5" fill="currentColor" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="5" cy="17" r="1.5" fill="currentColor" />
      </svg>
    );
  return (
    <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HowSection() {
  return (
    <section id={how.id} className="section-y" aria-labelledby="how-heading">
      <SectionContainer>
        <Reveal>
          <h2
            id="how-heading"
            className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {how.title}
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <li className="group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-[border-color,background-color] duration-300 hover:border-white/[0.12] hover:bg-white/[0.035]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(320px_140px_at_20%_0%,rgb(var(--accent)/0.07),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/35"
                    aria-hidden
                  >
                    <StepIcon kind={i as 0 | 1 | 2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-medium tabular-nums tracking-[0.14em] text-white/35">
                      {s.n}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-white/90">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <p className="relative mt-3 text-[13px] leading-relaxed text-white/52">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}
