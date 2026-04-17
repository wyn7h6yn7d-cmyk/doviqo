"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

import { Chip } from "@/components/landing/ui/chip";
import { demoMeetings } from "@/components/landing/product-preview/data";
import { MeetingInputCard } from "@/components/landing/product-preview/meeting-input-card";
import { StackedShowcase } from "@/components/landing/product-preview/stacked-showcase";
import { LayeredShowcase } from "@/components/landing/product-preview/layered-showcase";

export function ProductPreview() {
  const reduce = useReducedMotion() ?? false;

  const [activeId, setActiveId] = useState(demoMeetings[0]!.id);
  const active = demoMeetings.find((m) => m.id === activeId) ?? demoMeetings[0]!;

  return (
    <section id="product" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Product"
            title="A premium workflow that makes next steps obvious."
            description="Add a meeting. Doviqo extracts action items, assigns owners, sets deadlines, and drafts follow-ups — so momentum doesn’t decay after the call."
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/65">
                Pick a meeting. The mock interface updates instantly — action
                items, owners, deadlines, recap, and a follow-up draft.
              </p>

              <div className="flex flex-wrap gap-2">
                {demoMeetings.map((m) => (
                  <Chip
                    key={m.id}
                    active={m.id === activeId}
                    onClick={() => setActiveId(m.id)}
                  >
                    {m.title}
                  </Chip>
                ))}
              </div>

              <MeetingInputCard meeting={active} />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <StackedShowcase meeting={active} />
            <LayeredShowcase meeting={active} reduceMotion={reduce} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

