"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

import { HeroBackground3D } from "./hero-background-3d";
import {
  HeroActionItemsPanel,
  HeroFollowUpPanel,
  HeroOwnersPanel,
} from "./hero/hero-preview-panels";

function FloatingProductPreview({ reduce }: { reduce: boolean }) {
  const float = reduce
    ? undefined
    : { y: [0, -8, 0], rotateZ: [0, 0.35, 0] };

  return (
    <div className="mx-auto w-full max-w-[560px] md:max-w-none">
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-white/[0.03] blur-2xl" />
      {/* Mobile/tablet: stack panels (no overlaps). Desktop: layered depth. */}
      <div className="grid gap-4 sm:gap-5 lg:hidden">
        <HeroActionItemsPanel />
        <HeroFollowUpPanel />
        <HeroOwnersPanel />
      </div>

      <div className="relative hidden lg:block [perspective:1200px]">
        <motion.div
          className="relative"
          animate={float}
          transition={
            reduce
              ? undefined
              : { duration: 7.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity }
          }
        >
          <div className="relative [transform:rotateY(-9deg)_rotateX(4deg)]">
            <HeroActionItemsPanel />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -left-6 w-[92%] sm:w-[86%]"
          style={{ transformOrigin: "center" }}
          animate={
            reduce
              ? undefined
              : { y: [0, 6, 0], rotateZ: [0.2, -0.2, 0.2] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 7.5, ease: "easeInOut", repeat: Infinity, delay: 0.2 }
          }
        >
          <div className="opacity-95 [transform:translateZ(-60px)]">
            <HeroFollowUpPanel />
          </div>
        </motion.div>

        <motion.div
          className="absolute -top-10 -right-6 w-[76%] sm:w-[70%]"
          animate={
            reduce
              ? undefined
              : { y: [0, -6, 0], rotateZ: [-0.2, 0.2, -0.2] }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 9.4,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  delay: 0.35,
                }
          }
        >
          <div className="opacity-90 [transform:translateZ(-90px)]">
            <HeroOwnersPanel />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-sheen opacity-90" />
        <HeroBackground3D />
        {/* Atmospheric lighting: keeps premium depth without noise */}
        <div className="glow-layer" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/85" />
      </div>

      <Container className="noise relative pt-12 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-10 pb-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-[0.20em] uppercase text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
                Post-meeting execution for small teams
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
                Meetings end. Work slips. Doviqo fixes that.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/64 sm:text-[17px] sm:leading-8">
                Turn meeting notes and transcripts into clear owners, deadlines,
                follow-ups, and next steps in minutes.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#cta" className="w-full sm:w-auto">
                  Get early access
                </Button>
                <Button
                  href="#how"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  See how it works
                </Button>
              </div>
              <p className="mt-4 text-xs leading-6 text-white/50">
                No recorder. No clutter. Just clear next steps after every meeting.
              </p>
            </Reveal>
          </div>

          <Reveal className="relative">
            <motion.div
              className="relative"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduce
                  ? undefined
                  : { duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }
              }
            >
              <FloatingProductPreview reduce={reduce} />
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

