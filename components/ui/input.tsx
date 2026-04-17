import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] px-4 text-[15px] text-[var(--fg)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] outline-none backdrop-blur-sm transition placeholder:text-[var(--foreground-subtle)]",
        "hover:border-[rgb(var(--accent)/0.35)] hover:bg-[color-mix(in_srgb,var(--surface-raised)_90%,transparent)]",
        "focus:border-[rgb(var(--accent-cyan)/0.45)] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_3px_rgb(var(--accent)/0.15)]",
        className,
      )}
      {...props}
    />
  );
}
