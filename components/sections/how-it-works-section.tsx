import { Card } from "@/components/ui/card";
import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const steps = [
  {
    n: "01",
    title: "Lisa koosolek",
    body: "Aseta märkmed või üleskirjutus — tööriistadest, mida juba kasutad.",
  },
  {
    n: "02",
    title: "Vaata olulist",
    body: "Doviqo eraldab otsused, tegevused, vastutajad, tähtajad ja blokkerid.",
  },
  {
    n: "03",
    title: "Saada ja hoia koos",
    body: "Koosta järelkirju, jaga kokkuvõtet ja hoia kohustused nähtaval kuni lõpuni.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="section-y">
      <SectionContainer>
        <Reveal>
          <SectionHeading
            eyebrow="Kuidas see töötab"
            title="Vestlusest selgete järgmiste sammudeni"
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
      </SectionContainer>
    </section>
  );
}
