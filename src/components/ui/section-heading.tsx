import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-white/60">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl",
          isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-pretty text-sm leading-7 text-white/65 sm:text-base",
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

