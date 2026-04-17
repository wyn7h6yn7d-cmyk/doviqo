import { HeroPreviewShell } from "@/components/landing/hero/hero-preview-shell";

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-white/30" />;
}

export function HeroActionItemsPanel() {
  const rows = [
    {
      t: "Finalize onboarding checklist and share for review",
      owner: "Nina",
      due: "Fri",
      status: "Ready",
    },
    {
      t: "Confirm rollout date with Support and update timeline",
      owner: "Sam",
      due: "Thu",
      status: "In progress",
    },
    {
      t: "Send recap to #product and tag owners",
      owner: "You",
      due: "Today",
      status: "Draft",
    },
  ];

  return (
    <HeroPreviewShell
      title="Doviqo"
      subtitle="Sprint kickoff — extracted next steps"
      rightMeta={
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
          <Dot />
          Owners confirmed
        </span>
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
            Action items
          </span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
            Follow-ups
          </span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/40">
            Decisions
          </span>
        </div>
        <span className="text-[11px] text-white/50">3 items</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <div className="grid grid-cols-[1fr_86px_64px_88px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
          <span>Item</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-white/10">
          {rows.map((r) => (
            <div
              key={r.t}
              className="grid grid-cols-[1fr_86px_64px_88px] gap-2 px-3 py-2"
            >
              <p className="text-sm text-white/80 leading-6">{r.t}</p>
              <div className="flex items-center">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/65">
                  {r.owner}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-[11px] text-white/60">{r.due}</span>
              </div>
              <div className="flex items-center justify-end">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/60">
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
        <span className="inline-flex items-center gap-2">
          <Dot />
          Unassigned: 0
        </span>
        <span className="inline-flex items-center gap-2">
          <Dot />
          Deadlines: explicit
        </span>
      </div>
    </HeroPreviewShell>
  );
}

export function HeroFollowUpPanel() {
  return (
    <HeroPreviewShell
      title="Follow-up"
      subtitle="Generated draft — ready to send"
      rightMeta={
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
          Ready
        </span>
      }
    >
      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[11px] font-medium text-white/65">Email draft</p>
        <p className="mt-2 text-sm leading-7 text-white/78">
          “Thanks for the sync. Next steps: Nina will share the onboarding
          checklist by Friday, Sam will confirm the rollout date by Thursday, and
          I’ll post the recap to #product today.”
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Clear owners
        </span>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Crisp deadlines
        </span>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Copy-ready
        </span>
      </div>
    </HeroPreviewShell>
  );
}

export function HeroOwnersPanel() {
  return (
    <HeroPreviewShell title="Owners" subtitle="Accountability snapshot" rightMeta="This week">
      <div className="grid grid-cols-3 gap-3">
        {[
          { who: "Nina", count: "2 items", due: "Fri" },
          { who: "Sam", count: "1 item", due: "Thu" },
          { who: "You", count: "1 draft", due: "Today" },
        ].map((x) => (
          <div
            key={x.who}
            className="rounded-xl border border-white/10 bg-black/30 p-3"
          >
            <p className="text-sm font-medium text-white/80">{x.who}</p>
            <p className="mt-2 text-[11px] text-white/55">{x.count}</p>
            <p className="mt-1 text-[11px] text-white/45">Next due: {x.due}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-white/50">
        Owners are explicit — nothing ships “unowned.”
      </div>
    </HeroPreviewShell>
  );
}

