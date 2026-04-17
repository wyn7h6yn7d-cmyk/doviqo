import { cn } from "@/lib/utils";

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
    <div className={cn("group relative", outerClassName)}>
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition duration-500 ease-out",
          "bg-surface-sheen",
          "group-hover:opacity-100",
        )}
      />
      <div
        className={cn(
          "relative rounded-2xl border border-white/10 bg-white/[0.035] shadow-layer-1 backdrop-blur-md",
          "transition duration-300 ease-out will-change-transform",
          "hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/[0.05] hover:shadow-layer-2",
          "focus-within:shadow-ring-soft",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/[0.04]" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(420px_240px_at_18%_12%,rgba(255,255,255,0.06),transparent_60%)] opacity-60" />
        {children}
      </div>
    </div>
  );
}
