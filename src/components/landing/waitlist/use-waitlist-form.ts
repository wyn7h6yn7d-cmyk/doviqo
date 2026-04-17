export type WaitlistFormValues = {
  email: string;
  teamSize: "1" | "2-10" | "11-25" | "26-50" | "50+";
};

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

function isValidEmail(value: string) {
  // Not RFC-perfect; intentionally pragmatic for launch forms.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function validateWaitlist(values: WaitlistFormValues) {
  const errors: Partial<Record<keyof WaitlistFormValues, string>> = {};
  const email = values.email.trim();
  if (!email) errors.email = "Please enter an email address.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid work email.";
  return errors;
}

/**
 * Placeholder submit function.
 * Later: replace with a real call (e.g. POST `/api/waitlist`) and persist to DB.
 */
export async function submitWaitlist(
  values: WaitlistFormValues,
): Promise<WaitlistSubmitResult> {
  void values;
  await new Promise((r) => setTimeout(r, 650));
  return { ok: true };
}

