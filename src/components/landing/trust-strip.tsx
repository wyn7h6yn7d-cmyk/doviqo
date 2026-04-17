import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function TrustStrip() {
  return (
    <section aria-label="Trust" className="border-y border-white/8 bg-black/35">
      <Container className="py-6">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium tracking-wide text-white/55">
            Built for teams that are done losing work after the meeting.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
            {["Clarity.", "Ownership.", "Momentum."].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

