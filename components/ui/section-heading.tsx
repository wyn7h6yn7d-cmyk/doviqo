import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingId,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.22em] uppercase text-white/62 backdrop-blur",
            isCenter ? "mx-auto" : "",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          {eyebrow}
        </div>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          "mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-4xl",
          isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-pretty text-sm leading-7 text-white/62 sm:text-[15px] sm:leading-7",
            isCenter ? "mx-auto max-w-2xl" : "max-w-[56ch]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
