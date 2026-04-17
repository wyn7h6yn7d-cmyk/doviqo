import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const depthStyles = {
  /** Back / satellite panels */
  1: "shadow-[0_20px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] ring-white/[0.08]",
  /** Mid stack */
  2: "shadow-[0_28px_95px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.065)] ring-white/[0.10]",
  /** Hero focal panel */
  3: "shadow-[0_36px_120px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)] ring-white/[0.12]",
} as const;

export type AppPanelDepth = keyof typeof depthStyles;

/** Fake app window chrome for hero mock panels — glass, layered, launch-site polish. */
export function MeetingCard({
  title,
  subtitle,
  rightMeta,
  children,
  className,
  depth = 2,
}: {
  title: string;
  subtitle: string;
  rightMeta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Layered shadow & ring: 1 = back, 2 = mid, 3 = front focal */
  depth?: AppPanelDepth;
}) {
  return (
    <Card
      outerClassName="relative"
      className={cn(
        "relative overflow-hidden backdrop-blur-xl",
        depthStyles[depth],
        "ring-1",
        "hover:!translate-y-0 hover:border-white/[0.10] hover:bg-white/[0.035]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.09] bg-black/35 px-4 py-3 sm:px-4 sm:py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/[0.22]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.14]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.09]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium tracking-tight text-white/88">
              {title}
            </p>
            <p className="truncate text-[11px] text-white/48">{subtitle}</p>
          </div>
        </div>
        {rightMeta ? (
          <div className="shrink-0 pl-2 text-[11px] text-white/58">{rightMeta}</div>
        ) : null}
      </div>

      <div className="relative p-4 sm:p-5">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
    </Card>
  );
}
