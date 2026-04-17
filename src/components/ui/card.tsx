import { cn } from "@/lib/cn";

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
        {/* Inner hairline to make surfaces feel “machined” */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/[0.04]" />
        {children}
      </div>
    </div>
  );
}

