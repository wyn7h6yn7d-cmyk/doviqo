"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function FinalCta() {
  const emailId = useId();
  const teamId = useId();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cta" className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="Early access"
              title="Turn your next meeting into momentum."
              description="Join the waitlist for early access. For now this form is front-end only — wire it to your backend later."
            />
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
              <span className="rounded-full bg-white/10 px-2 py-1">
                No integrations yet
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1">
                Built for small teams
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1">
                Focused on execution
              </span>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6">
            <Card className="p-5 sm:p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-3">
                  <label className="grid gap-1.5" htmlFor={emailId}>
                    <span className="text-xs font-medium text-white/70">
                      Work email
                    </span>
                    <input
                      id={emailId}
                      required
                      inputMode="email"
                      placeholder="name@company.com"
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-white/20 focus:ring-2 focus:ring-white/10"
                    />
                  </label>

                  <label className="grid gap-1.5" htmlFor={teamId}>
                    <span className="text-xs font-medium text-white/70">
                      Team size
                    </span>
                    <select
                      id={teamId}
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white/85 outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
                      defaultValue="2-10"
                    >
                      <option value="1">Just me</option>
                      <option value="2-10">2–10</option>
                      <option value="11-25">11–25</option>
                      <option value="26-50">26–50</option>
                      <option value="50+">50+</option>
                    </select>
                  </label>

                  <div className="pt-1">
                    <Button type="submit" className="w-full">
                      Request early access
                    </Button>
                    <p className="mt-3 text-xs text-white/50">
                      Placeholder form. Later: send to `/api/waitlist` or your
                      preferred provider.
                    </p>
                    {submitted ? (
                      <p className="mt-3 text-xs text-white/70">
                        Submitted — we’ll reach out soon. (Front-end mock)
                      </p>
                    ) : null}
                  </div>
                </div>
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

