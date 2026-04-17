"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import {
  submitWaitlist as defaultSubmit,
  validateWaitlist,
  type SubmitWaitlistFn,
  type WaitlistFormValues,
} from "@/lib/waitlist";
import { waitlist as copy } from "@/lib/waitlist/messages";
import { isValidEmail } from "@/lib/waitlist/validate";

const validationMessages = {
  empty: copy.errorEmpty,
  invalid: copy.errorInvalid,
} as const;

export type WaitlistSignupStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export function useWaitlistSignup(options?: {
  submitFn?: SubmitWaitlistFn;
  onSuccess?: (email: string) => void;
}) {
  const submitFn = options?.submitFn ?? defaultSubmit;
  const onSuccess = options?.onSuccess;
  const inFlight = useRef(false);

  const [values, setValues] = useState<WaitlistFormValues>({ email: "" });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<WaitlistSignupStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errors = useMemo(
    () => validateWaitlist(values, validationMessages),
    [values],
  );

  const emailTrim = values.email.trim();
  const valid = isValidEmail(emailTrim);
  const emailError = touched ? errors.email : undefined;

  /** Nuppu ei saa vajutada, kui e-post või olek ei luba. Laadimise ajal jätame nupu visuaalselt teravaks (spinner). */
  const submitDisabled = status === "success" || !valid;

  const reset = useCallback(() => {
    inFlight.current = false;
    setStatus("idle");
    setValues({ email: "" });
    setTouched(false);
    setErrorMessage(null);
  }, []);

  const setEmail = useCallback((email: string) => {
    setValues({ email });
    setStatus((s) => (s === "error" ? "idle" : s));
    setErrorMessage(null);
  }, []);

  const submit = useCallback(async () => {
    if (inFlight.current) return;
    setTouched(true);
    const v = validateWaitlist(values, validationMessages);
    if (v.email) return;

    inFlight.current = true;
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await submitFn(values);
      if (res.ok) {
        setStatus("success");
        onSuccess?.(values.email.trim());
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
    } finally {
      inFlight.current = false;
    }
  }, [submitFn, values, onSuccess]);

  return {
    values,
    emailTrim,
    valid,
    emailError,
    touched,
    setTouched,
    setEmail,
    status,
    errorMessage,
    submitDisabled,
    reset,
    submit,
  };
}
