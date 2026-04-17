import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const reasons = [
  {
    title: "Clarity over clutter",
    body: "Turn messy discussions into a crisp list of next steps — with context that stays readable.",
  },
  {
    title: "Ownership by default",
    body: "Every action has a clear owner. No “someone should…” slipping through the cracks.",
  },
  {
    title: "Momentum that holds",
    body: "Deadlines and follow-ups are draftable fast, so work moves between meetings.",
  },
  {
    title: "Less manual recap",
    body: "Spend minutes reviewing and sending. Stop rewriting the same recap every week.",
  },
];

export function WhyDoviqo() {
  return (
    <section id="why" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Doviqo"
            title="Designed for post-meeting execution."
            description="A lightweight tool for small teams — focused on clarity, owners, deadlines, and follow-through."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {reasons.map((r, idx) => (
            <Reveal key={r.title} delay={0.05 * idx}>
              <Card className="p-5 sm:p-6">
                <p className="text-sm font-medium text-white/85">{r.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/62">{r.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

