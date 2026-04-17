import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex touch-manipulation items-center justify-center gap-2 rounded-full font-medium tracking-tight transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-cyan)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.99]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-[rgb(124,92,255)] via-[rgb(99,102,241)] to-[rgb(79,70,229)] text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_14px_40px_-8px_rgb(124,92,255/0.45)] hover:brightness-[1.06] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_18px_48px_-6px_rgb(124,92,255/0.5)]",
  secondary:
    "border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] text-[var(--fg)] shadow-soft-sm backdrop-blur-sm hover:border-[rgb(var(--accent)/0.35)] hover:bg-[color-mix(in_srgb,var(--surface-raised)_88%,transparent)] hover:shadow-[0_0_24px_-4px_rgb(var(--accent)/0.25)]",
  ghost:
    "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--fg)] hover:bg-[rgb(var(--accent)/0.1)]",
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
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
} & ComponentPropsWithoutRef<"button">) {
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
