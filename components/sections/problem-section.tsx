import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative section-y"
      aria-labelledby="problem-heading"
    >
      <div
        className="pointer-events-none absolute left-0 top-[22%] hidden h-[min(320px,55%)] w-px bg-gradient-to-b from-white/18 via-white/8 to-transparent lg:block"
        aria-hidden
      />
      <SectionContainer>
        <Reveal>
          <SectionHeading
            headingId="problem-heading"
            eyebrow="Probleem"
            title="Enamik tööriistu jääb märkmete juurde."
            description="Salvestus on olemas. Kokkuvõte ka. Aga keegi peab ikka veel kokku võtma, mis otsustati, kes vastutab, mis saadetakse ja mis juhtub edasi. Seal töö tavaliselt pudeneb."
          />
        </Reveal>
      </SectionContainer>
    </section>
  );
}
