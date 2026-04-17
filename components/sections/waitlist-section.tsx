"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { waitlist as copy, nav } from "@/lib/site-content";
import { sectionUi } from "@/lib/ui";
import { SectionContainer } from "@/components/layout/section-container";
import { WaitlistSignup } from "@/components/waitlist";
import { Button } from "@/components/ui/button";

export function WaitlistSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={copy.id}
      className="section-y relative overflow-hidden border-t border-[var(--border-strong)] bg-[var(--bg-deep)]"
      aria-labelledby="waitlist-heading"
    >
      <div className="ambient-orbs opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,rgb(var(--accent)/0.14),transparent_55%)]"
        aria-hidden
      />

      <SectionContainer className="relative">
        <motion.div
          className="mx-auto max-w-lg"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px", amount: 0.2 }}
          transition={{ duration: DURATION.reveal * 0.85, ease: EASE_PREMIUM }}
        >
          <h2
            id="waitlist-heading"
            className={`${sectionUi.titleLg} text-center`}
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-center text-[15px] leading-relaxed text-[var(--foreground-muted)] sm:text-[17px]">
            {copy.lead}
          </p>

          <div className="mt-10">
            <WaitlistSignup variant="dark" />
          </div>

          <p className="mt-10 text-center text-[13px] text-[var(--foreground-subtle)]">
            {copy.tryStudioLead}{" "}
            <Button
              href="/studio"
              variant="ghost"
              size="sm"
              className="inline-flex min-h-8 px-2 py-1 text-[13px] font-semibold text-[rgb(var(--accent-bright))] hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--accent-cyan))]"
            >
              {nav.studioCta}
            </Button>
          </p>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
