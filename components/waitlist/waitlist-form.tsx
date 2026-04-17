"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import {
  submitWaitlist,
  validateWaitlist,
  type WaitlistFormValues,
} from "@/lib/waitlist";
import { waitlist as copy } from "@/lib/waitlist/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const validationMessages = {
  empty: copy.errorEmpty,
  invalid: copy.errorInvalid,
} as const;

const shellDark =
  "relative overflow-hidden rounded-[1.15rem] border border-white/12 bg-white/[0.07] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8";
const shellLight =
  "relative overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-white p-6 shadow-card backdrop-blur-sm sm:p-8";

const inputDark =
  "h-12 rounded-xl border-white/18 bg-slate-950/40 px-4 text-base text-white placeholder:text-slate-400 focus:border-indigo-400/55 focus:shadow-[0_0_0_3px_rgba(129,140,248,0.2)]";
const inputLight = "";

type Props = {
  /** Tumeda sektsiooni või hele tausta jaoks. */
  variant?: "dark" | "light";
  className?: string;
};

export function WaitlistForm({ variant = "light", className }: Props) {
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
  /** Allow submit with invalid/empty input so validation messages can appear (a11y + clarity). */
  const submitDisabled = status === "submitting";

  const isDark = variant === "dark";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const v = validateWaitlist(values, validationMessages);
    if (v.email) return;
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await submitWaitlist(values);
      if (res.ok) {
        setStatus("success");
        return;
      }
      setStatus("error");
      if (res.message === "aborted") return;
      setErrorMessage(
        res.message && res.message !== "network"
          ? res.message
          : copy.errorGeneric,
      );
    } catch {
      setStatus("error");
      setErrorMessage(copy.errorGeneric);
    }
  };

  const reset = () => {
    setStatus("idle");
    setValues({ email: "" });
    setTouched(false);
    setErrorMessage(null);
  };

  return (
    <div className={cn(isDark ? shellDark : shellLight, className)}>
      {isDark ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      )}
      {!isDark ? (
        <div
          className="pointer-events-none absolute -left-px bottom-0 top-0 w-px bg-gradient-to-b from-[rgb(var(--accent)/0.35)] via-[rgb(var(--accent)/0.12)] to-transparent opacity-90"
          aria-hidden
        />

      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: DURATION.cta, ease: EASE_PREMIUM }}
            className="text-center"
          >
            <p
              className={cn(
                "text-lg font-medium",
                isDark ? "text-white" : "text-[var(--fg)]",
              )}
            >
              {copy.successTitle}
            </p>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed",
                isDark ? "text-slate-300" : "text-[var(--foreground-muted)]",
              )}
            >
              {copy.successBody}
            </p>
            <Button
              type="button"
              variant="secondary"
              className={cn(
                "mt-6",
                isDark
                  ? "border-white/15 bg-white/10 text-white hover:bg-white/15"
                  : "",
              )}
              onClick={reset}
            >
              {copy.successCta}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="grid gap-5"
            onSubmit={onSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
          >
            <label className="grid gap-2 text-left" htmlFor={emailId}>
              <span
                className={cn(
                  "text-sm font-medium",
                  isDark ? "text-slate-200" : "text-[var(--fg)]",
                )}
              >
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
                onChange={(e) => {
                  setValues({ email: e.target.value });
                  if (status === "error") setStatus("idle");
                }}
                onBlur={() => setTouched(true)}
                disabled={status === "submitting"}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={
                  emailError ? `${emailId}-err` : `${emailId}-hint`
                }
                className={cn(isDark ? inputDark : inputLight)}
              />
              <AnimatePresence initial={false}>
                {emailError ? (
                  <motion.p
                    id={`${emailId}-err`}
                    role="alert"
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                    className="text-sm text-rose-500"
                  >
                    {emailError}
                  </motion.p>
                ) : (
                  <p
                    id={`${emailId}-hint`}
                    className={cn(
                      "text-sm",
                      isDark
                        ? "text-slate-400"
                        : "text-[var(--foreground-subtle)]",
                    )}
                  >
                    {copy.hint}
                  </p>
                )}
              </AnimatePresence>
            </label>

            <Button
              type="submit"
              className={cn(
                "h-12 w-full text-[15px] font-medium",
                isDark
                  ? "bg-white text-[var(--fg)] shadow-soft-sm hover:bg-[var(--bg-elevated)]"
                  : "",
              )}
              disabled={submitDisabled}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? copy.submitting : copy.submit}
            </Button>

            <AnimatePresence>
              {status === "error" && errorMessage ? (
                <motion.p
                  key="err"
                  role="alert"
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "text-center text-sm",
                    isDark ? "text-rose-300" : "text-rose-600",
                  )}
                >
                  {errorMessage}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
