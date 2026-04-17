import { StudioApp } from "@/components/studio/studio-app";

/**
 * Täisekraani tootedemo — ilma turundusliku päise/jaluseta,
 * et tunduks eraldi rakendus, mitte lehe sektsioon.
 */
export default function StudioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <StudioApp />
      </main>
    </div>
  );
}
