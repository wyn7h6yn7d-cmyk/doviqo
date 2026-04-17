import { MeetingCard } from "@/components/mock/meeting-card";
import type { AppPanelDepth } from "@/components/mock/meeting-card";
import {
  HERO_DECISIONS,
  HERO_MEETING_TITLE,
} from "@/components/mock/hero-preview-content";

export function HeroMeetingSummaryCard({ depth = 2 }: { depth?: AppPanelDepth }) {
  return (
    <MeetingCard
      depth={depth}
      title="Koosoleku kokkuvõte"
      subtitle={HERO_MEETING_TITLE}
      rightMeta={
        <span className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[11px] tabular-nums text-white/55">
          3 otsust
        </span>
      }
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
        Otsused
      </p>
      <ul className="mt-2.5 space-y-2">
        {HERO_DECISIONS.map((d) => (
          <li
            key={d}
            className="flex gap-2.5 text-[13px] leading-snug text-white/[0.82]"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-white/35"
              aria-hidden
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-lg border border-white/[0.07] bg-gradient-to-r from-white/[0.04] via-transparent to-accent/[0.04] px-3 py-2.5">
        <p className="text-[11px] font-medium leading-relaxed text-white/55">
          Üleskirjutuse põhjal rühmitatud — et tiim näeks, mis kokku lepiti,
          enne kui keegi ülesandeid jagama hakkab.
        </p>
      </div>
    </MeetingCard>
  );
}
