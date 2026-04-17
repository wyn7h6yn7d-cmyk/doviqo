"use client";

import { motion } from "framer-motion";

import { EASE_PREMIUM } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/ui/panel-header";
import { ProductActionItemsCard } from "@/components/mock/action-items-card";
import { ProductOwnersCard } from "@/components/mock/owners-card";
import { SlackRecapCard } from "@/components/mock/slack-recap-card";
import { EmailDraftCard } from "@/components/mock/email-draft-card";
import type { Meeting } from "@/lib/constants";

export function LayeredShowcase({
  meeting,
  reduceMotion,
}: {
  meeting: Meeting;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative hidden min-h-[560px] lg:block">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[42px] bg-white/[0.03] blur-2xl" />

      <motion.div
        className="relative"
        layout
        transition={
          reduceMotion ? undefined : { duration: 0.55, ease: EASE_PREMIUM }
        }
      >
        <ProductActionItemsCard meeting={meeting} />
      </motion.div>

      <motion.div
        className="absolute -top-6 -right-4 w-[64%]"
        initial={false}
        animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 13, ease: EASE_PREMIUM, repeat: Infinity }
        }
      >
        <div className="[perspective:900px]">
          <div className="opacity-95 [transform:translateZ(-80px)]">
            <ProductOwnersCard meeting={meeting} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 -left-4 w-[72%]"
        initial={false}
        animate={reduceMotion ? undefined : { y: [0, 2.5, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 14,
                ease: EASE_PREMIUM,
                repeat: Infinity,
                delay: 0.25,
              }
        }
      >
        <div className="[perspective:900px]">
          <div className="opacity-95 [transform:translateZ(-110px)]">
            <Card className="p-5 sm:p-6">
              <PanelHeader title="Kokkuvõte ja tähtajad" meta="Kopeerimiseks valmis" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SlackRecapCard text={meeting.recap} />
                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-[11px] font-medium text-white/65">
                    Kontekst järelkirjale
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    Vastutajad ja tähtajad sees — mis edasi juhtub, on kohe näha.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                      Vastutajad
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                      Tähtajad
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                      Otsused
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-10 top-[52%] w-[72%] -translate-y-1/2"
        initial={false}
        animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 13.5,
                ease: EASE_PREMIUM,
                repeat: Infinity,
                delay: 0.15,
              }
        }
      >
        <div className="[perspective:900px]">
          <div className="opacity-95 [transform:translateZ(-140px)]">
            <Card className="p-5 sm:p-6">
              <PanelHeader title="Genereeritud järelkiri" meta="Valmis" />
              <div className="mt-4">
                <EmailDraftCard body={meeting.followUp} />
              </div>
              <p className="mt-4 text-xs text-white/55">
                Vaata üle, saada ja hoia töö koosolekute vahel liikumas.
              </p>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
