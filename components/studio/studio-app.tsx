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
  formatEmailBodyExport,
  formatSlackExport,
  formatStudioPlainExport,
  formatTahtajadPlain,
  formatTeamBriefExport,
  formatTegevusedPlain,
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
      className="relative overflow-hidden rounded-2xl border border-[rgb(var(--accent-cyan)/0.28)] bg-[linear-gradient(135deg,rgb(var(--accent)/0.22)_0%,rgba(14,17,24,0.94)_48%,rgba(8,10,16,0.92)_100%)] px-5 py-6 shadow-[0_0_60px_-22px_rgb(var(--accent)/0.45)] sm:px-7 sm:py-7"
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.2)_0%,transparent_70%)] blur-2xl"
        aria-hidden
      />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-bright))]">
        {t.transformStripLabel}
      </p>
      <p className="relative mt-3 text-[clamp(1.05rem,2.6vw,1.35rem)] font-semibold leading-snug tracking-[-0.03em] text-[var(--fg)]">
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
    <div className="flex min-h-[min(420px,52vh)] flex-col justify-center px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] text-[22px] shadow-[0_0_40px_-12px_rgb(var(--accent)/0.5)]"
          aria-hidden
        >
          ◇
        </div>
        <p className="text-[17px] font-semibold text-[var(--fg)]">{t.emptyTitle}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
          {t.emptyBody}
        </p>
      </div>
      <div className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {studioEmotionalPillars.map((row) => (
          <div
            key={row.before}
            className="rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-muted)_45%,transparent)] px-4 py-3.5 text-center"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
              {row.before}
            </p>
            <p
              className="mt-2 text-[12px] text-[var(--foreground-muted)]"
              aria-hidden
            >
              →
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[rgb(var(--accent-bright))]">
              {row.after}
            </p>
          </div>
        ))}
      </div>
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
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="sr-only">{t.meetingTypeLabel}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {studioDemoPresets.map((p) => {
            const selected = value === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange(p.id)}
                className={cn(
                  "group relative flex min-h-[4.5rem] flex-col justify-center rounded-2xl border px-3 py-3 text-left transition duration-200 sm:min-h-[4.75rem] sm:px-4",
                  selected
                    ? "border-[rgb(var(--accent-cyan)/0.55)] bg-[rgb(var(--accent)/0.16)] text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_1px_rgb(var(--accent)/0.35),0_16px_42px_-22px_rgb(var(--accent)/0.55)]"
                    : "border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-[var(--foreground-muted)] hover:border-[rgb(var(--accent)/0.4)] hover:bg-[color-mix(in_srgb,var(--surface-raised)_90%,transparent)] hover:text-[var(--fg)]",
                )}
                aria-pressed={selected}
              >
                {selected ? (
                  <span
                    className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--accent-cyan)/0.35)] text-[10px] font-bold text-[var(--fg)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                ) : null}
                <span className="pr-6 text-[13px] font-semibold leading-snug sm:text-[14px]">
                  {p.title}
                </span>
                <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)]">
                  {selected ? "Valitud kontekst" : "Struktuur + toon"}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function QuickCopyActions({ result }: { result: StudioTulemus }) {
  const slack = useMemo(() => formatSlackExport(result), [result]);
  const emailBody = useMemo(() => formatEmailBodyExport(result), [result]);
  const team = useMemo(() => formatTeamBriefExport(result), [result]);

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-muted)_35%,transparent)] p-4 sm:p-5"
      role="group"
      aria-label={t.quickActionsLabel}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
        {t.quickActionsLabel}
      </p>
      <div className="flex flex-wrap gap-2">
        <StudioCopyButton
          text={result.kokkuvote}
          label={t.copyKokkuvote}
          size="md"
          className="rounded-lg border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.08)] px-3 py-2 text-[var(--fg)] hover:bg-[rgb(var(--accent)/0.14)]"
        />
        <StudioCopyButton
          text={result.jarelkiri}
          label={t.copyJarelkiri}
          size="md"
          className="rounded-lg border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.08)] px-3 py-2 text-[var(--fg)] hover:bg-[rgb(var(--accent)/0.14)]"
        />
        <StudioCopyButton
          text={slack}
          label={t.copySlack}
          size="md"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-[13px] text-[var(--foreground-muted)] hover:text-[var(--fg)]"
        />
        <StudioCopyButton
          text={emailBody}
          label={t.copyEmail}
          size="md"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-[13px] text-[var(--foreground-muted)] hover:text-[var(--fg)]"
        />
        <StudioCopyButton
          text={team}
          label={t.copyTeam}
          size="md"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2 text-[13px] text-[var(--foreground-muted)] hover:text-[var(--fg)]"
        />
      </div>
    </div>
  );
}

