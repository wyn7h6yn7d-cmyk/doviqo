"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { nav } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";

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

const marketingAnchors = [
  { href: "/#product", label: "Tõestus" },
  { href: "/#how", label: "Kuidas töötab" },
  { href: "/#benefits", label: "Kasu" },
] as const;

export function Navbar({ variant = "marketing" }: { variant?: "marketing" | "studio" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const shell = useMemo(
    () =>
      cn(
        "sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-[var(--border)] bg-white/92 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_8px_32px_-12px_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "border-transparent bg-[color-mix(in_srgb,var(--bg)_88%,white)]/90 backdrop-blur-md",
      ),
    [scrolled],
  );

  const waitlistHref = "/#waitlist";

  return (
    <header className={shell}>
      <SectionContainer className="flex h-14 items-center justify-between gap-4 sm:h-[3.5rem]">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-[15px] font-semibold tracking-[-0.02em] text-[var(--fg)] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.3)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          aria-label={nav.homeAria}
        >
          {nav.brand}
          {variant === "studio" ? (
            <span className="text-[12px] font-medium tracking-tight text-[var(--foreground-subtle)]">
              Studio
            </span>
          ) : null}
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex md:gap-6"
          aria-label={nav.navAria}
        >
          {variant === "marketing" ? (
            <>
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="min-h-11 rounded-md px-1 py-2 text-[13px] font-medium text-[var(--foreground-muted)] transition hover:text-[var(--fg)]"
                >
                  {l.label}
                </a>
              ))}
            </>
          ) : (
            <>
              <Link
                href="/"
                className="min-h-11 rounded-md px-1 py-2 text-[13px] font-medium text-[var(--foreground-muted)] transition hover:text-[var(--fg)]"
              >
                Avaleht
              </Link>
              {marketingAnchors.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="min-h-11 rounded-md px-1 py-2 text-[13px] font-medium text-[var(--foreground-muted)] transition hover:text-[var(--fg)]"
                >
                  {l.label}
                </a>
              ))}
              <span className="text-[13px] font-medium text-[var(--fg)]">
                Studio
              </span>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            href={waitlistHref}
            className="hidden min-h-11 touch-manipulation sm:inline-flex"
          >
            {nav.cta}
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-xl border border-[var(--border-strong)] bg-white/90 text-[var(--fg)] shadow-soft-sm transition hover:bg-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </SectionContainer>

      <div
        id="mobile-nav"
        role="navigation"
        aria-label={nav.navAria}
        className={cn(
          "border-t border-[var(--border)] bg-white/95 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <SectionContainer className="flex flex-col py-3">
          {variant === "marketing" ? (
            nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="min-h-12 rounded-lg px-3 py-3 text-[15px] font-medium text-[var(--foreground-muted)] hover:bg-[color-mix(in_srgb,var(--surface-muted)_70%,white)] hover:text-[var(--fg)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))
          ) : (
            <>
              <Link
                href="/"
                className="min-h-12 rounded-lg px-3 py-3 text-[15px] font-medium text-[var(--foreground-muted)] hover:bg-[color-mix(in_srgb,var(--surface-muted)_70%,white)] hover:text-[var(--fg)]"
                onClick={() => setOpen(false)}
              >
                Avaleht
              </Link>
              {marketingAnchors.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="min-h-12 rounded-lg px-3 py-3 text-[15px] font-medium text-[var(--foreground-muted)] hover:bg-[color-mix(in_srgb,var(--surface-muted)_70%,white)] hover:text-[var(--fg)]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <span className="min-h-12 px-3 py-3 text-[15px] font-medium text-[var(--fg)]">
                Studio
              </span>
            </>
          )}
          <div className="mt-2 px-3" onClick={() => setOpen(false)}>
            <Button href={waitlistHref} className="w-full">
              {nav.cta}
            </Button>
          </div>
        </SectionContainer>
      </div>
    </header>
  );
}
