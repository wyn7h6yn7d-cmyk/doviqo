"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const links = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why Doviqo" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = useMemo(
    () =>
      cn(
        "sticky top-0 z-50 border-b border-transparent",
        scrolled
          ? "border-white/10 bg-black/40 backdrop-blur-xl"
          : "bg-transparent",
      ),
    [scrolled],
  );

  return (
    <header className={navClass}>
      <Container className="h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-semibold tracking-tight text-white hover:text-white/90"
          aria-label="Doviqo home"
        >
          Doviqo
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/72 hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            href="#cta"
            className="hidden sm:inline-flex"
          >
            Get early access
          </Button>
          <Button
            variant="secondary"
            size="sm"
            href="#cta"
            className="sm:hidden"
          >
            Early access
          </Button>
        </div>
      </Container>
    </header>
  );
}

