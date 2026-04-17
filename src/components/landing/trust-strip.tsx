import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const logos = ["Linear-style teams", "Product orgs", "Design-led SaaS", "Ops"];

export function TrustStrip() {
  return (
    <section aria-label="Trust" className="border-y border-white/8 bg-black/35">
      <Container className="py-6">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium tracking-wide text-white/55">
            Built for small teams who want post-meeting execution to feel
            automatic.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45">
            {logos.map((l) => (
              <span key={l} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                {l}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

