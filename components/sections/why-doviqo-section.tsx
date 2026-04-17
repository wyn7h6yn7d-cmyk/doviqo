import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

export function WhyDoviqoSection() {
  return (
    <section id="why" className="section-y">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            eyebrow="Miks Doviqo"
            title="Loodud koosolekujärgseks kümneks minutiks"
          />
        </Reveal>

        <Stagger className="mt-10">
          <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {[
              "Selged vastutajad ja järgmised sammud",
              "Vähem käsitsi kokkuvõtte tööd",
              "Vähem ununenud järeltegevusi",
              "Kiirem elluviimine pärast koosolekut",
              "Suunatud väikestele tiimidele",
            ].map((b) => (
              <StaggerItem key={b}>
                <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 shadow-layer-1 backdrop-blur-md">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span className="text-sm leading-7 text-white/75">{b}</span>
                </li>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </SectionContainer>
    </section>
  );
}
