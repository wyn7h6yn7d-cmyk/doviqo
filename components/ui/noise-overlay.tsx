import { cn } from "@/lib/utils";

export function NoiseOverlay({ className }: { className?: string }) {
  return <div className={cn("noise", className)} aria-hidden />;
}
