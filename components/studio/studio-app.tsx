"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { DURATION, EASE_PREMIUM } from "@/lib/constants";
import {
  formatEmailReadyExport,
  formatSlackExport,
  formatStudioPlainExport,
  formatTahtajadPlain,
  formatTeamBriefExport,
  formatTegevusedPlain,
  formatOtsusedPlain,
  formatVastutajadPlain,
} from "@/lib/studio/format-export";
import { presetIdToMeetingTone } from "@/lib/studio/preset-tone";
import {
  STUDIO_PROCESS_MILESTONES_MS,
  STUDIO_PROCESS_TOTAL_MS,
} from "@/lib/studio/run-studio";
import { transformStudioInput } from "@/lib/studio/service";
import type { StudioTulemus } from "@/lib/studio/types";
import {
  studioDemoPresets,
  studioEmotionalPillars,
  studioUi as t,
} from "@/lib/studio/copy";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { StudioCopyButton } from "@/components/studio/studio-copy-button";
import { cn } from "@/lib/utils";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: EASE_PREMIUM },
  },
};

function IconSummary() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}
function IconTasks() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" />
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconHelp() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9.09 9a3 3 0 115.83 1c0 2-3 2-3 4M12 17h.01" strokeLinecap="round" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
function IconDecision() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" />
      <path d="M19 5l-2 2M5 19l2-2M19 19l-2-2M5 5l2 2" strokeLinecap="round" />
    </svg>
  );
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-2.5 animate-pulse rounded-md bg-[color-mix(in_srgb,var(--foreground-muted)_16%,transparent)]",
        className,
      )}
      aria-hidden
    />
  );
}

function OutputSkeletonBlock({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[rgb(var(--accent)/0.14)] bg-[linear-gradient(155deg,color-mix(in_srgb,var(--surface-raised)_55%,transparent)_0%,color-mix(in_srgb,var(--surface)_42%,transparent)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgb(255,255,255/0.05),0_0_40px_-28px_rgb(var(--accent)/0.12)]">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.12)_0%,transparent_68%)]"
        aria-hidden
      />
      <div className="relative mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--accent)/0.14)] bg-[rgb(var(--accent)/0.07)] text-[rgb(var(--accent-bright))]">
          {icon}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
          {label}
        </span>
      </div>
      <div className="relative space-y-2.5">{children}</div>
    </div>
  );
}

function PremiumResultCard({
  title,
  icon,
  copyText,
  copyLabel = t.copySection,
  copySuccessLabel,
  children,
}: {
  title: string;
  icon: ReactNode;
  copyText: string;
  copyLabel?: string;
  copySuccessLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="panel-output-card group relative overflow-hidden rounded-2xl">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.12)_0%,transparent_70%)] opacity-90"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-start justify-between gap-3 border-b border-[color-mix(in_srgb,var(--border)_85%,transparent)] px-5 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.11)] text-[rgb(var(--accent-bright))] shadow-[0_0_28px_-12px_rgb(var(--accent)/0.55)]">
            {icon}
          </div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
            {title}
          </h2>
        </div>
        <StudioCopyButton
          text={copyText}
          label={copyLabel}
          successLabel={copySuccessLabel}
          size="md"
        />
      </div>
      <div className="relative px-5 pb-6 pt-5">{children}</div>
    </section>
  );
}

