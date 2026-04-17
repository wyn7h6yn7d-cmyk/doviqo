import { cn } from "@/lib/utils";

/** Eyebrow / label chip (non-interactive). */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.22em] uppercase text-white/62 backdrop-blur",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
      {children}
    </span>
  );
}

/** Selectable scenario chip (product preview). */
export function Chip({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition duration-300 ease-out",
        active
          ? "border-white/18 bg-white/[0.10] text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-white/70" : "bg-white/30",
        )}
      />
      {children}
    </button>
  );
}
