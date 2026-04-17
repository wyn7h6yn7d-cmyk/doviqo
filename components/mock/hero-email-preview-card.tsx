import { MeetingCard } from "@/components/mock/meeting-card";
import type { AppPanelDepth } from "@/components/mock/meeting-card";
import {
  HERO_EMAIL_BODY,
  HERO_EMAIL_SUBJECT,
} from "@/components/mock/hero-preview-content";

export function HeroEmailPreviewCard({ depth = 1 }: { depth?: AppPanelDepth }) {
  return (
    <MeetingCard
      depth={depth}
      title="Järelkiri"
      subtitle="Mustand · saatmiseks valmis"
      rightMeta={
        <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-foreground/80">
          Eelvaade
        </span>
      }
    >
      <div className="rounded-lg border border-white/[0.08] bg-black/45">
        <div className="border-b border-white/[0.07] bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            Pealkiri
          </p>
          <p className="mt-1 font-mono text-[12px] text-white/78">
            {HERO_EMAIL_SUBJECT}
          </p>
        </div>
        <div className="p-3">
          <p className="whitespace-pre-line text-[13px] leading-[1.65] text-white/[0.78]">
            {HERO_EMAIL_BODY}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-white/45">
        Kopeeri oma postiklienti; vastutajad ja kuupäevad jäävad kokkuvõttega
        kooskõlla.
      </p>
    </MeetingCard>
  );
}
