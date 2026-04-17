export { waitlist } from "@/lib/waitlist/messages";
export type {
  SubmitWaitlistFn,
  WaitlistFormValues,
  WaitlistSubmitResult,
} from "@/lib/waitlist/types";
export { submitWaitlist } from "@/lib/waitlist/submit";
export { isValidEmail, validateWaitlistEmail } from "@/lib/waitlist/validate";

import type { WaitlistFormValues } from "@/lib/waitlist/types";
import { validateWaitlistEmail } from "@/lib/waitlist/validate";

/** Ühilduvus vanema impordiga: `validateWaitlist`. */
export function validateWaitlist(
  values: WaitlistFormValues,
  messages: { empty: string; invalid: string },
) {
  return validateWaitlistEmail(values, messages);
}
