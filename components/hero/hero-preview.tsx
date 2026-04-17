"use client";

import { motion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import { HeroActionItemsCard } from "@/components/mock/action-items-card";
import { HeroEmailPreviewCard } from "@/components/mock/hero-email-preview-card";
import { HeroMeetingSummaryCard } from "@/components/mock/hero-meeting-summary-card";
import { HeroOwnersDeadlinesCard } from "@/components/mock/owners-card";

export function HeroPreview({ reduce }: { reduce: boolean }) {
  /** Subtle vertical drift only — no looping rotation (reads calmer, less “demo”). */
  const floatPrimary = reduce ? undefined : { y: [0, -2.5, 0] };

  const floatA = reduce ? undefined : { y: [0, 2, 0] };

  const floatB = reduce ? undefined : { y: [0, -2, 0] };

  const floatC = reduce ? undefined : { y: [0, 1.75, 0] };

  return (
    <figure
      className="relative mx-auto w-full max-w-[560px] pointer-events-none select-none md:max-w-none"
      aria-label="Kihiline eelvaade: koosoleku kokkuvõte, tegevused vastutajate ja tähtaegadega, vastutus ja järelkirja mustand"
    >
      <div
        className="pointer-events-none absolute -inset-14 -z-10 rounded-[48px] bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -inset-10 -z-10 rounded-[44px] bg-white/[0.03] blur-2xl"
        aria-hidden
      />

      {/* Mobile / tablet: narrative — context → execution → ownership → ship */}
      <div className="flex flex-col gap-4 sm:gap-5 lg:hidden">
        <HeroMeetingSummaryCard depth={2} />
        <HeroActionItemsCard depth={3} />
        <HeroOwnersDeadlinesCard depth={2} />
        <HeroEmailPreviewCard depth={1} />
      </div>

      {/* Desktop: four floating planes — focal action surface forward */}
      <div className="relative hidden min-h-[640px] w-full lg:block [perspective:1600px]">
        {/* Back plane — email (widest, anchors composition) */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-[1] w-[94%] max-w-[480px] -translate-x-1/2"
          animate={floatA}
          transition={
            reduce
              ? undefined
              : {
                  duration: 14,
                  ease: EASE_PREMIUM,
                  repeat: Infinity,
                  delay: 0.1,
                }
          }
        >
          <div className="opacity-[0.97] [transform:translateZ(-90px)]">
            <HeroEmailPreviewCard depth={1} />
          </div>
        </motion.div>

        {/* Top-left — meeting summary */}
        <motion.div
          className="absolute left-0 top-2 z-[2] w-[44%] max-w-[272px]"
          animate={floatB}
          transition={
            reduce
              ? undefined
              : {
                  duration: 15,
                  ease: EASE_PREMIUM,
                  repeat: Infinity,
                  delay: 0.28,
                }
          }
        >
          <div className="-rotate-[2deg] [transform:translateZ(-40px)]">
            <HeroMeetingSummaryCard depth={2} />
          </div>
        </motion.div>

        {/* Top-right — owners */}
        <motion.div
          className="absolute right-0 top-10 z-[2] w-[44%] max-w-[272px]"
          animate={floatC}
          transition={
            reduce
              ? undefined
              : {
                  duration: 14.5,
                  ease: EASE_PREMIUM,
                  repeat: Infinity,
                  delay: 0.35,
                }
          }
        >
          <div className="rotate-[2deg] [transform:translateZ(-50px)]">
            <HeroOwnersDeadlinesCard depth={2} />
          </div>
        </motion.div>

        {/* Center-front — action items (hero focal) */}
        <motion.div
          className="absolute left-1/2 top-[22%] z-[5] w-[88%] max-w-[420px] -translate-x-1/2"
          animate={floatPrimary}
          transition={
            reduce
              ? undefined
              : { duration: 13, ease: EASE_PREMIUM, repeat: Infinity }
          }
        >
          <div className="relative origin-center [transform:rotateY(-11deg)_rotateX(4deg)]">
            <HeroActionItemsCard depth={3} />
          </div>
        </motion.div>
      </div>
    </figure>
  );
}

export function HeroPreviewWithEnter({
  reduce,
}: {
  reduce: boolean;
}) {
  return (
    <motion.div
      className="relative"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduce
          ? undefined
          : { duration: DURATION.heroEnter, ease: EASE_PREMIUM }
      }
    >
      <HeroPreview reduce={reduce} />
    </motion.div>
  );
}
