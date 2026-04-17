import { cn } from "@/lib/utils";

/** Kerge pind — hele teema, kerge klaas. */
export function Card({
  className,
  outerClassName,
  children,
}: {
  className?: string;
  outerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", outerClassName)}>
      <div
        className={cn(
          "relative rounded-2xl border border-[var(--border)] bg-white/95 shadow-float backdrop-blur-sm",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[var(--border)]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-surface-sheen opacity-80" />
        {children}
      </div>
    </div>
  );
}
