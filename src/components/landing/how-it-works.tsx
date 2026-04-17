import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    n: "01",
    title: "Add the meeting",
    body: "Paste notes or a transcript. Doviqo focuses on what matters after the call.",
  },
  {
    n: "02",
    title: "Review next steps",
    body: "Confirm owners, deadlines, and commitments. Nothing ships unassigned.",
  },
  {
    n: "03",
    title: "Send follow-ups",
    body: "Draft recaps and follow-ups fast — then keep momentum visible between meetings.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from conversation to momentum."
            description="A lightweight workflow that turns messy notes into a clear plan you can act on."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={0.05 * idx}>
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-[0.18em] text-white/55">
                    {s.n}
                  </p>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                </div>
                <p className="mt-3 text-sm font-medium text-white/85">
                  {s.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/62">{s.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

