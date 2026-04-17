"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { DURATION, EASE_PREMIUM } from "@/lib/constants";

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-72px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={cn(className)}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 6 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: DURATION.staggerChild,
                  ease: EASE_PREMIUM,
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
