"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";

const links = [
  { href: "#product", label: "Toode" },
  { href: "#how", label: "Kuidas see töötab" },
  { href: "#why", label: "Miks Doviqo" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M5 8h14M5 12h14M5 16h14" />
      )}
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const shell = useMemo(
    () =>
      cn(
        "sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
        scrolled
          ? "border-border bg-background/72 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      ),
    [scrolled],
  );

  return (
    <header className={shell}>
      <SectionContainer className="flex h-14 items-center justify-between gap-4 sm:h-[3.75rem]">
        <a
          href="#top"
          className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Doviqo avaleht"
        >
          Doviqo
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Peamine navigeerimine"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium tracking-tight text-muted-foreground transition duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Button
            size="sm"
            href="#cta"
            className="md:inline-flex"
          >
            Varajane ligipääs
          </Button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/90 bg-surface/40 text-foreground transition hover:bg-surface/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Sulge menüü" : "Ava menüü"}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </SectionContainer>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border/60 bg-background/85 backdrop-blur-xl md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <SectionContainer className="flex flex-col gap-0.5 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-muted-foreground transition hover:bg-surface/60 hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </SectionContainer>
      </div>
    </header>
  );
}
