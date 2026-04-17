import Link from "next/link";

import { footer } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--surface-muted))] py-11 sm:py-14"
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
            className="text-[13px] font-medium text-indigo-600 transition hover:text-indigo-800"
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
