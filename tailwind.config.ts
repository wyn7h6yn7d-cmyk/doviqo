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
        ink: {
          950: "#09090b",
          900: "#111115",
          850: "#0e0e12",
          800: "#141418",
        },
      },
      boxShadow: {
        "soft-lg":
          "0 25px 80px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.03) inset",
        "soft-md":
          "0 18px 55px rgba(0,0,0,0.42), 0 1px 0 rgba(255,255,255,0.03) inset",
        "layer-1":
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 18px 60px rgba(0,0,0,0.5)",
        "layer-2":
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 28px 90px rgba(0,0,0,0.55)",
        "ring-soft":
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 0 6px rgb(var(--accent) / 0.07)",
      },
      backgroundImage: {
        sheen: [
          "radial-gradient(1200px 600px at 18% 0%, var(--sheen-a), transparent 56%)",
          "radial-gradient(900px 520px at 82% 18%, var(--sheen-b), transparent 58%)",
          "radial-gradient(720px 480px at 50% 100%, var(--sheen-c), transparent 62%)",
        ].join(", "),
        "surface-sheen":
          "radial-gradient(500px 280px at 20% 10%, rgb(var(--accent) / 0.09), transparent 56%), radial-gradient(420px 260px at 90% 28%, rgb(var(--accent) / 0.05), transparent 58%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
