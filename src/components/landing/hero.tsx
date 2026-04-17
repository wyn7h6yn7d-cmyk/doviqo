"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

import { HeroBackground3D } from "./hero-background-3d";

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-white/30" />;
}

function AppShell({
  title,
  subtitle,
  rightMeta,
  children,
}: {
  title: string;
  subtitle: string;
  rightMeta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden">
      {/* App chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/14" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div>
            <p className="text-xs font-medium text-white/80">{title}</p>
            <p className="text-[11px] text-white/45">{subtitle}</p>
          </div>
        </div>
        {rightMeta ? (
          <div className="text-[11px] text-white/60">{rightMeta}</div>
        ) : null}
      </div>

      <div className="p-4 sm:p-5">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
    </Card>
  );
}

function ActionItemsPanel() {
  const rows = [
    {
      t: "Finalize onboarding checklist and share for review",
      owner: "Nina",
      due: "Fri",
      status: "Ready",
    },
    {
      t: "Confirm rollout date with Support and update timeline",
      owner: "Sam",
      due: "Thu",
      status: "In progress",
    },
    {
      t: "Send recap to #product and tag owners",
      owner: "You",
      due: "Today",
      status: "Draft",
    },
  ];

  return (
    <AppShell
      title="Doviqo"
      subtitle="Sprint kickoff — extracted next steps"
      rightMeta={
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
          <Dot />
          Owners confirmed
        </span>
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
            Action items
          </span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
            Follow-ups
          </span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/40">
            Decisions
          </span>
        </div>
        <span className="text-[11px] text-white/50">3 items</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        <div className="grid grid-cols-[1fr_86px_64px_88px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
          <span>Item</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-white/10">
          {rows.map((r) => (
            <div
              key={r.t}
              className="grid grid-cols-[1fr_86px_64px_88px] gap-2 px-3 py-2"
            >
              <p className="text-sm text-white/80 leading-6">{r.t}</p>
              <div className="flex items-center">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/65">
                  {r.owner}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-[11px] text-white/60">{r.due}</span>
              </div>
              <div className="flex items-center justify-end">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/60">
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
        <span className="inline-flex items-center gap-2">
          <Dot />
          Unassigned: 0
        </span>
        <span className="inline-flex items-center gap-2">
          <Dot />
          Deadlines: explicit
        </span>
      </div>
    </AppShell>
  );
}

function FollowUpPanel() {
  return (
    <AppShell
      title="Follow-up"
      subtitle="Generated draft — ready to send"
      rightMeta={
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
          Ready
        </span>
      }
    >
      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[11px] font-medium text-white/65">Email draft</p>
        <p className="mt-2 text-sm leading-7 text-white/78">
          “Thanks for the sync. Next steps: Nina will share the onboarding
          checklist by Friday, Sam will confirm the rollout date by Thursday, and
          I’ll post the recap to #product today.”
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Clear owners
        </span>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Crisp deadlines
        </span>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
          Copy-ready
        </span>
      </div>
    </AppShell>
  );
}

function OwnersPanel() {
  return (
    <AppShell title="Owners" subtitle="Accountability snapshot" rightMeta="This week">
      <div className="grid grid-cols-3 gap-3">
        {[
          { who: "Nina", count: "2 items", due: "Fri" },
          { who: "Sam", count: "1 item", due: "Thu" },
          { who: "You", count: "1 draft", due: "Today" },
        ].map((x) => (
          <div
            key={x.who}
            className="rounded-xl border border-white/10 bg-black/30 p-3"
          >
            <p className="text-sm font-medium text-white/80">{x.who}</p>
            <p className="mt-2 text-[11px] text-white/55">{x.count}</p>
            <p className="mt-1 text-[11px] text-white/45">Next due: {x.due}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-white/50">
        Owners are explicit — nothing ships “unowned.”
      </div>
    </AppShell>
  );
}

function FloatingProductPreview({ reduce }: { reduce: boolean }) {
  const float = reduce
    ? undefined
    : { y: [0, -8, 0], rotateZ: [0, 0.35, 0] };

  return (
    <div className="relative mx-auto w-full max-w-[520px] md:max-w-none">
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-white/[0.03] blur-2xl" />
      <div className="relative [perspective:1200px]">
        <motion.div
          className="relative"
          animate={float}
          transition={
            reduce
              ? undefined
              : { duration: 6.5, ease: "easeInOut", repeat: Infinity }
          }
        >
          <div className="relative [transform:rotateY(-9deg)_rotateX(4deg)]">
            <ActionItemsPanel />
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
            <FollowUpPanel />
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
              : { duration: 8.2, ease: "easeInOut", repeat: Infinity, delay: 0.35 }
          }
        >
          <div className="opacity-90 [transform:translateZ(-90px)]">
            <OwnersPanel />
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/85" />
      </div>

      <Container className="noise relative pt-14 sm:pt-20">
        <div className="grid items-center gap-10 pb-12 pt-10 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:pb-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
                Post-meeting execution for small teams
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Meetings end. Work slips. Doviqo fixes that.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/68 sm:text-lg">
                Turn meeting notes and transcripts into clear owners, deadlines,
                follow-ups, and next steps in minutes.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              <p className="mt-3 text-xs text-white/50">
                Built for small teams. No recorder. Just execution you can ship.
              </p>
            </Reveal>
          </div>

          <Reveal className="relative">
            <motion.div
              className={cn("relative")}
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

