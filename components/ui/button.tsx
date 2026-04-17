import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex touch-manipulation items-center justify-center gap-2 rounded-full font-medium tracking-tight transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.32)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.99]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--fg)] text-white shadow-float hover:bg-[var(--fg-hover)] hover:shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_14px_40px_-10px_rgba(79,70,229,0.22)]",
  secondary:
    "border border-[var(--border-strong)] bg-white text-[var(--fg)] shadow-soft-sm hover:border-[color-mix(in_srgb,var(--border-strong)_70%,rgb(var(--accent)))] hover:bg-[color-mix(in_srgb,white_96%,var(--surface-muted))] hover:shadow-soft-md",
  ghost:
    "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--fg)] hover:bg-[rgb(var(--accent)/0.06)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 min-w-[2.5rem] px-4 text-[13px]",
  md: "min-h-11 min-w-[2.75rem] px-5 text-[13px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  ...rest
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
} & React.ComponentPropsWithoutRef<"button">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        className={classes}
        href={href}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={type ?? "button"}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
}
