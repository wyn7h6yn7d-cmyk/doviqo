"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { DURATION, EASE_PREMIUM } from "@/lib/constants";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={
        reduce
          ? undefined
          : { duration: DURATION.reveal, ease: EASE_PREMIUM, delay }
      }
    >
      {children}
    </motion.div>
  );
}
