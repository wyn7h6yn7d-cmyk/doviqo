"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { scrollToTopAria } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 400;

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 18.5V5.5M12 5.5L6 11.5M12 5.5l6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Fikseeritud „tagasi üles“ — ilmub pärast kerimist, tumeda klaasi ja servasäbraga.
 */
export function ScrollToTop() {
  const reduceMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        setVisible(window.scrollY > SHOW_AFTER_PX);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 right-0 z-[55] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pl-8 pt-8 sm:bottom-2 sm:right-2 sm:p-6",
        visible ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!visible}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 14,
        scale: visible ? 1 : 0.96,
      }}
      transition={{
        duration: reduceMotion ? 0.12 : DURATION.cta * 0.85,
        ease: EASE_PREMIUM,
      }}
    >
      <button
        type="button"
        onClick={scrollTop}
        tabIndex={visible ? 0 : -1}
        aria-label={scrollToTopAria}
        className={cn(
          "group relative flex h-11 w-11 touch-manipulation items-center justify-center overflow-hidden rounded-full",
          "border border-[var(--border-hairline)] bg-[linear-gradient(155deg,rgba(26,30,42,0.94)_0%,rgba(14,17,24,0.9)_100%)]",
          "text-[rgb(var(--accent-bright))] shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_8px_32px_-8px_rgba(0,0,0,0.55),0_0_40px_-14px_rgb(var(--accent)/0.38)]",
          "backdrop-blur-md transition-[color,box-shadow,transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:border-[rgb(var(--accent)/0.4)] hover:text-[rgb(var(--accent-cyan))] hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_14px_44px_-10px_rgba(0,0,0,0.55),0_0_52px_-6px_rgb(var(--accent-cyan)/0.35)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-cyan)/0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-deep)]",
          "active:scale-[0.97]",
          "sm:h-12 sm:w-12",
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-3 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-[rgb(var(--accent-cyan)/0.4)] to-transparent opacity-90"
          aria-hidden
        />
        <ArrowUpIcon className="relative h-[21px] w-[21px] transition-colors duration-300 group-hover:text-[var(--fg)] sm:h-[22px] sm:w-[22px]" />
      </button>
    </motion.div>
  );
}
