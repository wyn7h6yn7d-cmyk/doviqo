export function Avatar({ name }: { name: string }) {
  const initials = name
    .replace(/\(you\)/g, "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] text-white/75">
      {initials}
    </span>
  );
}

