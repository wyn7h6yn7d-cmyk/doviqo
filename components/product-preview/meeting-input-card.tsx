import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/ui/panel-header";
import type { Meeting } from "@/lib/constants";

export function MeetingInputCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card className="p-5 sm:p-6">
      <PanelHeader
        title="Koosoleku sisend"
        meta={`${meeting.source} → tulemused`}
      />
      <div className="mt-4 space-y-3">
        <p className="text-sm font-medium tracking-tight text-white/88">
          {meeting.title}
        </p>
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="text-[11px] text-white/55">Märkmed või üleskirjutus</p>
          <p className="mt-2 text-sm leading-7 text-white/75">{meeting.snippet}</p>
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            Vaata üle enne saatmist
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
            Vastutajad kohustuslikud
          </span>
        </div>
      </div>
    </Card>
  );
}
