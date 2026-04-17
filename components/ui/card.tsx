import { cn } from "@/lib/utils";

/** Kerge pind — ilma agressiivse hover’ita (launch-tase, mitte template). */
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
          "relative rounded-2xl border border-white/[0.09] bg-white/[0.03] shadow-layer-1 backdrop-blur-md",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/[0.04]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(380px_200px_at_20%_0%,rgba(255,255,255,0.05),transparent_58%)] opacity-70" />
        {children}
      </div>
    </div>
  );
}
