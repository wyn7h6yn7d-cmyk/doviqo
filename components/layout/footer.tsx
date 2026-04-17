import { footer } from "@/lib/site-content";
import { SectionContainer } from "@/components/layout/section-container";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-10">
      <SectionContainer>
        <p className="text-center text-[13px] leading-relaxed text-white/45 sm:text-left">
          {footer.tagline}
        </p>
      </SectionContainer>
    </footer>
  );
}
