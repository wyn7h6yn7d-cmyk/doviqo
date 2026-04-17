import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/ui/panel-header";
import { Avatar } from "@/components/ui/avatar";
import type { Meeting } from "@/lib/constants";
import { MeetingCard } from "@/components/mock/meeting-card";
import type { AppPanelDepth } from "@/components/mock/meeting-card";
import { HERO_ACTION_ITEMS } from "@/components/mock/hero-preview-content";

const rows = HERO_ACTION_ITEMS.map((r) => ({
  line: `${r.owner} — ${r.task.toLowerCase()} — ${r.due}`,
  owner: r.owner,
  due: r.due,
}));

/** Hero — owners mapped to deadlines (accountability rail). */
export function HeroOwnersDeadlinesCard({ depth = 2 }: { depth?: AppPanelDepth }) {
  return (
    <MeetingCard
      depth={depth}
      title="Vastutajad ja tähtajad"
      subtitle="Kes mida teeb · millal"
      rightMeta={
        <span className="text-[11px] text-white/48">See nädal</span>
      }
    >
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.line}
            className="rounded-lg border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-black/30 px-3 py-2.5"
          >
            <p className="text-[12px] leading-snug text-white/[0.85]">{r.line}</p>
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
              <span>{r.owner}</span>
              <span className="tabular-nums text-white/50">Tähtaeg {r.due}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] leading-relaxed text-white/48">
        Selge vastutus — et järeltegevus ei hüppaks koosolekult koosolekule.
      </p>
    </MeetingCard>
  );
}

export function ProductOwnersCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card className="p-5 sm:p-6">
      <PanelHeader title="Määratud vastutajad" meta="0 määramata" />
      <div className="mt-4 grid gap-3">
        {meeting.owners.map((o) => (
          <div
            key={o.name}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-3"
          >
            <Avatar name={o.name} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/80">{o.name}</p>
              <p className="mt-1 text-[11px] text-white/55">{o.focus}</p>
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
              Tähtaeg {o.due}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
