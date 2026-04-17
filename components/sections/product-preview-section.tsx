"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

import { demoMeetings } from "@/lib/constants";
import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/ui/badge";
import { MeetingInputCard } from "@/components/product-preview/meeting-input-card";
import { StackedShowcase } from "@/components/product-preview/stacked-showcase";
import { LayeredShowcase } from "@/components/product-preview/layered-showcase";

export function ProductPreviewSection() {
  const reduce = useReducedMotion() ?? false;

  const [activeId, setActiveId] = useState(demoMeetings[0]!.id);
  const active = demoMeetings.find((m) => m.id === activeId) ?? demoMeetings[0]!;

  return (
    <section id="product" className="section-y">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            eyebrow="Toode"
            title="Mis juhtub pärast koosolekut"
            description="Doviqo muudab segased märkmed selliseks elluviimise kihiks, mida tiim päriselt kasutab."
          />
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/65">
                Vali stsenaarium ja vaata ühte voogu: otsustest saavad vastutajad
                ja tähtajad, kokkuvõte jõuab sinna, kus tiim töötab, ja järelkiri
                on valmis — ilma uue vahekaardita.
              </p>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Näidiskoosoleku stsenaariumid"
              >
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
      </SectionContainer>
    </section>
  );
}
