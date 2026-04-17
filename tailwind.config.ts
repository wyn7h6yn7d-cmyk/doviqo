import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
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
        cyan: {
          accent: "rgb(var(--accent-cyan) / <alpha-value>)",
        },
      },
      boxShadow: {
        "soft-lg":
          "0 24px 64px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
        "soft-md":
          "0 12px 36px rgba(0, 0, 0, 0.38), 0 1px 0 rgba(255,255,255,0.05) inset",
        "soft-sm":
          "0 2px 12px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255,255,255,0.04) inset",
        "layer-dark":
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px -12px rgba(0,0,0,0.55)",
        float:
          "0 1px 0 rgba(255,255,255,0.08) inset, 0 18px 48px rgba(0,0,0,0.45), 0 0 40px -12px rgb(var(--accent) / 0.2)",
        card: "var(--shadow-card)",
        "glow-accent":
          "0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 60px -15px rgb(var(--accent) / 0.35), 0 20px 50px -18px rgba(0,0,0,0.5)",
        "glow-cyan":
          "0 0 0 1px rgba(34,211,238,0.12) inset, 0 0 48px -12px rgb(var(--accent-cyan) / 0.35)",
        "ring-accent":
          "0 0 0 1px rgba(255,255,255,0.06), 0 0 0 4px rgb(var(--accent) / 0.15)",
      },
      backgroundImage: {
        sheen: [
          "radial-gradient(900px 480px at 12% 0%, var(--sheen-a), transparent 58%)",
          "radial-gradient(700px 420px at 88% 20%, var(--sheen-b), transparent 60%)",
          "radial-gradient(600px 400px at 50% 100%, rgb(var(--accent) / 0.06), transparent 55%)",
        ].join(", "),
        "surface-sheen":
          "radial-gradient(480px 260px at 20% 0%, rgb(var(--accent) / 0.12), transparent 58%), radial-gradient(400px 220px at 90% 30%, rgb(var(--accent-cyan) / 0.08), transparent 58%)",
        "btn-primary":
          "linear-gradient(135deg, rgb(124 92 255) 0%, rgb(99 102 241) 45%, rgb(79 70 229) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
