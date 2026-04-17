import { cn } from "@/lib/utils";

/** Subtle perspective grid — use behind hero or section chrome. */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.055]",
        "[background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]",
        "[background-size:56px_56px]",
        className,
      )}
      aria-hidden
    />
  );
}
