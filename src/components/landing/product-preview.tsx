"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

function PanelHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-white/70">{title}</p>
      {meta ? (
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-white/55">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide transition duration-300 ease-out",
        active
          ? "border-white/18 bg-white/[0.10] text-white shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
          : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07] hover:text-white",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-white/70" : "bg-white/30",
        )}
      />
      {children}
    </button>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .replace(/\(you\)/g, "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] text-white/75">
      {initials}
    </span>
  );
}

type Meeting = {
  id: string;
  title: string;
  source: "Notes" | "Transcript";
  snippet: string;
  actionItems: Array<{
    text: string;
    owner: string;
    due: string;
    status: "Draft" | "Queued" | "In progress" | "Ready";
  }>;
  owners: Array<{ name: string; focus: string; due: string }>;
  recap: string;
  followUp: string;
};

export function ProductPreview() {
  const reduce = useReducedMotion() ?? false;

  const meetings: Meeting[] = useMemo(
    () => [
      {
        id: "kickoff",
        title: "Sprint kickoff",
        source: "Transcript",
        snippet:
          "We agreed to ship the onboarding refresh next week. Nina owns the checklist. Sam confirms rollout date with Support. I’ll post the recap and tag owners.",
        actionItems: [
          {
            text: "Finalize onboarding checklist and share for review",
            owner: "Nina Park",
            due: "Fri",
            status: "Ready",
          },
          {
            text: "Confirm rollout date with Support and update timeline",
            owner: "Sam Chen",
            due: "Thu",
            status: "In progress",
          },
          {
            text: "Send recap to #product and tag owners",
            owner: "Alex (you)",
            due: "Today",
            status: "Draft",
          },
        ],
        owners: [
          { name: "Nina Park", focus: "Checklist + onboarding copy", due: "Fri" },
          { name: "Sam Chen", focus: "Rollout date + support readiness", due: "Thu" },
          { name: "Alex (you)", focus: "Recap + follow-ups", due: "Today" },
        ],
        recap:
          "Decisions: ship onboarding refresh next week; Support needs a final rollout date.\nNext check-in: Thursday.\nActions: 3 items, all owned, deadlines explicit.",
        followUp:
          "Subject: Next steps — onboarding refresh\n\nThanks for the sync. Here are the next steps:\n- Nina: share the onboarding checklist by Friday\n- Sam: confirm rollout date with Support by Thursday\n- Me: post the recap to #product today and tag owners\n\nNext check-in: Thursday.",
      },
      {
        id: "customer",
        title: "Customer escalation",
        source: "Notes",
        snippet:
          "Customer is blocked on permissions. We need a short-term workaround + a permanent fix. Assign an owner, set an SLA, and send an update within 2 hours.",
        actionItems: [
          {
            text: "Reproduce the permissions issue and capture logs",
            owner: "Sam Chen",
            due: "Today",
            status: "In progress",
          },
          {
            text: "Draft customer update with workaround + timeline",
            owner: "Nina Park",
            due: "2h",
            status: "Draft",
          },
          {
            text: "Ship a permanent fix behind a flag",
            owner: "Alex (you)",
            due: "Mon",
            status: "Queued",
          },
        ],
        owners: [
          { name: "Sam Chen", focus: "Root cause + logs", due: "Today" },
          { name: "Nina Park", focus: "Customer update + clarity", due: "2h" },
          { name: "Alex (you)", focus: "Fix + rollout plan", due: "Mon" },
        ],
        recap:
          "Situation: customer blocked on permissions.\nPlan: Sam reproduces + logs today. Nina sends an update within 2 hours. Fix ships behind a flag Monday.",
        followUp:
          "Subject: Update on permissions issue\n\nThanks for your patience — here’s our plan. We have a short-term workaround available today, and we’re shipping a permanent fix behind a flag on Monday.\n\nNext update in ~2 hours with a confirmed timeline.",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState(meetings[0]!.id);
  const active = meetings.find((m) => m.id === activeId) ?? meetings[0]!;

  return (
    <section id="product" className="py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Product"
            title="A premium workflow that makes next steps obvious."
            description="Add a meeting. Doviqo extracts action items, assigns owners, sets deadlines, and drafts follow-ups — so momentum doesn’t decay after the call."
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-white/65">
                Pick a meeting. The mock interface updates instantly — action
                items, owners, deadlines, recap, and a follow-up draft.
              </p>

              <div className="flex flex-wrap gap-2">
                {meetings.map((m) => (
                  <Chip
                    key={m.id}
                    active={m.id === activeId}
                    onClick={() => setActiveId(m.id)}
                  >
                    {m.title}
                  </Chip>
                ))}
              </div>

              <Card className="p-5 sm:p-6">
                <PanelHeader
                  title="Meeting input"
                  meta={`${active.source} → extracted outputs`}
                />
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium tracking-tight text-white/88">
                    {active.title}
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-[11px] text-white/55">
                      Paste notes or transcript
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/75">
                      {active.snippet}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/50">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                      Review before sending
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1">
                      Owners required
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            {/* Small/medium screens: stack cards (no overlap). Large: layered scene. */}
            <div className="grid gap-4 sm:gap-5 lg:hidden">
              <Card className="p-5 sm:p-6">
                <PanelHeader
                  title="Extracted action items"
                  meta={`${active.actionItems.length} items`}
                />
                <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  <div className="grid grid-cols-[1fr_120px_72px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
                    <span>Action</span>
                    <span>Owner</span>
                    <span>Due</span>
                  </div>
                  <div className="divide-y divide-white/10">
                    {active.actionItems.map((x) => (
                      <div
                        key={x.text}
                        className="grid grid-cols-[1fr_120px_72px] gap-2 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm leading-6 text-white/84">
                            {x.text}
                          </p>
                          <p className="mt-1 text-[11px] text-white/45">
                            Status: {x.status}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar name={x.owner} />
                          <span className="text-[11px] text-white/65">
                            {x.owner.split(" ")[0]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
                            {x.due}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-5 sm:p-6">
                <PanelHeader title="Assigned owners" meta="0 unassigned" />
                <div className="mt-4 grid gap-3">
                  {active.owners.map((o) => (
                    <div
                      key={o.name}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <Avatar name={o.name} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white/80">
                          {o.name}
                        </p>
                        <p className="mt-1 text-[11px] text-white/55">
                          {o.focus}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
                        Due {o.due}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 sm:p-6">
                <PanelHeader title="Recap + deadlines" meta="Copy-ready" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-[11px] font-medium text-white/65">
                      Summary
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/78">
                      {active.recap}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-[11px] font-medium text-white/65">
                      Follow-up cue
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/78">
                      Drafted with owners and deadlines embedded — so “what
                      happens next” is explicit.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 sm:p-6">
                <PanelHeader title="Generated follow-up email" meta="Ready" />
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="whitespace-pre-line text-sm leading-7 text-white/78">
                    {active.followUp}
                  </p>
                </div>
                <p className="mt-4 text-xs text-white/55">
                  Review, send, and keep work moving between meetings.
                </p>
              </Card>
            </div>

            <div className="relative hidden lg:block min-h-[560px]">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[42px] bg-white/[0.03] blur-2xl" />

              {/* Extracted action items */}
              <motion.div
                className="relative"
                layout
                transition={
                  reduce
                    ? undefined
                    : { duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }
                }
                whileHover={reduce ? undefined : { y: -2 }}
              >
                <Card className="overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <PanelHeader
                      title="Extracted action items"
                      meta={`${active.actionItems.length} items`}
                    />

                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                      <div className="grid grid-cols-[1fr_120px_72px] gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-white/45">
                        <span>Action</span>
                        <span>Owner</span>
                        <span>Due</span>
                      </div>
                      <div className="divide-y divide-white/10">
                        {active.actionItems.map((x) => (
                          <div
                            key={x.text}
                            className="grid grid-cols-[1fr_120px_72px] gap-2 px-3 py-2"
                          >
                            <div>
                              <p className="text-sm leading-6 text-white/84">
                                {x.text}
                              </p>
                              <p className="mt-1 text-[11px] text-white/45">
                                Status: {x.status}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar name={x.owner} />
                              <span className="text-[11px] text-white/65">
                                {x.owner.split(" ")[0]}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
                                {x.due}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Assigned owners */}
              <motion.div
                className="absolute -top-6 -right-4 w-[78%] sm:w-[64%]"
                initial={false}
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -5, 0], rotateZ: [-0.25, 0.25, -0.25] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 10.5,
                        ease: [0.16, 1, 0.3, 1],
                        repeat: Infinity,
                      }
                }
                whileHover={reduce ? undefined : { y: -8, rotateZ: 0 }}
              >
                <div className="[perspective:900px]">
                  <div className="opacity-95 [transform:translateZ(-80px)]">
                    <Card className="p-5 sm:p-6">
                      <PanelHeader title="Assigned owners" meta="0 unassigned" />
                      <div className="mt-4 grid gap-3">
                        {active.owners.map((o) => (
                          <div
                            key={o.name}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-3"
                          >
                            <Avatar name={o.name} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white/80">
                                {o.name}
                              </p>
                              <p className="mt-1 text-[11px] text-white/55">
                                {o.focus}
                              </p>
                            </div>
                            <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/65">
                              Due {o.due}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Due dates + recap */}
              <motion.div
                className="absolute -bottom-8 -left-4 w-[86%] sm:w-[72%]"
                initial={false}
                animate={reduce ? undefined : { y: [0, 6, 0], rotateZ: [0.2, -0.2, 0.2] }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 11.2,
                        ease: [0.16, 1, 0.3, 1],
                        repeat: Infinity,
                        delay: 0.25,
                      }
                }
                whileHover={reduce ? undefined : { y: 2, rotateZ: 0 }}
              >
                <div className="[perspective:900px]">
                  <div className="opacity-95 [transform:translateZ(-110px)]">
                    <Card className="p-5 sm:p-6">
                      <PanelHeader title="Recap + deadlines" meta="Copy-ready" />
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                          <p className="text-[11px] font-medium text-white/65">
                            Summary
                          </p>
                          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/78">
                            {active.recap}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                          <p className="text-[11px] font-medium text-white/65">
                            Follow-up cue
                          </p>
                          <p className="mt-2 text-sm leading-7 text-white/78">
                            Drafted with owners and deadlines embedded — so
                            “what happens next” is explicit.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                              Owners
                            </span>
                            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                              Deadlines
                            </span>
                            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/60">
                              Decisions
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Generated follow-up email */}
              <motion.div
                className="absolute left-10 top-[52%] hidden w-[72%] -translate-y-1/2 lg:block"
                initial={false}
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 9.6,
                        ease: [0.16, 1, 0.3, 1],
                        repeat: Infinity,
                        delay: 0.15,
                      }
                }
                whileHover={reduce ? undefined : { y: -10 }}
              >
                <div className="[perspective:900px]">
                  <div className="opacity-95 [transform:translateZ(-140px)]">
                    <Card className="p-5 sm:p-6">
                      <PanelHeader title="Generated follow-up email" meta="Ready" />
                      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                        <p className="whitespace-pre-line text-sm leading-7 text-white/78">
                          {active.followUp}
                        </p>
                      </div>
                      <p className="mt-4 text-xs text-white/55">
                        Review, send, and keep work moving between meetings.
                      </p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

