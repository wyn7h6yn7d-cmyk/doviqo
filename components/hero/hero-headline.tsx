import { Reveal } from "@/components/motion/reveal";
import { HeroBadge } from "@/components/hero/hero-badge";

export function HeroHeadline() {
  return (
    <div className="max-w-xl lg:max-w-[36rem]">
      <HeroBadge />

      <Reveal delay={0.05}>
        <h1
          id="hero-heading"
          className="mt-7 text-balance text-[2.375rem] font-semibold leading-[1.08] tracking-[-0.038em] sm:text-5xl sm:leading-[1.06] lg:mt-8 lg:text-[3.25rem] xl:text-[3.5rem]"
        >
          <span className="text-white/[0.88]">Koosolek lõpeb. Töö jääb pooleli.</span>{" "}
          <span className="text-white">Doviqo seab järgmised sammud korda.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-lg text-pretty text-[17px] leading-[1.65] text-white/70 sm:text-lg sm:leading-8">
          Koosoleku märkmed ja üleskirjutus muutuvad minutitega vastutajateks,
          tähtaegadeks, järeltegevuseks ja selgeks järgmiste sammude plaaniks.
        </p>
      </Reveal>
    </div>
  );
}
