import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium tracking-tight text-white/80">
          Doviqo
        </p>
        <p className="text-xs text-white/45">
          Doviqo — turn conversations into clear next steps.
        </p>
      </Container>
    </footer>
  );
}

