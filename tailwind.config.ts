import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand neutrals tuned for "dark luxury tech"
        ink: {
          950: "#05070B",
          900: "#080B12",
          850: "#0B0F18",
          800: "#0E1420",
        },
      },
      boxShadow: {
        // Subtle, premium elevation for dark UI
        "soft-lg":
          "0 25px 80px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.03) inset",
        "soft-md":
          "0 18px 55px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03) inset",
        // Cleaner “layered” elevation for premium surfaces
        "layer-1":
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 18px 60px rgba(0,0,0,0.55)",
        "layer-2":
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 28px 90px rgba(0,0,0,0.60)",
        "ring-soft":
          "0 0 0 1px rgba(255,255,255,0.12), 0 0 0 6px rgba(160,170,255,0.06)",
      },
      backgroundImage: {
        // Minimal “expensive” sheen, not a loud gradient.
        sheen:
          "radial-gradient(1200px 600px at 20% 0%, rgba(160, 170, 255, 0.10), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(255, 255, 255, 0.06), transparent 55%), radial-gradient(700px 500px at 50% 100%, rgba(120, 255, 220, 0.06), transparent 60%)",
        // Localized highlight used sparingly on cards/hero
        "surface-sheen":
          "radial-gradient(500px 280px at 20% 10%, rgba(160,170,255,0.10), transparent 55%), radial-gradient(420px 260px at 90% 30%, rgba(120,255,220,0.06), transparent 55%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

