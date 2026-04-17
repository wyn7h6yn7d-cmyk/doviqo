"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PanelHeader } from "@/components/landing/ui/panel-header";
import {
  submitWaitlist,
  validateWaitlist,
  type WaitlistFormValues,
} from "@/components/landing/waitlist/use-waitlist-form";

export function FinalCta() {
  const emailId = useId();
  const teamId = useId();
  const reduce = useReducedMotion() ?? false;

  const [values, setValues] = useState<WaitlistFormValues>({
    email: "",
    teamSize: "2-10",
  });
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errors = useMemo(() => validateWaitlist(values), [values]);
  const emailError = touched.email ? errors.email : undefined;
  const canSubmit = status !== "submitting" && Object.keys(errors).length === 0;

  return (
    <section id="cta" className="py-14 sm:py-16 lg:py-20">
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
            <Card className="overflow-hidden">
              <div className="p-5 sm:p-6">
                <PanelHeader
                  title="Early access"
                  meta={status === "success" ? "Saved" : "Waitlist"}
                />

                <motion.div
                  className="mt-5"
                  initial={false}
                  animate={status === "success" ? "success" : "form"}
                  variants={{
                    form: { opacity: 1, y: 0 },
                    success: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
                  }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  {status === "success" ? (
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80">
                          <span className="text-sm">✓</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white/85">
                            You’re on the list.
                          </p>
                          <p className="mt-1 text-sm leading-7 text-white/62">
                            We’ll reach out when early access opens. (No data is
                            sent yet — front-end mock.)
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            setStatus("idle");
                            setErrorMessage(null);
                            setTouched({});
                            setValues({ email: "", teamSize: "2-10" });
                          }}
                        >
                          Add another email
                        </Button>
                        <Button
                          className="w-full sm:w-auto"
                          href="#how"
                        >
                          See how it works
                        </Button>
                      </div>

                      <p className="mt-4 text-xs text-white/50">
                        Later: connect this to a backend endpoint like{" "}
                        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                          POST /api/waitlist
                        </span>
                        .
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setTouched({ email: true });
                        const currentErrors = validateWaitlist(values);
                        if (Object.keys(currentErrors).length > 0) return;

                        setStatus("submitting");
                        setErrorMessage(null);
                        const res = await submitWaitlist(values);
                        if (res.ok) setStatus("success");
                        else {
                          setStatus("error");
                          setErrorMessage(res.message);
                        }
                      }}
                      className="grid gap-3"
                    >
                      <label className="grid gap-1.5" htmlFor={emailId}>
                        <span className="text-xs font-medium text-white/70">
                          Work email
                        </span>
                        <input
                          id={emailId}
                          required
                          inputMode="email"
                          value={values.email}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, email: e.target.value }))
                          }
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          placeholder="name@company.com"
                          aria-invalid={emailError ? true : undefined}
                          aria-describedby={emailError ? `${emailId}-error` : undefined}
                          className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-white/20 focus:ring-2 focus:ring-white/10"
                        />
                        {emailError ? (
                          <p
                            id={`${emailId}-error`}
                            className="text-xs text-white/55"
                          >
                            {emailError}
                          </p>
                        ) : (
                          <p className="text-xs text-white/45">
                            We’ll only use this for early access updates.
                          </p>
                        )}
                      </label>

                      <label className="grid gap-1.5" htmlFor={teamId}>
                        <span className="text-xs font-medium text-white/70">
                          Team size
                        </span>
                        <select
                          id={teamId}
                          value={values.teamSize}
                          onChange={(e) =>
                            setValues((v) => ({
                              ...v,
                              teamSize: e.target.value as WaitlistFormValues["teamSize"],
                            }))
                          }
                          className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white/85 outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
                        >
                          <option value="1">Just me</option>
                          <option value="2-10">2–10</option>
                          <option value="11-25">11–25</option>
                          <option value="26-50">26–50</option>
                          <option value="50+">50+</option>
                        </select>
                        <p className="text-xs text-white/45">
                          Helps us prioritize the right workflows.
                        </p>
                      </label>

                      <div className="pt-1">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={!canSubmit}
                        >
                          {status === "submitting"
                            ? "Requesting…"
                            : "Request early access"}
                        </Button>

                        {status === "error" && errorMessage ? (
                          <p className="mt-3 text-xs text-white/65">
                            {errorMessage}
                          </p>
                        ) : null}

                        <p className="mt-3 text-xs text-white/50">
                          Placeholder submit. Later: connect to{" "}
                          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-white/70">
                            /api/waitlist
                          </span>{" "}
                          and store in your DB.
                        </p>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

