import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const steps = [
  {
    n: "01",
    title: "Add the meeting",
    body: "Paste notes or upload a transcript from the tools you already use.",
  },
  {
    n: "02",
    title: "Review what matters",
    body: "Doviqo extracts decisions, action items, owners, deadlines, and blockers.",
  },
  {
    n: "03",
    title: "Send and sync",
    body: "Generate follow-ups, share recaps, and keep commitments visible until they’re done.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From conversation to clear next steps"
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.n}>
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
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

