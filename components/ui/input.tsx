import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-[var(--border-strong)] bg-white px-4 text-[15px] text-[var(--fg)] shadow-[inset_0_1px_1px_rgba(15,23,42,0.03)] outline-none transition placeholder:text-[var(--foreground-subtle)]",
        "hover:border-[color-mix(in_srgb,var(--border-strong)_85%,rgb(var(--accent)))] hover:shadow-[inset_0_1px_1px_rgba(15,23,42,0.02)]",
        "focus:border-[rgb(var(--accent)/0.38)] focus:shadow-[inset_0_1px_1px_rgba(15,23,42,0.02),0_0_0_3px_rgb(var(--accent)/0.1)]",
        className,
      )}
      {...props}
    />
  );
}
