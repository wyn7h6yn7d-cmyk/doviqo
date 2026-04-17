import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-white/92 shadow-[0_10px_30px_rgba(0,0,0,0.40)] active:translate-y-[1px]",
  secondary:
    "bg-white/8 text-white hover:bg-white/12 ring-1 ring-white/14 backdrop-blur active:translate-y-[1px]",
  ghost:
    "bg-transparent text-white/80 hover:text-white hover:bg-white/6 active:translate-y-[1px]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type,
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
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} {...rest}>
      {children}
    </button>
  );
}

