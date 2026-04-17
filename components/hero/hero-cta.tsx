import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function HeroCta() {
  return (
    <Reveal delay={0.15}>
      <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
        <Button
          href="#cta"
          className="w-full min-w-[11rem] sm:w-auto"
          aria-describedby="hero-cta-hint"
        >
          Varajane ligipääs
        </Button>
        <Button
          href="#how"
          variant="secondary"
          className="w-full min-w-[11rem] sm:w-auto"
        >
          Kuidas see töötab
        </Button>
      </div>
      <p
        id="hero-cta-hint"
        className="mt-5 max-w-md text-[13px] leading-relaxed text-white/48"
      >
        Ilma salvestita. Ilma uue tööriistata. Selged järgmised sammud pärast iga
        koosolekut.
      </p>
    </Reveal>
  );
}
