import { Reveal } from "@/components/motion/reveal";

export function HeroBadge() {
  return (
    <Reveal>
      <p className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.22em] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden />
        Koosolekujärgne elluviimine väikestele tiimidele
      </p>
    </Reveal>
  );
}
