import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-soft-md backdrop-blur-md transition will-change-transform hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/[0.055]",
        className,
      )}
    >
      {children}
    </div>
  );
}

