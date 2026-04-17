import Link from "next/link";

import { footer } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(10,12,18,0.92)_0%,var(--bg-deep)_100%)] py-11 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgb(var(--accent)/0.25)] before:to-transparent sm:py-14"
      role="contentinfo"
    >
      <SectionContainer className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
        <p className="max-w-md text-center text-[13px] leading-relaxed text-[var(--foreground-muted)] sm:text-left">
          {footer.tagline}
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-end"
          aria-label={footer.navLabel}
        >
          <Link
            href="/studio"
            className="text-[13px] font-medium text-[rgb(var(--accent-bright))] transition hover:text-[rgb(var(--accent-cyan))]"
          >
            {footer.studioLink}
          </Link>
          <Link
            href="/#waitlist"
            className="text-[13px] font-medium text-[var(--foreground-muted)] transition hover:text-[var(--fg)]"
          >
            {footer.waitlistLink}
          </Link>
        </nav>
      </SectionContainer>
    </footer>
  );
}
