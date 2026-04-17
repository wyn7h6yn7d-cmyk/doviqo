import { cn } from "@/lib/utils";

/** Slack-thread styling for recap text (product preview). */
export function SlackRecapCard({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#1a1d21] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <span className="rounded bg-[#611f69] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
          # toode
        </span>
        <span className="text-[11px] text-white/45">Doviqo · kokkuvõte</span>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/78">
        {text}
      </p>
    </div>
  );
}
