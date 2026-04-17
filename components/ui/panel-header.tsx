import { cn } from "@/lib/utils";

export function PanelHeader({
  title,
  meta,
  className,
}: {
  title: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <p className="text-xs font-medium text-white/70">{title}</p>
      {meta ? (
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/55">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