function LoadingStepsSync() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const timers = STUDIO_PROCESS_MILESTONES_MS.map((ms, i) =>
      window.setTimeout(() => setDone(i + 1), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [t.loadingStep1, t.loadingStep2, t.loadingStep3] as const;

  return (
    <ul className="mt-5 space-y-2.5" aria-live="polite">
      {steps.map((label, i) => (
        <li
          key={label}
          className="flex items-center gap-3 text-[13px] text-[var(--foreground-muted)]"
        >
          <span
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition duration-300",
              done > i
                ? "border-[rgb(var(--accent-cyan)/0.45)] bg-[rgb(var(--accent)/0.18)] text-[rgb(var(--accent-bright))]"
                : "border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--foreground-subtle)]",
            )}
            aria-hidden
          >
            {done > i ? "✓" : i + 1}
          </span>
          <span className={done > i ? "text-[var(--fg)]" : ""}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function LoadingPanel({ loadCycle }: { loadCycle: number }) {
  return (
    <div
      className="glass-panel edge-lit flex min-h-[min(340px,48vh)] flex-col justify-center rounded-2xl border border-[rgb(var(--accent)/0.22)] p-6 sm:p-8"
      role="status"
      aria-busy="true"
      aria-label={t.loadingTitle}
    >
      <div className="flex items-start gap-4">
        <span
          className="inline-flex h-11 w-11 shrink-0 animate-spin rounded-full border-2 border-[var(--border-strong)] border-t-[rgb(var(--accent-bright))]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--fg)]">
            {t.loadingTitle}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            {t.loadingHint}
          </p>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <motion.div
              key={loadCycle}
              className="h-full rounded-full bg-gradient-to-r from-[rgb(124,92,255)] via-[rgb(99,102,241)] to-[rgb(34,211,238)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: STUDIO_PROCESS_TOTAL_MS / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>
      <LoadingStepsSync key={loadCycle} />
    </div>
  );
}

function TransformStrip({ result }: { result: StudioTulemus }) {
  const s = result.summary;
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl border border-[rgb(var(--accent-cyan)/0.38)] bg-[linear-gradient(128deg,rgb(var(--accent)/0.3)_0%,rgba(14,18,28,0.96)_45%,rgba(6,9,16,0.94)_100%)] px-5 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_0_88px_-24px_rgb(var(--accent)/0.52),0_28px_72px_-40px_rgba(0,0,0,0.68)] sm:px-7 sm:py-7"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.22)_0%,transparent_72%)] blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent-cyan)/0.45)] bg-[rgb(var(--accent)/0.22)] px-3 py-1.5 shadow-[0_0_24px_-10px_rgb(var(--accent-cyan)/0.55)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent-cyan))] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--accent-cyan))]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[rgb(var(--accent-bright))]">
            {t.resultStatusBadge}
          </span>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
          {t.transformStripLabel}
        </span>
      </div>
      <p className="relative mt-4 text-[clamp(1.08rem,2.8vw,1.42rem)] font-semibold leading-snug tracking-[-0.03em] text-[var(--fg)]">
        {t.transformSummaryLine
          .replace("{raw}", String(s.rawLineCount))
          .replace("{items}", String(s.structuredItemCount))}
      </p>
      <p className="relative mt-2 text-[13px] text-[var(--foreground-muted)]">
        {s.uniqueVastutajad} vastutajat · {s.tahtaegadega} tähtajaga ·{" "}
        {s.rawCharCount.toLocaleString("et-EE")} märki
      </p>
      <p className="relative mt-3 max-w-2xl text-[13px] leading-relaxed text-[var(--foreground-subtle)]">
        {t.transformStripHint}
      </p>
    </motion.div>
  );
}

function EmptyExecutionCanvas() {
  return (
    <div className="relative flex min-h-[min(560px,70vh)] flex-1 flex-col overflow-hidden rounded-2xl">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_18%,rgb(var(--accent)/0.18),transparent_58%),radial-gradient(ellipse_55%_40%_at_80%_90%,rgb(var(--accent-cyan)/0.1),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_-24px_rgb(var(--accent)/0.14)]"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgb(var(--accent)/0.38)] bg-[linear-gradient(155deg,rgb(var(--accent)/0.18)_0%,rgba(14,17,26,0.9)_100%)] text-[26px] text-[rgb(var(--accent-bright))] shadow-[0_0_56px_-16px_rgb(var(--accent)/0.55)]"
            aria-hidden
          >
            ◈
          </div>
          <p className="text-[18px] font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-[19px]">
            {t.emptyTitle}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            {t.emptyBody}
          </p>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-4xl">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
            {t.emptyChipsLead}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {[
              t.sectionKokkuvote,
              t.sectionOtsused,
              t.sectionTegevused,
              t.sectionVastutajad,
              t.sectionTahtajad,
              t.sectionLahtised,
              t.sectionJarelkiri,
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[rgb(var(--accent)/0.22)] bg-[color-mix(in_srgb,var(--surface-raised)_55%,transparent)] px-3 py-1 text-[11px] font-medium text-[var(--foreground-muted)] shadow-[inset_0_1px_0_rgb(255,255,255,0.04)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-4xl flex-1 space-y-3 sm:space-y-4">
          <OutputSkeletonBlock label={t.sectionKokkuvote} icon={<IconSummary />}>
            <SkeletonLine className="w-[94%]" />
            <SkeletonLine className="w-[88%]" />
            <SkeletonLine className="w-[62%]" />
          </OutputSkeletonBlock>

          <OutputSkeletonBlock label={t.sectionOtsused} icon={<IconDecision />}>
            <SkeletonLine className="w-[86%]" />
            <SkeletonLine className="w-[72%]" />
          </OutputSkeletonBlock>

          <OutputSkeletonBlock label={t.sectionTegevused} icon={<IconTasks />}>
            <div className="space-y-2">
              {(["w-[93%]", "w-[76%]", "w-[84%]", "w-[58%]"] as const).map((w, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-[color-mix(in_srgb,var(--border)_50%,transparent)] bg-[color-mix(in_srgb,var(--surface)_35%,transparent)] px-3 py-2.5"
                >
                  <SkeletonLine className={cn("h-3 shrink-0", w)} />
                  <SkeletonLine className="h-3 w-14 shrink-0" />
                  <SkeletonLine className="h-3 w-12 shrink-0" />
                </div>
              ))}
            </div>
          </OutputSkeletonBlock>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <OutputSkeletonBlock label={t.sectionVastutajad} icon={<IconPeople />}>
              <SkeletonLine className="w-[70%]" />
              <SkeletonLine className="w-[88%]" />
              <SkeletonLine className="w-[56%]" />
            </OutputSkeletonBlock>
            <OutputSkeletonBlock label={t.sectionTahtajad} icon={<IconCalendar />}>
              <SkeletonLine className="w-[64%]" />
              <SkeletonLine className="w-[92%]" />
              <SkeletonLine className="w-[72%]" />
            </OutputSkeletonBlock>
          </div>

          <OutputSkeletonBlock label={t.sectionLahtised} icon={<IconHelp />}>
            <SkeletonLine className="w-[80%]" />
            <SkeletonLine className="w-[70%]" />
          </OutputSkeletonBlock>

          <OutputSkeletonBlock label={t.sectionJarelkiri} icon={<IconMail />}>
            <SkeletonLine className="w-[40%]" />
            <div className="mt-3 space-y-2 rounded-lg border border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[color-mix(in_srgb,var(--bg-elevated)_55%,transparent)] p-3">
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-[91%]" />
              <SkeletonLine className="w-[78%]" />
              <SkeletonLine className="h-10 w-full opacity-40" />
            </div>
          </OutputSkeletonBlock>
        </div>

        <div className="relative mx-auto mt-8 grid w-full max-w-3xl grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {studioEmotionalPillars.map((row) => (
            <div
              key={row.before}
              className="rounded-xl border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[color-mix(in_srgb,var(--surface-muted)_38%,transparent)] px-3 py-2.5 text-center backdrop-blur-sm"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
                {row.before}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-[rgb(var(--accent-bright))]">
                → {row.after}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowProgressStrip({
  input,
  loading,
  result,
}: {
  input: string;
  loading: boolean;
  result: StudioTulemus | null;
}) {
  const hasIn = input.trim().length > 0;

  const stepStatus = (i: number): "done" | "current" | "upcoming" => {
    if (result) {
      if (i < 4) return "done";
      return "current";
    }
    if (loading) {
      if (i < 2) return "done";
      if (i === 2) return "current";
      return "upcoming";
    }
    if (hasIn) {
      if (i < 2) return "done";
      if (i === 2) return "current";
      return "upcoming";
    }
    if (i === 0) return "done";
    if (i === 1) return "current";
    return "upcoming";
  };

  const labels = t.workflowStepLabels;

  return (
    <div className="border-b border-[var(--border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_42%,transparent)_0%,transparent_72%)]">
      <SectionContainer className="py-4 sm:py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-bright))]">
          {t.workflowStripTitle}
        </p>
        <p className="mt-1.5 max-w-3xl text-[12px] leading-relaxed text-[var(--foreground-subtle)] sm:text-[13px]">
          {t.workflowStripHint}
        </p>
        <ol
          className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          aria-label={t.workflowStripTitle}
        >
          {labels.map((label, i) => {
            const st = stepStatus(i);
            return (
              <li
                key={label}
                className="flex min-h-[3.25rem] flex-col gap-2 rounded-xl border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)] p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition duration-300",
                      st === "done" &&
                        "border-[rgb(var(--accent-cyan)/0.45)] bg-[rgb(var(--accent)/0.2)] text-[rgb(var(--accent-bright))]",
                      st === "current" &&
                        "border-[rgb(var(--accent-cyan)/0.55)] bg-[rgb(var(--accent-cyan)/0.12)] text-[var(--fg)] shadow-[0_0_28px_-8px_rgb(var(--accent-cyan)/0.42)]",
                      st === "upcoming" &&
                        "border-[var(--border)] bg-[var(--surface-raised)] text-[var(--foreground-subtle)]",
                    )}
                  >
                    {st === "done" ? "✓" : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[12px] font-semibold leading-snug sm:text-[13px]",
                      st === "current"
                        ? "text-[var(--fg)]"
                        : st === "done"
                          ? "text-[var(--foreground-muted)]"
                          : "text-[var(--foreground-subtle)]",
                    )}
                  >
                    {label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </SectionContainer>
    </div>
  );
}

function MeetingTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div role="group" aria-label={t.meetingTypeGroupAria}>
      <p className="mb-3 text-[11px] font-medium text-[var(--foreground-subtle)]">
        {t.meetingTypeContextLine}
      </p>
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="sr-only">{t.meetingTypeLabel}</legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {studioDemoPresets.map((p) => {
            const selected = value === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange(p.id)}
                className={cn(
                  "group relative flex min-h-[5.75rem] flex-col justify-between rounded-2xl border px-3.5 py-3 text-left transition duration-200 sm:min-h-[6rem] sm:px-4",
                  selected
                    ? "border-[rgb(var(--accent-cyan)/0.5)] bg-[linear-gradient(168deg,rgb(var(--accent)/0.22)_0%,color-mix(in_srgb,var(--surface-raised)_55%,transparent)_100%)] text-[var(--fg)] shadow-[inset_0_1px_0_rgb(255,255,255,0.08),0_0_0_1px_rgb(var(--accent)/0.35),0_14px_48px_-18px_rgb(var(--accent)/0.45)]"
                    : "border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] text-[var(--foreground-muted)] hover:border-[rgb(var(--accent)/0.42)] hover:bg-[color-mix(in_srgb,var(--surface-raised)_92%,transparent)] hover:text-[var(--fg)]",
                )}
                aria-pressed={selected}
                aria-describedby={`preset-intent-${p.id}`}
              >
                {selected ? (
                  <span
                    className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--accent-cyan)/0.4)] text-[10px] font-bold text-[var(--fg)] shadow-[0_0_20px_-4px_rgb(var(--accent-cyan)/0.5)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                ) : null}
                <span
                  className={cn(
                    "pr-7 text-[13px] font-semibold leading-snug sm:text-[14px]",
                    selected && "text-[var(--fg)]",
                  )}
                >
                  {p.title}
                </span>
                <p
                  id={`preset-intent-${p.id}`}
                  className={cn(
                    "mt-2 line-clamp-3 text-[11px] leading-snug sm:text-[12px]",
                    selected
                      ? "text-[var(--foreground-muted)]"
                      : "text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)]",
                  )}
                >
                  {p.intent}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function QuickCopyActions({
  result,
  exportAll,
  onReset,
}: {
  result: StudioTulemus;
  exportAll: string;
  onReset?: () => void;
}) {
  const slack = useMemo(() => formatSlackExport(result), [result]);
  const emailReady = useMemo(() => formatEmailReadyExport(result), [result]);
  const team = useMemo(() => formatTeamBriefExport(result), [result]);

  return (
    <div
      className="rounded-2xl border border-[rgb(var(--accent)/0.22)] bg-[linear-gradient(168deg,color-mix(in_srgb,var(--surface-muted)_48%,transparent)_0%,color-mix(in_srgb,var(--surface)_28%,var(--bg-deep))_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_48px_-28px_rgb(var(--accent)/0.18)] sm:p-5"
      role="group"
      aria-label={t.workflowCopyTitle}
    >
      <div className="border-b border-[color-mix(in_srgb,var(--border)_70%,transparent)] pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-bright))]">
          {t.workflowCopyTitle}
        </p>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[var(--foreground-muted)] sm:text-[14px]">
          {t.workflowCopyHint}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6 lg:gap-2.5">
        <StudioCopyButton
          text={result.kokkuvote}
          label={t.copyKokkuvote}
          successLabel={t.copiedKokkuvote}
          variant="workflow"
          size="md"
          className="lg:col-span-2"
        />
        <StudioCopyButton
          text={result.jarelkiri}
          label={t.copyJarelkiri}
          successLabel={t.copiedJarelkiri}
          variant="workflow"
          size="md"
          className="lg:col-span-2"
        />
        <StudioCopyButton
          text={exportAll}
          label={t.copyAll}
          successLabel={t.copiedAll}
          variant="workflow"
          size="md"
          className="lg:col-span-2"
        />
        <StudioCopyButton
          text={team}
          label={t.copyTeam}
          successLabel={t.copiedTeam}
          variant="workflow"
          size="md"
          className="lg:col-span-3"
        />
        <StudioCopyButton
          text={emailReady}
          label={t.copyEmail}
          successLabel={t.copiedEmail}
          variant="workflow"
          size="md"
          className="lg:col-span-3"
        />
      </div>

      <div className="mt-3 border-t border-[color-mix(in_srgb,var(--border)_60%,transparent)] pt-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
          {t.workflowMoreChannels}
        </p>
        <StudioCopyButton
          text={slack}
          label={t.copySlack}
          successLabel={t.copiedSlack}
          variant="workflowMuted"
          size="md"
          className="sm:max-w-md"
        />
      </div>

      {onReset ? (
        <div className="mt-5 flex justify-end border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
            className="min-h-11 min-w-[12.5rem]"
          >
            {t.resetBtn}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function StudioApp() {
  const reduce = useReducedMotion() ?? false;
  const meetingInputId = useId();
  const meetingInputHintId = `${meetingInputId}-hint`;
  const meetingInputErrId = `${meetingInputId}-err`;

  const [meetingTypeId, setMeetingTypeId] = useState(studioDemoPresets[0].id);
  const [input, setInput] = useState(studioDemoPresets[0].body);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadCycle, setLoadCycle] = useState(0);
  const [result, setResult] = useState<StudioTulemus | null>(null);

  const onMeetingTypeChange = useCallback((id: string) => {
    setMeetingTypeId(id);
    const preset = studioDemoPresets.find((p) => p.id === id);
    if (preset) {
      setInput(preset.body);
      setResult(null);
      setError(null);
    }
  }, []);

  const runProcess = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError(t.emptyError);
      setResult(null);
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setLoadCycle((c) => c + 1);
    try {
      const out = await transformStudioInput(trimmed, {
        toneOverride: presetIdToMeetingTone(meetingTypeId),
      });
      setResult(out);
    } finally {
      setLoading(false);
    }
  }, [input, meetingTypeId]);

  const resetAll = useCallback(() => {
    setMeetingTypeId(studioDemoPresets[0].id);
    setInput(studioDemoPresets[0].body);
    setResult(null);
    setError(null);
  }, []);

  const exportAll = useMemo(
    () => (result ? formatStudioPlainExport(result) : ""),
    [result],
  );

  const hasResult = result !== null && !loading;

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg-deep)]">
      <div className="studio-atmosphere" aria-hidden />
      <div className="studio-atmosphere-grid" aria-hidden />

      <header className="studio-header-bar sticky top-0 z-50">
        <SectionContainer className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-gradient-accent text-[10px] font-semibold uppercase tracking-[0.16em]">
                {t.studioEyebrow}
              </p>
              <span className="rounded-full border border-[rgb(var(--accent-cyan)/0.35)] bg-[rgb(var(--accent-cyan)/0.08)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-cyan))]">
                {t.demoBadge}
              </span>
            </div>
            <h1 className="mt-1.5 text-[1.4rem] font-semibold tracking-[-0.035em] text-[var(--fg)] sm:text-[1.5rem]">
              {t.productName}
            </h1>
            <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[var(--foreground-muted)]">
              {t.workspaceSubtitle}
            </p>
          </div>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium"
            aria-label={t.studioNavAria}
          >
            <Link
              href="/#waitlist"
              className="text-[rgb(var(--accent-bright))] transition hover:text-[rgb(var(--accent-cyan))]"
            >
              {t.waitlistLink}
            </Link>
            <span className="text-[var(--border-strong)]" aria-hidden>
              ·
            </span>
            <Link href="/" className="text-[var(--foreground-muted)] hover:text-[var(--fg)]">
              {t.backHome}
            </Link>
          </nav>
        </SectionContainer>
        <div className="studio-notice-strip">
          <SectionContainer className="py-2.5">
            <p className="text-[12px] leading-relaxed text-[var(--foreground-muted)]">
              {t.demoNotice}
            </p>
          </SectionContainer>
        </div>
      </header>

      <section className="studio-meeting-strip relative z-10 py-5 sm:py-7">
        <SectionContainer>
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-bright))]">
              {t.meetingBarTitle}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)] sm:text-[15px]">
              {t.meetingBarHint}
            </p>
          </div>
          <div className="mt-6">
            <MeetingTypeSelector value={meetingTypeId} onChange={onMeetingTypeChange} />
          </div>
          <p className="mt-5 max-w-3xl text-[12px] leading-relaxed text-[var(--foreground-subtle)] sm:text-[13px]">
            {t.meetingTypeFooterNote}
          </p>
        </SectionContainer>
      </section>

      <WorkflowProgressStrip
        input={input}
        loading={loading}
        result={result}
      />

      <div className="relative z-10 flex flex-1 flex-col lg:grid lg:min-h-0 lg:grid-cols-[minmax(280px,0.36fr)_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[minmax(300px,0.34fr)_minmax(0,1fr)]">
        <motion.aside
          className="studio-intake-rail flex w-full flex-col border-b border-[var(--border)] lg:shrink-0 lg:border-b-0 lg:border-r"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASE_PREMIUM }}
          aria-label={t.workflowAria}
        >
          <SectionContainer className="flex flex-1 flex-col py-6 lg:min-h-[calc(100vh-13rem)] lg:py-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
              {t.intakeRailTitle}
            </p>
            <h2 className="mt-3 text-[18px] font-semibold tracking-[-0.03em] text-[var(--fg)]">
              {t.stepInput}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
              {t.sampleSectionLead}
            </p>

            <label htmlFor="studio-meeting-input" className="sr-only">
              {t.inputLabelLong}
            </label>
            <textarea
              id="studio-meeting-input"
              value={input}
              onChange={(e) => {
                const next = e.target.value;
                setInput(next);
                setError(null);
                if (!next.trim()) setResult(null);
              }}
              placeholder={t.placeholder}
              rows={14}
              aria-invalid={error ? true : undefined}
              aria-describedby={
                error
                  ? `${meetingInputHintId} ${meetingInputErrId}`
                  : meetingInputHintId
              }
              className={cn(
                "mt-4 min-h-[min(280px,40vh)] w-full resize-y rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-4 py-3.5 font-mono text-[13px] leading-relaxed text-[var(--fg)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.42)] backdrop-blur-sm",
                "placeholder:text-[var(--foreground-subtle)] outline-none transition",
                "hover:border-[rgb(var(--accent)/0.38)]",
                "focus:border-[rgb(var(--accent-cyan)/0.5)] focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.38),0_0_0_3px_rgb(var(--accent)/0.18)]",
                error &&
                  "border-rose-400/70 focus:border-rose-400 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35),0_0_0_3px_rgba(244,63,94,0.2)]",
              )}
              spellCheck={false}
            />

            <p
              id={meetingInputHintId}
              className="mt-3 text-[13px] leading-relaxed text-[var(--foreground-subtle)]"
            >
              {t.inputHint}
            </p>

            {error ? (
              <p
                id={meetingInputErrId}
                className="mt-4 text-sm font-medium text-rose-600"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-6 flex flex-1 flex-col justify-end">
              <div className="rounded-2xl border border-dashed border-[rgb(var(--accent)/0.38)] bg-[color-mix(in_srgb,var(--surface-raised)_50%,transparent)] p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-bright))]">
                  {t.transformZoneTitle}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                  {t.transformZoneHint}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] font-medium sm:gap-3">
                  <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--foreground-muted)] sm:text-[12px]">
                    {t.bridgeMessy}
                  </span>
                  <span
                    className="text-[rgb(var(--accent-cyan))]"
                    aria-hidden
                  >
                    →
                  </span>
                  <span className="rounded-lg border border-[rgb(var(--accent-cyan)/0.35)] bg-[rgb(var(--accent)/0.12)] px-2.5 py-1.5 font-mono text-[11px] text-[rgb(var(--accent-bright))] sm:text-[12px]">
                    {t.bridgeClear}
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    onClick={runProcess}
                    disabled={loading}
                    className="min-h-[3.25rem] min-w-[13.5rem] px-8 text-[15px] font-semibold shadow-[0_0_42px_-12px_rgb(var(--accent)/0.65)]"
                    aria-busy={loading}
                  >
                    {loading ? t.processing : t.processBtn}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={resetAll}
                    disabled={loading || (!input.trim() && !result && !error)}
                    className="min-h-[3.25rem]"
                  >
                    {t.resetBtn}
                  </Button>
                </div>
              </div>
            </div>
          </SectionContainer>
        </motion.aside>

        <motion.main
          className="studio-output-stage relative z-0 flex min-h-[min(560px,68vh)] flex-1 flex-col border-[var(--border)] lg:min-h-[calc(100vh-12rem)]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.reveal,
            ease: EASE_PREMIUM,
            delay: 0.05,
          }}
        >
          <SectionContainer className="relative z-10 flex flex-1 flex-col py-6 lg:min-h-0 lg:py-8">
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-bright))]">
                {t.outputTitle}
              </p>
              <p className="mt-2 max-w-2xl text-[15px] font-medium leading-relaxed tracking-[-0.015em] text-[var(--foreground-muted)]">
                {t.outputHint}
              </p>
            </div>

            <div
              className="studio-canvas-frame flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    className="flex flex-1 flex-col p-4 sm:p-6"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: EASE_PREMIUM }}
                  >
                    <LoadingPanel loadCycle={loadCycle} />
                  </motion.div>
                ) : hasResult && result ? (
                  <motion.div
                    key="result"
                    className="flex max-h-[min(78vh,1200px)] flex-1 flex-col overflow-y-auto overflow-x-hidden p-4 sm:p-6"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    style={{ scrollbarGutter: "stable" }}
                  >
                    <TransformStrip result={result} />

                    <motion.div className="mt-6" variants={itemVariants}>
                      <QuickCopyActions
                        result={result}
                        exportAll={exportAll}
                        onReset={resetAll}
                      />
                    </motion.div>

                    <motion.div className="mt-6" variants={itemVariants}>
                      <PremiumResultCard
                        title={t.sectionKokkuvote}
                        icon={<IconSummary />}
                        copyText={result.kokkuvote}
                        copyLabel={t.copyKokkuvote}
                        copySuccessLabel={t.copiedKokkuvote}
                      >
                        <p className="whitespace-pre-wrap text-[16px] leading-[1.65] text-[var(--foreground-muted)]">
                          {result.kokkuvote}
                        </p>
                      </PremiumResultCard>
                    </motion.div>

                    {result.otsused.length > 0 ? (
                      <motion.div className="mt-6" variants={itemVariants}>
                        <PremiumResultCard
                          title={t.sectionOtsused}
                          icon={<IconDecision />}
                          copyText={formatOtsusedPlain(result)}
                          copyLabel={t.copyOtsused}
                        >
                          <ul className="space-y-3">
                            {result.otsused.map((o) => (
                              <li
                                key={o}
                                className="flex gap-3 text-[15px] leading-relaxed text-[var(--foreground-muted)]"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent-cyan))]"
                                  aria-hidden
                                />
                                <span className="min-w-0 text-[var(--fg)]">{o}</span>
                              </li>
                            ))}
                          </ul>
                        </PremiumResultCard>
                      </motion.div>
                    ) : null}

                    <motion.div className="mt-6" variants={itemVariants}>
                      <PremiumResultCard
                        title={t.sectionTegevused}
                        icon={<IconTasks />}
                        copyText={formatTegevusedPlain(result)}
                      >
                        <div className="overflow-x-auto rounded-xl border border-[color-mix(in_srgb,var(--border)_90%,transparent)] bg-[color-mix(in_srgb,var(--bg-elevated)_65%,transparent)]">
                          <table className="w-full min-w-[480px] text-left text-[13px]">
                            <thead>
                              <tr className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_80%,transparent)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
                                <th className="px-4 py-3 font-medium">
                                  {t.tableTask}
                                </th>
                                <th className="w-[108px] px-4 py-3 font-medium">
                                  {t.tableOwner}
                                </th>
                                <th className="w-[108px] px-4 py-3 text-right font-medium">
                                  {t.tableDue}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.tegevused.map((row, i) => (
                                <tr
                                  key={`${row.kirjeldus}-${i}`}
                                  className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_55%,transparent)]"
                                >
                                  <td className="px-4 py-3.5 leading-snug text-[var(--fg)]">
                                    {row.kirjeldus}
                                  </td>
                                  <td className="px-4 py-3.5 text-[var(--foreground-muted)]">
                                    {row.vastutaja}
                                  </td>
                                  <td className="px-4 py-3.5 text-right tabular-nums text-[var(--foreground-subtle)]">
                                    {row.tahtaeg}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </PremiumResultCard>
                    </motion.div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <motion.div variants={itemVariants}>
                        <PremiumResultCard
                          title={t.sectionVastutajad}
                          icon={<IconPeople />}
                          copyText={formatVastutajadPlain(result)}
                        >
                          <ul className="space-y-5">
                            {result.vastutajad.map((v) => (
                              <li key={v.nimi}>
                                <p className="text-[14px] font-semibold text-[var(--fg)]">
                                  {v.nimi}
                                  <span className="ml-1.5 text-[12px] font-normal text-[var(--foreground-subtle)]">
                                    ({v.tegevusteArv}{" "}
                                    {v.tegevusteArv === 1 ? "tegevus" : "tegevust"})
                                  </span>
                                </p>
                                <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                                  {v.ulesanded.map((u) => (
                                    <li key={u}>· {u}</li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </PremiumResultCard>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <PremiumResultCard
                          title={t.sectionTahtajad}
                          icon={<IconCalendar />}
                          copyText={formatTahtajadPlain(result)}
                        >
                          <ul className="space-y-5">
                            {result.tahtajad.map((g) => (
                              <li key={g.tahtaeg}>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[rgb(var(--accent-bright))]">
                                  {g.tahtaeg}
                                </p>
                                <ul className="mt-2.5 space-y-2 text-[14px] text-[var(--foreground-muted)]">
                                  {g.read.map((row, i) => (
                                    <li key={`${row.kirjeldus}-${i}`}>
                                      <span className="font-medium text-[var(--fg)]">
                                        {row.vastutaja}:
                                      </span>{" "}
                                      {row.kirjeldus}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </PremiumResultCard>
                      </motion.div>
                    </div>

                    {result.lahtisedKusimused.length > 0 ? (
                      <motion.div className="mt-6" variants={itemVariants}>
                        <PremiumResultCard
                          title={t.sectionLahtised}
                          icon={<IconHelp />}
                          copyText={result.lahtisedKusimused.join("\n")}
                          copyLabel={t.copyLahtised}
                        >
                          <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                            {result.lahtisedKusimused.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ul>
                        </PremiumResultCard>
                      </motion.div>
                    ) : null}

                    <motion.div className="mt-6" variants={itemVariants}>
                      <PremiumResultCard
                        title={t.sectionJarelkiri}
                        icon={<IconMail />}
                        copyText={result.jarelkiri}
                        copyLabel={t.copyJarelkiri}
                        copySuccessLabel={t.copiedJarelkiri}
                      >
                        <div className="flex flex-wrap gap-2 pb-4">
                          <StudioCopyButton
                            text={result.emailTeema}
                            label={t.copySubject}
                            size="sm"
                            className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-[12px] text-[var(--foreground-muted)] hover:text-[var(--fg)]"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
                            {t.sectionEmailTeema}
                          </p>
                          <p className="mt-2 text-[15px] font-medium leading-snug text-[var(--fg)]">
                            {result.emailTeema}
                          </p>
                        </div>
                        <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-[color-mix(in_srgb,var(--border)_85%,transparent)] bg-[var(--bg-elevated)] p-4 font-mono text-[12px] leading-relaxed text-[var(--foreground-muted)] sm:text-[13px]">
                          {result.jarelkiri}
                        </pre>
                      </PremiumResultCard>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-6 pb-2">
                      <p className="text-[12px] font-medium text-[var(--foreground-subtle)]">
                        {t.successHint}
                      </p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="flex flex-1 flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                  >
                    <EmptyExecutionCanvas />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionContainer>
        </motion.main>
      </div>
    </div>
  );
}