function ResultSection({
  title,
  copyText,
  copyLabel = t.copySection,
  children,
}: {
  title: string;
  copyText: string;
  copyLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="glass-panel edge-lit overflow-hidden rounded-xl">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-muted)_55%,transparent)] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
          {title}
        </h2>
        <StudioCopyButton text={copyText} label={copyLabel} />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function JarelkiriBlock({ result }: { result: StudioTulemus }) {
  return (
    <section className="glass-panel edge-lit overflow-hidden rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-muted)_55%,transparent)] px-4 py-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
          {t.sectionJarelkiri}
        </h2>
        <div className="flex flex-wrap gap-2">
          <StudioCopyButton text={result.emailTeema} label={t.copySubject} size="sm" />
          <StudioCopyButton
            text={result.jarelkiri}
            label={t.copyJarelkiri}
            size="sm"
            className="font-medium"
          />
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-subtle)]">
            {t.sectionEmailTeema}
          </p>
          <p className="mt-1.5 text-[14px] font-medium leading-snug text-[var(--fg)]">
            {result.emailTeema}
          </p>
        </div>
        <pre className="whitespace-pre-wrap rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-[12px] leading-relaxed text-[var(--foreground-muted)] sm:text-[13px]">
          {result.jarelkiri}
        </pre>
      </div>
    </section>
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

  const hasSuccess =
    result !== null && result.tegevused.length > 0 && !loading;

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg-deep)]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,rgb(var(--accent)/0.16),transparent_58%),radial-gradient(ellipse_70%_42%_at_100%_12%,rgb(var(--accent-cyan)/0.09),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_42%,black,transparent)]"
        aria-hidden
      />

      <header className="sticky top-0 z-50 border-b border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--bg-elevated)_88%,transparent)] shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_20px_56px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <SectionContainer className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-gradient-accent text-[10px] font-semibold uppercase tracking-[0.16em]">
              {t.studioEyebrow}
            </p>
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
        <div className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_40%,transparent)]">
          <SectionContainer className="py-2.5">
            <p className="text-[12px] leading-relaxed text-[var(--foreground-muted)]">
              {t.demoNotice}
            </p>
          </SectionContainer>
        </div>
      </header>

      <section className="relative z-10 border-b border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_55%,var(--bg-deep))] py-5 sm:py-7">
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
        </SectionContainer>
      </section>

      <div className="relative z-10 flex flex-1 flex-col lg:flex-row lg:items-stretch">
        <motion.aside
          className="flex w-full flex-col border-b border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--bg)_94%,black)] lg:w-[min(100%,420px)] lg:shrink-0 lg:border-b-0 lg:border-r"
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
          className="relative flex min-h-[min(520px,62vh)] flex-1 flex-col border-[var(--border)] bg-[linear-gradient(180deg,rgba(10,12,18,0.65)_0%,rgba(8,10,16,0.92)_38%,var(--bg-deep)_100%)] lg:min-h-[calc(100vh-13rem)]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.reveal,
            ease: EASE_PREMIUM,
            delay: 0.05,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_70%_-8%,rgb(var(--accent)/0.12),transparent_55%)]"
            aria-hidden
          />
          <SectionContainer className="relative flex flex-1 flex-col py-6 lg:py-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-bright))]">
                  {t.outputTitle}
                </p>
                <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                  {t.outputHint}
                </p>
              </div>
              {hasSuccess ? (
                <StudioCopyButton
                  text={exportAll}
                  label={t.copyAll}
                  size="md"
                  className="rounded-xl border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.14)] px-4 py-2.5 text-[13px] font-semibold text-[var(--fg)] shadow-[0_0_36px_-14px_rgb(var(--accent)/0.55)] hover:bg-[rgb(var(--accent)/0.22)]"
                />
              ) : null}
            </div>

            <div
              className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[rgb(var(--accent)/0.18)] bg-[color-mix(in_srgb,var(--surface)_42%,transparent)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_-32px_rgba(0,0,0,0.75),0_0_100px_-40px_rgb(var(--accent)/0.35)] backdrop-blur-md"
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
                ) : hasSuccess && result ? (
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

                    <motion.div className="mt-5" variants={itemVariants}>
                      <QuickCopyActions result={result} />
                    </motion.div>

                    <motion.div className="mt-5" variants={itemVariants}>
                      <ResultSection
                        title={t.sectionKokkuvote}
                        copyText={result.kokkuvote}
                        copyLabel={t.copyKokkuvote}
                      >
                        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                          {result.kokkuvote}
                        </p>
                      </ResultSection>
                    </motion.div>

                    <motion.div className="mt-5" variants={itemVariants}>
                      <ResultSection
                        title={t.sectionTegevused}
                        copyText={formatTegevusedPlain(result)}
                      >
                        <div className="overflow-x-auto rounded-xl border border-[var(--border-strong)]">
                          <table className="w-full min-w-[480px] text-left text-[13px]">
                            <thead>
                              <tr className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_75%,transparent)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
                                <th className="px-3 py-2.5 font-medium">
                                  {t.tableTask}
                                </th>
                                <th className="w-[100px] px-3 py-2.5 font-medium">
                                  {t.tableOwner}
                                </th>
                                <th className="w-[104px] px-3 py-2.5 text-right font-medium">
                                  {t.tableDue}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.tegevused.map((row, i) => (
                                <tr
                                  key={`${row.kirjeldus}-${i}`}
                                  className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]"
                                >
                                  <td className="px-3 py-3 leading-snug text-[var(--fg)]">
                                    {row.kirjeldus}
                                  </td>
                                  <td className="px-3 py-3 text-[var(--foreground-muted)]">
                                    {row.vastutaja}
                                  </td>
                                  <td className="px-3 py-3 text-right tabular-nums text-[var(--foreground-subtle)]">
                                    {row.tahtaeg}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </ResultSection>
                    </motion.div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      <motion.div variants={itemVariants}>
                        <ResultSection
                          title={t.sectionVastutajad}
                          copyText={formatVastutajadPlain(result)}
                        >
                          <ul className="space-y-4">
                            {result.vastutajad.map((v) => (
                              <li key={v.nimi}>
                                <p className="text-[13px] font-semibold text-[var(--fg)]">
                                  {v.nimi}
                                  <span className="ml-1.5 font-normal text-[var(--foreground-subtle)]">
                                    ({v.tegevusteArv}{" "}
                                    {v.tegevusteArv === 1 ? "tegevus" : "tegevust"})
                                  </span>
                                </p>
                                <ul className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                                  {v.ulesanded.map((u) => (
                                    <li key={u}>· {u}</li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </ResultSection>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <ResultSection
                          title={t.sectionTahtajad}
                          copyText={formatTahtajadPlain(result)}
                        >
                          <ul className="space-y-4">
                            {result.tahtajad.map((g) => (
                              <li key={g.tahtaeg}>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[rgb(var(--accent-bright))]">
                                  {g.tahtaeg}
                                </p>
                                <ul className="mt-2 space-y-2 text-[13px] text-[var(--foreground-muted)]">
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
                        </ResultSection>
                      </motion.div>
                    </div>

                    {result.lahtisedKusimused.length > 0 ? (
                      <motion.div className="mt-5" variants={itemVariants}>
                        <ResultSection
                          title={t.sectionLahtised}
                          copyText={result.lahtisedKusimused.join("\n")}
                        >
                          <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                            {result.lahtisedKusimused.map((q) => (
                              <li key={q}>{q}</li>
                            ))}
                          </ul>
                        </ResultSection>
                      </motion.div>
                    ) : null}

                    <motion.div className="mt-5" variants={itemVariants}>
                      <JarelkiriBlock result={result} />
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
