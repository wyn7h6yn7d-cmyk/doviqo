"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import {
  submitWaitlist,
  validateWaitlist,
  type WaitlistFormValues,
} from "@/lib/waitlist";
import { waitlist as copy } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/layout/section-container";
import { cn } from "@/lib/utils";

const validationMessages = {
  empty: copy.errorEmpty,
  invalid: copy.errorInvalid,
} as const;

export function WaitlistSection() {
  const emailId = useId();
  const reduce = useReducedMotion() ?? false;

  const [values, setValues] = useState<WaitlistFormValues>({ email: "" });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errors = useMemo(
    () => validateWaitlist(values, validationMessages),
    [values],
  );
  const emailError = touched ? errors.email : undefined;
  const submitDisabled =
    status === "submitting" || (touched && !!errors.email);

  return (
    <section
      id={copy.id}
      className="section-y relative overflow-hidden border-t border-white/[0.06]"
      aria-labelledby="waitlist-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_55%_at_50%_0%,rgb(var(--accent)/0.1),transparent_55%)]"
        aria-hidden
      />

      <SectionContainer>
        <div className="mx-auto max-w-lg">
          <h2
            id="waitlist-heading"
            className="text-balance text-center text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-center text-[15px] leading-relaxed text-white/58 sm:text-base">
            {copy.lead}
          </p>

          <div
            className={cn(
              "relative mt-10 overflow-hidden rounded-2xl border border-white/[0.1] bg-surface/85 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8",
            )}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            {status === "success" ? (
              <motion.div
                role="status"
                aria-live="polite"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.cta, ease: EASE_PREMIUM }}
                className="text-center"
              >
                <p className="text-lg font-medium text-white">{copy.successTitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {copy.successBody}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-6"
                  onClick={() => {
                    setStatus("idle");
                    setValues({ email: "" });
                    setTouched(false);
                    setErrorMessage(null);
                  }}
                >
                  {copy.successCta}
                </Button>
              </motion.div>
            ) : (
              <form
                className="grid gap-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setTouched(true);
                  const v = validateWaitlist(values, validationMessages);
                  if (v.email) return;
                  setStatus("submitting");
                  setErrorMessage(null);
                  const res = await submitWaitlist(values);
                  if (res.ok) setStatus("success");
                  else {
                    setStatus("error");
                    setErrorMessage(res.message || copy.errorGeneric);
                  }
                }}
                noValidate
              >
                <label className="grid gap-2 text-left" htmlFor={emailId}>
                  <span className="text-sm font-medium text-white/85">
                    {copy.emailLabel}
                  </span>
                  <Input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={copy.placeholder}
                    value={values.email}
                    onChange={(e) => setValues({ email: e.target.value })}
                    onBlur={() => setTouched(true)}
                    aria-invalid={emailError ? true : undefined}
                    aria-describedby={
                      emailError ? `${emailId}-err` : `${emailId}-hint`
                    }
                    className="h-12 rounded-xl border-white/[0.12] bg-black/45 px-4 text-base"
                  />
                  {emailError ? (
                    <p
                      id={`${emailId}-err`}
                      className="text-sm text-rose-300/95"
                      role="alert"
                    >
                      {emailError}
                    </p>
                  ) : (
                    <p id={`${emailId}-hint`} className="text-sm text-white/45">
                      {copy.hint}
                    </p>
                  )}
                </label>

                <Button
                  type="submit"
                  className="h-12 w-full text-[15px] font-medium"
                  disabled={submitDisabled}
                >
                  {status === "submitting" ? copy.submitting : copy.submit}
                </Button>

                {status === "error" && errorMessage ? (
                  <p className="text-center text-sm text-rose-300/95" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
