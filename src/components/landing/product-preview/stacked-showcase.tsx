import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/landing/ui/panel-header";
import { Avatar } from "@/components/landing/ui/avatar";
import type { Meeting } from "@/components/landing/product-preview/data";

export function StackedShowcase({ meeting }: { meeting: Meeting }) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:hidden">
      <Card className="p-5 sm:p-6">
        <PanelHeader
          title="Extracted action items"
          meta={`${meeting.actionItems.length} items`}
        />
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <div className="grid grid-cols-[1fr_120px_72px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
            <span>Action</span>
            <span>Owner</span>
            <span>Due</span>
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
                    Status: {x.status}
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

      <Card className="p-5 sm:p-6">
        <PanelHeader title="Assigned owners" meta="0 unassigned" />
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
                Due {o.due}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <PanelHeader title="Recap + deadlines" meta="Copy-ready" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-[11px] font-medium text-white/65">Summary</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/78">
              {meeting.recap}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-[11px] font-medium text-white/65">Follow-up cue</p>
            <p className="mt-2 text-sm leading-7 text-white/78">
              Drafted with owners and deadlines embedded — so “what happens next”
              is explicit.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <PanelHeader title="Generated follow-up email" meta="Ready" />
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="whitespace-pre-line text-sm leading-7 text-white/78">
            {meeting.followUp}
          </p>
        </div>
        <p className="mt-4 text-xs text-white/55">
          Review, send, and keep work moving between meetings.
        </p>
      </Card>
    </div>
  );
}

