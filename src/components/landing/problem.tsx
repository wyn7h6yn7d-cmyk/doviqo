import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const pains = [
  {
    title: "Notes aren’t execution",
    body: "Most tools stop at summaries. The real failure happens after the call — when owners and deadlines are fuzzy.",
  },
  {
    title: "Follow-ups get dropped",
    body: "Recaps are written late (or not at all). Action items live in a doc no one checks.",
  },
  {
    title: "Momentum decays fast",
    body: "By the next meeting, context is lost. Teams repeat decisions and chase updates instead of shipping.",
  },
];

export function Problem() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title="Meeting tools end where the work begins."
            description="You don’t need another recorder or a generic AI summary. You need crisp next steps that actually move work forward."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pains.map((p, idx) => (
            <Reveal key={p.title} delay={0.05 * idx}>
              <Card className="p-5">
                <p className="text-sm font-medium text-white/85">{p.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/62">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

