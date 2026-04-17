"use client";

import { waitlist as copy } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function WaitlistSection() {
  return (
    <section
      id={copy.id}
      className="section-y relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]"
      aria-labelledby="waitlist-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_0%,rgb(var(--accent)/0.11),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_96%,rgb(var(--accent)))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent"
        aria-hidden
      />

      <SectionContainer className="relative">
        <div className="mx-auto max-w-lg">
          <h2
            id="waitlist-heading"
            className="text-balance text-center text-[1.65rem] font-semibold tracking-[-0.035em] text-[var(--fg)] sm:text-[1.85rem]"
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-center text-[15px] leading-relaxed text-[var(--foreground-muted)] sm:text-[17px]">
            {copy.lead}
          </p>

          <div className="mt-11">
            <WaitlistForm variant="light" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
