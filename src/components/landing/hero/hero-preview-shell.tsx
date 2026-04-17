import { Card } from "@/components/ui/card";

export function HeroPreviewShell({
  title,
  subtitle,
  rightMeta,
  children,
}: {
  title: string;
  subtitle: string;
  rightMeta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/14" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div>
            <p className="text-xs font-medium text-white/80">{title}</p>
            <p className="text-[11px] text-white/45">{subtitle}</p>
          </div>
        </div>
        {rightMeta ? <div className="text-[11px] text-white/60">{rightMeta}</div> : null}
      </div>

      <div className="p-4 sm:p-5">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
    </Card>
  );
}

