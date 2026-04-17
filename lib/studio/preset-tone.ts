import type { MeetingToneId } from "@/lib/studio/meeting-tone";

/** Studio koosoleku tüübi id → toon (sama nimetus kui meeting-tone infer). */
export function presetIdToMeetingTone(presetId: string): MeetingToneId {
  switch (presetId) {
    case "team-weekly":
      return "team-weekly";
    case "client-meeting":
      return "client-meeting";
    case "sales-call":
      return "sales-call";
    case "project-status":
      return "project-status";
    case "hiring-interview":
      return "hiring-interview";
    default:
      return "generic";
  }
}
