import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";

const pillars = ["Selgus", "Vastutus", "Hoog"] as const;

export function TrustStrip() {
  return (
    <section aria-label="Usaldus" className="border-y border-border bg-surface/30">
      <SectionContainer className="py-7 sm:py-8">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Tiimidele, kes on väsinud töö kaotamisest pärast koosolekut.
          </p>
          <div
            className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80"
            role="list"
            aria-label="Millele Doviqo keskendub"
          >
            {pillars.map((t, i) => (
              <span key={t} className="inline-flex items-center" role="listitem">
                {i > 0 ? (
                  <span className="mr-3 text-muted-foreground/35" aria-hidden>
                    ·
                  </span>
                ) : null}
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
