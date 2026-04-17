import {
  processMeetingNotes,
  type ProcessMeetingNotesOptions,
} from "@/lib/studio/process-notes";
import type { StudioTulemus } from "@/lib/studio/types";

/** Etappide viivitused (ms) — kokku usutav; UI progress ribaga sünkroonis. */
export const STUDIO_PROCESS_PHASES_MS = [480, 420, 520] as const;

export const STUDIO_PROCESS_TOTAL_MS = STUDIO_PROCESS_PHASES_MS.reduce(
  (a, b) => a + b,
  0,
);

/** Millal iga tööetapp UI-s „valmis“ näib (kumulatiivne). */
export const STUDIO_PROCESS_MILESTONES_MS: readonly number[] = (() => {
  let acc = 0;
  return STUDIO_PROCESS_PHASES_MS.map((ms) => {
    acc += ms;
    return acc;
  });
})();

/**
 * Studio töövoog — deterministlik brauseris (simuleeritud etapid + struktureeritud parsimine).
 * Hiljem: asenda API-kutsega, säilitades `StudioTulemus`.
 */
export async function runStudioTransform(
  raw: string,
  options?: ProcessMeetingNotesOptions,
): Promise<StudioTulemus> {
  for (const ms of STUDIO_PROCESS_PHASES_MS) {
    await new Promise((r) => setTimeout(r, ms));
  }
  return processMeetingNotes(raw, options);
}
