import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/ui/panel-header";
import { Avatar } from "@/components/ui/avatar";
import type { Meeting } from "@/lib/constants";
import { MeetingCard } from "@/components/mock/meeting-card";
import type { AppPanelDepth } from "@/components/mock/meeting-card";
import { HERO_ACTION_ITEMS } from "@/components/mock/hero-preview-content";

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-white/30" />;
}

function tegevusteLoend(n: number) {
  if (n === 1) return "1 tegevus";
  return `${n} tegevust`;
}

/** Hero — primary execution surface (focal panel). */
export function HeroActionItemsCard({ depth = 3 }: { depth?: AppPanelDepth }) {
  return (
    <MeetingCard
      depth={depth}
      title="Tegevused"
      subtitle="Vastutajad · tähtajad · staatus"
      rightMeta={
        <span className="inline-flex max-w-[11rem] items-center gap-1.5 truncate rounded-full border border-white/[0.1] bg-white/[0.06] px-2 py-1 text-[11px] text-white/65">
          <Dot />
          <span className="truncate">Nädala sünk · märkmed</span>
        </span>
      }
    >
      <p className="text-[11px] leading-relaxed text-white/52">
        Iga rida seob vastutaja tähtajaga — sama üleskirjutuse põhjal kui
        kokkuvõte.
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.09] bg-black/45">
        <div className="grid grid-cols-[1fr_72px_64px_76px] gap-1.5 border-b border-white/[0.08] bg-white/[0.025] px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/38 sm:grid-cols-[1fr_80px_68px_80px] sm:px-3">
          <span>Tegevus</span>
          <span>Vastutaja</span>
          <span>Tähtaeg</span>
          <span className="text-right">Staatus</span>
        </div>
        <div className="divide-y divide-white/[0.07]">
          {HERO_ACTION_ITEMS.map((r) => (
            <div
              key={r.task}
              className="grid grid-cols-[1fr_72px_64px_76px] gap-1.5 px-2.5 py-2.5 sm:grid-cols-[1fr_80px_68px_80px] sm:px-3"
            >
              <p className="text-[13px] leading-snug text-white/[0.88]">{r.task}</p>
              <div className="flex items-center">
                <span className="rounded-full bg-white/[0.1] px-1.5 py-0.5 text-[11px] font-medium text-white/75">
                  {r.owner}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-[11px] tabular-nums text-white/58">
                  {r.due}
                </span>
              </div>
              <div className="flex items-center justify-end">
                <span className="rounded-full border border-white/[0.1] bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-white/55">
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-white/48">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-accent/60" />
          3 vastutajat · 3 tähtaega · 0 määramata
        </span>
      </div>
    </MeetingCard>
  );
}

/** Product section — data-driven. */
export function ProductActionItemsCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card className="p-5 sm:p-6">
      <PanelHeader
        title="Eraldatud tegevused"
        meta={tegevusteLoend(meeting.actionItems.length)}
      />
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <div className="grid grid-cols-[1fr_120px_72px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
          <span>Tegevus</span>
          <span>Vastutaja</span>
          <span>Tähtaeg</span>
        </div>
        <div className="divide-y divide-white/10">
          {meeting.actionItems.map((x) => (
            <div
              key={x.text}
              className="grid grid-cols-[1fr_120px_72px] gap-2 px-3 py-2"
            >
              <div>
                <p className="text-sm leading-6 text-white/84">{x.text}</p>
                <p className="mt-1 text-[11px] text-white/45">
                  Staatus: {x.status}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar name={x.owner} />
                <span className="text-[11px] text-white/65">
                  {x.owner.split(" ")[0]}
                </span>
              </div>
              <div className="flex items-center">
                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
                  {x.due}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
