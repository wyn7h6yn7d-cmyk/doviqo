"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import {
  submitWaitlist,
  validateWaitlist,
  type WaitlistFormValues,
} from "@/lib/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  const emailId = useId();
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
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border/80 section-y"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,rgb(var(--accent)/0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/90 via-background/40 to-background"
        aria-hidden
      />

      <SectionContainer className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Varajane ligipääs
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Koosolekust tegevuseni
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
              Doviqo aitab väikestel tiimidel vestlustest teha selged järgmised
              sammud — ilma järjekordse raske tööriistata virna.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground/90">
              Kutsega nimekiri · Ei rämpsposti · Kirjutame ainult ligipääsu
              kohta.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/[0.12]",
                "bg-surface/90 shadow-[0_32px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl",
                "ring-1 ring-white/[0.06]",
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_280px_at_20%_0%,rgb(var(--accent)/0.14),transparent_60%)] opacity-90" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {status === "success" ? "Kinnitatud" : "Taotle ligipääsu"}
                  </p>
                </div>

                <motion.div
                  className="mt-6"
                  initial={false}
                  animate={status === "success" ? "success" : "form"}
                  variants={{
                    form: { opacity: 1, y: 0 },
                    success: { opacity: 1, y: 0 },
                  }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: DURATION.ctaSwap, ease: EASE_PREMIUM }
                  }
                >
                  {status === "success" ? (
                    <div role="status" aria-live="polite">
                      <div className="flex gap-4 rounded-xl border border-white/[0.08] bg-background/50 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-base font-medium text-foreground">
                            Oled nimekirjas.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Kirjutame, kui varajane ligipääs avaneb. Hoia postkasti
                            silmas — ja kalendrit pärast järgmist koosolekut.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto"
                          type="button"
                          onClick={() => {
                            setStatus("idle");
                            setErrorMessage(null);
                            setTouched({});
                            setValues({ email: "", teamSize: "2-10" });
                          }}
                        >
                          Kasuta teist e-posti
                        </Button>
                        <Button
                          className="w-full sm:w-auto"
                          href="#how"
                          variant="secondary"
                        >
                          Kuidas see töötab
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form
                      className="grid gap-5"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setTouched({ email: true });
                        if (Object.keys(validateWaitlist(values)).length > 0)
                          return;
                        setStatus("submitting");
                        setErrorMessage(null);
                        const res = await submitWaitlist(values);
                        if (res.ok) setStatus("success");
                        else {
                          setStatus("error");
                          setErrorMessage(res.message);
                        }
                      }}
                    >
                      <label className="grid gap-2" htmlFor={emailId}>
                        <span className="text-sm font-medium text-foreground/90">
                          Töökasutaja e-post
                        </span>
                        <Input
                          id={emailId}
                          required
                          inputMode="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, email: e.target.value }))
                          }
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          placeholder="sinu@ettevote.ee"
                          aria-invalid={emailError ? true : undefined}
                          aria-describedby={
                            emailError ? `${emailId}-error` : `${emailId}-hint`
                          }
                          className="h-12 border-white/[0.12] bg-background/50 text-base"
                        />
                        {emailError ? (
                          <p
                            id={`${emailId}-error`}
                            className="text-sm text-rose-300/95"
                            role="alert"
                          >
                            {emailError}
                          </p>
                        ) : (
                          <p
                            id={`${emailId}-hint`}
                            className="text-sm text-muted-foreground"
                          >
                            Me ei jaga sinu e-posti. Loobumine on alati võimalik.
                          </p>
                        )}
                      </label>

                      <Button
                        type="submit"
                        className="h-12 w-full text-[15px] font-medium"
                        disabled={!canSubmit}
                      >
                        {status === "submitting"
                          ? "Liitun…"
                          : "Taotle varajast ligipääsu"}
                      </Button>

                      {status === "error" && errorMessage ? (
                        <p className="text-center text-sm text-rose-300/95">
                          {errorMessage}
                        </p>
                      ) : null}
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
