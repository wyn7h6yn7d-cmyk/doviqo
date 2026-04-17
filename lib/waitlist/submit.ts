import type {
  SubmitWaitlistFn,
  WaitlistSubmitResult,
} from "@/lib/waitlist/types";

const DELAY_MS = 520;

/**
 * Ootenimekirja saatmine — praegu ainult front-end (viivitus + OK).
 *
 * Ühendamiseks backendiga:
 * 1. Loo `app/api/waitlist/route.ts` (või server action).
 * 2. Asenda allolev plokk `fetch`-iga; hoia `SubmitWaitlistFn` signatuur.
 * 3. Vea korral tagasta `{ ok: false, message: string }` (kasutajale kuvatav tekst või `"network"`).
 */
export const submitWaitlist: SubmitWaitlistFn = async (
  values,
  options,
): Promise<WaitlistSubmitResult> => {
  const email = values.email.trim();
  if (!email) return { ok: false, message: "empty" };

  try {
    await new Promise<void>((resolve, reject) => {
      const t = window.setTimeout(() => resolve(), DELAY_MS);
      const signal = options?.signal;
      if (!signal) return;
      const onAbort = () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      };
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, message: "aborted" };
    }
    throw e;
  }

  // const res = await fetch("/api/waitlist", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  //   signal: options?.signal,
  // });
  // if (!res.ok) return { ok: false, message: await res.text() };

  return { ok: true };
};
