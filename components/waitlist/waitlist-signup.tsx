"use client";

import type { FormEvent } from "react";
import { useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import type { SubmitWaitlistFn } from "@/lib/waitlist";
import { waitlist as copy } from "@/lib/waitlist/messages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useWaitlistSignup } from "./use-waitlist-signup";

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white",
        className,
      )}
      aria-hidden
    />
  );
}

function SuccessGlyph({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(124,92,255)]/25 to-[rgb(34,211,238)]/20 shadow-[0_0_32px_-8px_rgb(124,92,255/0.45)]",
        className,
      )}
      aria-hidden
    >
      <svg
        className="h-6 w-6 text-[rgb(var(--accent-cyan))]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
}

export type WaitlistSignupProps = {
  variant?: "dark" | "light";
  className?: string;
  /** Vaikimisi `submitWaitlist` (simulatsioon). Asenda `POST /api/waitlist`-iga. */
  submitFn?: SubmitWaitlistFn;
  onSuccess?: (email: string) => void;
};

export function WaitlistSignup({
  variant = "dark",
  className,
  submitFn,
  onSuccess,
}: WaitlistSignupProps) {
  const emailId = useId();
  const reduce = useReducedMotion() ?? false;

  const {
    values,
    emailError,
    setTouched,
    setEmail,
    status,
    errorMessage,
    submitDisabled,
    reset,
    submit,
  } = useWaitlistSignup({ submitFn, onSuccess });

  const hintId = `${emailId}-hint`;
  const errId = `${emailId}-err`;

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submit();
  };

  const shell =
    variant === "dark"
      ? "relative overflow-hidden rounded-[1.15rem] border border-[var(--border-hairline)] bg-[linear-gradient(165deg,rgba(22,26,36,0.92)_0%,rgba(10,12,18,0.88)_100%)] p-6 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-8"
      : "relative overflow-hidden rounded-[1.15rem] border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-6 shadow-card backdrop-blur-md sm:p-8";

  const inputBase =
    "h-12 w-full rounded-xl border bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] px-4 text-[15px] text-[var(--fg)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] outline-none backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[var(--foreground-subtle)] focus:border-[rgb(var(--accent-cyan)/0.45)] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_3px_rgb(var(--accent)/0.15)] disabled:cursor-not-allowed disabled:opacity-55";

  const inputOk =
    "border-[rgb(var(--accent)/0.22)] hover:border-[rgb(var(--accent)/0.35)]";
  const inputErr =
    "border-rose-400/55 shadow-[inset_0_0_0_1px_rgba(251,113,133,0.35)] hover:border-rose-400/70 focus:border-rose-400/80 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_3px_rgba(244,63,94,0.15)]";

  return (
    <div className={cn(shell, className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent-cyan)/0.4)] to-transparent" />
      <div
        className="pointer-events-none absolute -left-px bottom-0 top-0 w-px bg-gradient-to-b from-[rgb(var(--accent)/0.35)] via-[rgb(var(--accent)/0.1)] to-transparent opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.2)_0%,transparent_70%)] blur-2xl"
        aria-hidden
      />

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: DURATION.cta, ease: EASE_PREMIUM }}
            className="flex flex-col items-center text-center"
          >
            <SuccessGlyph className="mb-5" />
            <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--fg)]">
              {copy.successTitle}
            </p>
            {copy.successBody ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)]">
                {copy.successBody}
              </p>
            ) : null}
            <Button
              type="button"
              variant="secondary"
              className={cn(
                "mt-6 min-h-11",
                copy.successBody ? "" : "mt-5",
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
            onSubmit={onFormSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE_PREMIUM }}
            aria-busy={status === "submitting"}
          >
            <div className="grid gap-2 text-left">
              <label
                className="text-sm font-medium text-[var(--fg)]"
                htmlFor={emailId}
              >
                {copy.emailLabel}
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={copy.placeholder}
                value={values.email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                disabled={status === "submitting"}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? errId : hintId}
                className={cn(
                  inputBase,
                  emailError ? inputErr : inputOk,
                )}
              />
              <div className="min-h-[1.25rem]">
                <AnimatePresence initial={false} mode="wait">
                  {emailError ? (
                    <motion.p
                      key="err"
                      id={errId}
                      role="alert"
                      initial={reduce ? false : { opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                      className="text-sm text-rose-400"
                    >
                      {emailError}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      id={hintId}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-[var(--foreground-subtle)]"
                    >
                      {copy.hint}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "relative h-12 w-full min-h-12 text-[15px] font-semibold",
                status === "submitting" && "pointer-events-none",
              )}
              disabled={submitDisabled}
              aria-busy={status === "submitting"}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center gap-2 transition-opacity duration-200",
                  status === "submitting" ? "opacity-0" : "opacity-100",
                )}
              >
                {copy.submit}
              </span>
              {status === "submitting" ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                  <span className="sr-only">{copy.submitting}</span>
                </span>
              ) : null}
            </Button>

            <AnimatePresence>
              {status === "error" && errorMessage ? (
                <motion.p
                  key="err-global"
                  role="alert"
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                  className="rounded-xl border border-rose-400/25 bg-rose-950/35 px-4 py-3 text-center text-sm leading-relaxed text-rose-200/95"
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
