import type { WaitlistFormValues } from "@/lib/waitlist/types";

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function validateWaitlistEmail(
  values: WaitlistFormValues,
  messages: { empty: string; invalid: string },
): Partial<Record<keyof WaitlistFormValues, string>> {
  const errors: Partial<Record<keyof WaitlistFormValues, string>> = {};
  const email = values.email.trim();
  if (!email) errors.email = messages.empty;
  else if (!isValidEmail(email)) errors.email = messages.invalid;
  return errors;
}
