import { StudioApp } from "@/components/studio/studio-app";

/**
 * Täisekraani tootedemo — ilma turundusliku päise/jaluseta,
 * et tunduks eraldi rakendus, mitte lehe sektsioon.
 */
export default function StudioPage() {
  return (
    <div className="bg-page-studio min-h-screen text-foreground">
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <StudioApp />
      </main>
    </div>
  );
}
