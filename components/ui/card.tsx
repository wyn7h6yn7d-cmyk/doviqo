import { cn } from "@/lib/utils";

/** Kõrgetasemeline tumeda teema kaart — klaas, servasära, ei „valge plokk“. */
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
          "glass-panel edge-lit relative rounded-2xl text-[var(--fg)]",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[rgb(var(--accent)/0.1)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-surface-sheen opacity-90" />
        {children}
      </div>
    </div>
  );
}
