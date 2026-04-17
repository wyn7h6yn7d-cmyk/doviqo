import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Problem() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title="Most meeting tools stop at notes."
            description="They record the call. They write a summary. Then someone still has to figure out what was decided, who owns what, what needs to be sent, and what happens next. That’s where work gets lost."
          />
        </Reveal>
      </Container>
    </section>
  );
}

