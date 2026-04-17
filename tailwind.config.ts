import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        surface: "var(--surface)",
        "muted-foreground": "var(--foreground-muted)",
        border: "var(--border)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
        },
      },
      boxShadow: {
        "soft-lg":
          "0 24px 64px rgba(15, 23, 42, 0.042), 0 2px 0 rgba(255,255,255,0.94) inset",
        "soft-md":
          "0 12px 36px rgba(15, 23, 42, 0.034), 0 1px 0 rgba(255,255,255,0.97) inset",
        "soft-sm":
          "0 2px 12px rgba(15, 23, 42, 0.028), 0 1px 0 rgba(255,255,255,0.98) inset",
        "layer-light":
          "0 1px 0 rgba(255,255,255,0.98) inset, 0 18px 48px rgba(15, 23, 42, 0.038)",
        "float":
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 28px rgba(15, 23, 42, 0.032), 0 1px 3px rgba(15, 23, 42, 0.02)",
        "card":
          "var(--shadow-card)",
        "glow-accent":
          "0 0 0 1px rgba(255,255,255,0.65) inset, 0 1px 2px rgba(15,23,42,0.03), 0 20px 50px -18px rgba(79, 70, 229, 0.09)",
        "ring-accent":
          "0 0 0 1px rgba(15, 23, 42, 0.05), 0 0 0 4px rgb(var(--accent) / 0.07)",
      },
      backgroundImage: {
        sheen: [
          "radial-gradient(900px 480px at 12% 0%, var(--sheen-a), transparent 58%)",
          "radial-gradient(700px 420px at 88% 20%, var(--sheen-b), transparent 60%)",
          "radial-gradient(600px 400px at 50% 100%, rgba(255,255,255,0.55), transparent 55%)",
        ].join(", "),
        "surface-sheen":
          "radial-gradient(480px 260px at 20% 0%, rgb(var(--accent) / 0.05), transparent 58%), radial-gradient(400px 220px at 90% 30%, rgba(148, 163, 184, 0.06), transparent 58%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
