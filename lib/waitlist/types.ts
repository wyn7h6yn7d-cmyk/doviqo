export type WaitlistFormValues = {
  email: string;
};

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

/** Hiljem: `fetch("/api/waitlist", …)` või server action. */
export type SubmitWaitlistFn = (
  values: WaitlistFormValues,
  options?: { signal?: AbortSignal },
) => Promise<WaitlistSubmitResult>;
