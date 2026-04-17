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
  formatStudioPlainExport,
  formatTahtajadPlain,
  formatTegevusedPlain,
  formatVastutajadPlain,
} from "@/lib/studio/format-export";
import {
  STUDIO_PROCESS_MILESTONES_MS,
  STUDIO_PROCESS_TOTAL_MS,
} from "@/lib/studio/run-studio";
import { transformStudioInput } from "@/lib/studio/service";
import type { StudioTulemus } from "@/lib/studio/types";
import { studioUi as t, sampleNotes } from "@/lib/studio/copy";
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
                ? "border-indigo-400/60 bg-indigo-50 text-indigo-800"
                : "border-[var(--border-strong)] bg-white text-[var(--foreground-subtle)]",
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
      className="rounded-[1.1rem] border border-[var(--border)] bg-white p-6 shadow-card"
      role="status"
      aria-busy="true"
      aria-label={t.loadingTitle}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 animate-spin rounded-full border-2 border-[var(--border-strong)] border-t-indigo-600"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-[var(--fg)]">{t.loadingTitle}</p>
          <p className="mt-0.5 text-[13px] text-[var(--foreground-muted)]">
            {t.loadingHint}
          </p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--surface-muted)_65%,white)]">
            <motion.div
              key={loadCycle}
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"
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
      <div className="mt-8 space-y-3" aria-hidden>
        <div className="h-3 w-2/3 animate-pulse rounded bg-[color-mix(in_srgb,var(--surface-muted)_80%,white)]" />
        <div className="h-24 animate-pulse rounded-xl bg-[var(--surface-muted)]/80" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse rounded-xl bg-[var(--surface-muted)]/70" />
          <div className="h-20 animate-pulse rounded-xl bg-[var(--surface-muted)]/70" />
        </div>
      </div>
    </div>
  );
}

function TransformStrip({ result }: { result: StudioTulemus }) {
  const s = result.summary;
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-[1.05rem] border border-[var(--border)] bg-gradient-to-br from-white via-[color-mix(in_srgb,white_88%,var(--surface-muted))] to-white px-5 py-4 shadow-float"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl"
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-900/75">
        {t.transformStripLabel}
      </p>
      <p className="mt-2 text-[16px] font-semibold tracking-[-0.025em] text-[var(--fg)]">
        {s.rawLineCount} märkme rida → {s.structuredItemCount} tegevust
      </p>
      <p className="mt-1.5 text-[13px] text-[var(--foreground-muted)]">
        {s.uniqueVastutajad} vastutajat · {s.tahtaegadega} tähtajaga ·{" "}
        {s.rawCharCount.toLocaleString("et-EE")} märki
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--foreground-subtle)]">
        {t.transformStripHint}
      </p>
    </motion.div>
  );
}

