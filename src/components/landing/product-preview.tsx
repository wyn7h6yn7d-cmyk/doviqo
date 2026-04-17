import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

function PanelHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-white/70">{title}</p>
      {meta ? (
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/55">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

export function ProductPreview() {
  return (
    <section id="product" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Product"
            title="A believable workflow you’ll actually use."
            description="Doviqo doesn’t try to be the meeting. It handles what comes after: action items, owners, deadlines, and follow-ups."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Card className="overflow-hidden">
              <div className="p-5 sm:p-6">
                <PanelHeader title="Next steps" meta="6 items" />
                <div className="mt-4 grid gap-3">
                  {[
                    {
                      t: "Confirm rollout date with Support and update the timeline.",
                      who: "Sam",
                      due: "Thu",
                    },
                    {
                      t: "Draft onboarding checklist and share for review.",
                      who: "Nina",
                      due: "Fri",
                    },
                    {
                      t: "Send recap + decisions to #product and tag owners.",
                      who: "You",
                      due: "Today",
                    },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-6 text-white/80">
                          {x.t}
                        </p>
                        <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70">
                          Due {x.due}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-white/55">
                        <span className="rounded-full bg-white/10 px-2 py-0.5">
                          {x.who}
                        </span>
                        <span className="ml-auto text-white/40">
                          Action item
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 bg-black/25 p-4">
                <p className="text-xs text-white/55">
                  Owners and deadlines are explicit by default — the point is to
                  ship.
                </p>
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.05}>
              <Card className="p-5 sm:p-6">
                <PanelHeader title="Follow-up email draft" meta="Ready" />
                <p className="mt-4 text-sm leading-7 text-white/78">
                  “Thanks for the sync. Here are the next steps: Sam will confirm
                  the rollout date by Thursday, Nina will share the onboarding
                  checklist by Friday, and we’ll review progress next week.”
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                    Clear owners
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                    Crisp deadlines
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                    Decisions captured
                  </span>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="p-5 sm:p-6">
                <PanelHeader title="Slack recap" meta="#product" />
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-sm leading-6 text-white/78">
                    Recap: 4 decisions, 6 action items. Owners confirmed. Next
                    check-in Thursday.
                  </p>
                </div>
                <p className="mt-4 text-xs text-white/55">
                  Copy-ready updates that keep momentum visible between calls.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

