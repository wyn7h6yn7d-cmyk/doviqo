import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-black/35 px-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-white/20 focus:ring-2 focus:ring-white/10",
        className,
      )}
      {...props}
    />
  );
}