function EmptyState({ onSample }: { onSample: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.15rem] border border-dashed border-[var(--border-strong)] bg-[color-mix(in_srgb,white_96%,var(--bg-elevated))] px-6 py-14 text-center shadow-soft-sm">
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-white shadow-float"
        aria-hidden
      >
        <svg
          className="h-7 w-7 text-[rgb(var(--accent)/0.85)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <p className="text-base font-semibold text-[var(--fg)]">{t.emptyTitle}</p>
      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[var(--foreground-muted)]">
        {t.emptyBody}
      </p>
      <Button type="button" onClick={onSample} className="mt-6 min-h-11 px-6">
        {t.emptyCta}
      </Button>
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
    <section className="overflow-hidden rounded-[1.05rem] border border-[var(--border)] bg-white shadow-float">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_45%,white)] px-4 py-3">
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
    <section className="overflow-hidden rounded-[1.05rem] border border-[var(--border)] bg-white shadow-float">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_45%,white)] px-4 py-3">
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
  const notesFieldId = useId();
  const notesHintId = `${notesFieldId}-hint`;
  const notesErrId = `${notesFieldId}-err`;
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadCycle, setLoadCycle] = useState(0);
  const [result, setResult] = useState<StudioTulemus | null>(null);

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
      const out = await transformStudioInput(trimmed);
      setResult(out);
    } finally {
      setLoading(false);
    }
  }, [input]);

  const fillSample = useCallback(() => {
    setInput(sampleNotes);
    setError(null);
    setResult(null);
  }, []);

  const resetAll = useCallback(() => {
    setInput("");
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
    <div className="bg-page-studio flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_10px_40px_-16px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <SectionContainer className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-[1.45rem]">
              {t.productName}
            </h1>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[var(--foreground-muted)]">
              {t.workspaceSubtitle}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-indigo-200/50 bg-indigo-50/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-900/85">
                {t.demoBadge}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--foreground-subtle)]">
                {t.localBadge}
              </span>
            </div>
          </div>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium"
            aria-label="Studio navigeerimine"
          >
            <Link
              href="/#waitlist"
              className="text-indigo-600 transition hover:text-indigo-800"
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
      </header>

      <SectionContainer className="flex flex-1 flex-col py-8 sm:py-10">
        <div
          className="mb-8 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3.5 text-[13px] leading-relaxed text-[var(--foreground-muted)] shadow-soft-sm"
          role="note"
        >
          <p>
            <span className="font-semibold text-[var(--fg)]">{t.demoBadge}. </span>
            {t.demoNotice}
          </p>
        </div>

        <div className="grid flex-1 gap-8 xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)] xl:gap-10">
          <motion.div
            className="flex flex-col"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASE_PREMIUM }}
          >
            <div className="rounded-[1.1rem] border border-[var(--border)] bg-white p-5 shadow-card sm:p-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
                  {t.inputLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--fg)]">
                  {t.inputLabelLong}
                </p>
              </div>

              <label htmlFor="studio-notes" className="sr-only">
                {t.inputLabelLong}
              </label>
              <textarea
                id="studio-notes"
                value={input}
                onChange={(e) => {
                  const next = e.target.value;
                  setInput(next);
                  setError(null);
                  if (!next.trim()) setResult(null);
                }}
                placeholder={t.placeholder}
                rows={18}
                aria-invalid={error ? true : undefined}
                aria-describedby={
                  error ? `${notesHintId} ${notesErrId}` : notesHintId
                }
                className={cn(
                  "mt-4 min-h-[min(360px,50vh)] w-full resize-y rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 font-mono text-[13px] leading-relaxed text-[var(--fg)] shadow-[inset_0_1px_1px_rgba(15,23,42,0.03)]",
                  "placeholder:text-[var(--foreground-subtle)] outline-none transition",
                  "hover:border-[color-mix(in_srgb,var(--border-strong)_75%,rgb(var(--accent)))]",
                  "focus:border-[rgb(var(--accent)/0.38)] focus:shadow-[inset_0_1px_1px_rgba(15,23,42,0.02),0_0_0_3px_rgb(var(--accent)/0.1)]",
                  error &&
                    "border-rose-300/90 focus:border-rose-400 focus:shadow-[inset_0_1px_1px_rgba(15,23,42,0.02),0_0_0_3px_rgba(244,63,94,0.12)]",
                )}
                spellCheck={false}
              />

              <p
                id={notesHintId}
                className="mt-3 text-[12px] leading-relaxed text-[var(--foreground-subtle)]"
              >
                {t.inputHint}
              </p>

              {error ? (
                <p
                  id={notesErrId}
                  className="mt-4 text-sm font-medium text-rose-600"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div className="mt-5 rounded-xl border border-[color-mix(in_srgb,rgb(var(--accent))_14%,var(--border))] bg-[color-mix(in_srgb,var(--bg-elevated)_70%,white)] p-4 shadow-soft-sm sm:p-5">
                <p className="text-[13px] font-semibold text-[var(--fg)]">{t.sampleTitle}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--foreground-muted)]">
                  {t.sampleBody}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={fillSample}
                  className="mt-4 min-h-11"
                >
                  {t.sampleBtn}
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  onClick={runProcess}
                  disabled={loading}
                  className="min-h-12 min-w-[12rem] px-7 text-[15px] font-semibold"
                  aria-busy={loading}
                >
                  {loading ? t.processing : t.processBtn}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetAll}
                  disabled={
                    loading || (!input.trim() && !result && !error)
                  }
                >
                  {t.resetBtn}
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-[420px] flex-col"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.reveal,
              ease: EASE_PREMIUM,
              delay: 0.04,
            }}
          >
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
                  {t.outputTitle}
                </p>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{t.outputHint}</p>
              </div>
              {hasSuccess ? (
                <StudioCopyButton
                  text={exportAll}
                  label={t.copyAll}
                  size="md"
                  className="rounded-lg border border-indigo-200/70 bg-indigo-50/80 px-3 py-2 text-indigo-950/90 hover:bg-indigo-50"
                />
              ) : null}
            </div>

            <div
              className="flex flex-1 flex-col"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                  >
                    <LoadingPanel loadCycle={loadCycle} />
                  </motion.div>
                ) : hasSuccess && result ? (
                  <motion.div
                    key="result"
                    className="space-y-5"
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                  >
                    <TransformStrip result={result} />
                    <motion.div variants={itemVariants}>
                    <ResultSection
                      title={t.sectionTegevused}
                      copyText={formatTegevusedPlain(result)}
                    >
                      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                        <table className="w-full min-w-[480px] text-left text-[13px]">
                          <thead>
                            <tr className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_55%,white)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-subtle)]">
                              <th className="px-3 py-2.5 font-medium">{t.tableTask}</th>
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
                                className="border-t border-[var(--border)] bg-white"
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

                  <div className="grid gap-5 lg:grid-cols-2">
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
                              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-indigo-900/80">
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

                  <motion.div variants={itemVariants}>
                    <ResultSection title={t.sectionKokkuvote} copyText={result.kokkuvote}>
                      <p className="text-[14px] leading-relaxed text-[var(--foreground-muted)]">
                        {result.kokkuvote}
                      </p>
                    </ResultSection>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <JarelkiriBlock result={result} />
                  </motion.div>
                </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE_PREMIUM }}
                  >
                    <EmptyState onSample={fillSample} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
}
