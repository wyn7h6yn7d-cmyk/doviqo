import type { ProcessMeetingNotesOptions } from "@/lib/studio/process-notes";
import type { StudioTulemus } from "@/lib/studio/types";
import { runStudioTransform } from "@/lib/studio/run-studio";

/**
 * Üks sisendpunkt Studio demole (ja tulevasele API-le).
 *
 * Täna: deterministlik parsimine + simuleeritud viivitus (`runStudioTransform`).
 * Homme: asenda keha `fetch("/api/studio", …)` vastu, säilitades tagastustüüp `StudioTulemus`.
 */
export async function transformStudioInput(
  raw: string,
  options?: ProcessMeetingNotesOptions,
): Promise<StudioTulemus> {
  return runStudioTransform(raw, options);
}
