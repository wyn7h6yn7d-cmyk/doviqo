export type WaitlistFormValues = {
  email: string;
};

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function validateWaitlist(
  values: WaitlistFormValues,
  messages: { empty: string; invalid: string },
) {
  const errors: Partial<Record<keyof WaitlistFormValues, string>> = {};
  const email = values.email.trim();
  if (!email) errors.email = messages.empty;
  else if (!isValidEmail(email)) errors.email = messages.invalid;
  return errors;
}

/**
 * Esialgne „submit“ — hiljem asenda päris API kõnega (nt POST /api/waitlist).
 */
export async function submitWaitlist(
  values: WaitlistFormValues,
): Promise<WaitlistSubmitResult> {
  void values;
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}
