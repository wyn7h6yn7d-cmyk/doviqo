export function Glow({ className }: { className?: string }) {
  return (
    <div className={className ?? "glow-layer"} aria-hidden />
  );
}
