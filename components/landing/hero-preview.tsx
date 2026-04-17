"use client";

import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { heroPreview } from "@/lib/site-content";
export function HeroPreview() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative w-full max-w-[440px] lg:max-w-none">
      <div className="absolute -inset-3 rounded-[28px] bg-[radial-gradient(120%_80%_at_50%_0%,rgb(var(--accent)/0.12),transparent_55%)] blur-xl" />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0d]/95 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.hero, ease: EASE_PREMIUM }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/[0.2]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
            Eelvaade
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
              {heroPreview.inputLabel}
            </p>
            <div className="mt-2 rounded-lg border border-white/[0.06] bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-white/55 sm:text-[12px]">
              {heroPreview.inputLines.map((line) => (
                <p key={line}>· {line}</p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              {heroPreview.bridge}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
              {heroPreview.actionsLabel}
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-white/[0.08] bg-black/40">
              {heroPreview.actions.map((a) => (
                <p
                  key={a.line}
                  className="border-t border-white/[0.05] px-3 py-2 text-[12px] leading-snug text-white/[0.82] first:border-t-0 first:pt-2"
                >
                  {a.line}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-accent/20 bg-accent/[0.06] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              {heroPreview.followUpLabel}
            </p>
            <p className="mt-2 whitespace-pre-line font-mono text-[11px] leading-relaxed text-white/70 sm:text-[12px]">
              {heroPreview.followUpLines.join("\n")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
