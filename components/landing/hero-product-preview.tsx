"use client";

import { heroPreview } from "@/lib/site-content";
import { cn } from "@/lib/utils";

/**
 * Premium toote eelvaade: segane järelsisu → tegevused, tähtajad, järelkiri.
 * Staatiline, ei korda Studioga täpset käitumist — müüb visuaalset transformatsiooni.
 */
export function HeroProductPreview({ className }: { className?: string }) {
  const p = heroPreview;

  return (
    <div
      className={cn(
        "glass-panel edge-lit relative overflow-hidden rounded-2xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset,0_28px_64px_-20px_rgba(0,0,0,0.55),0_0_80px_-24px_rgb(var(--accent)/0.35)]",
        className,
      )}
      role="region"
      aria-label="Näidis: segane koosoleku järelsisu muutub tegevusteks, tähtaegadeks ja järelkirjaks"
    >
      <div className="pointer-events-none absolute -right-20 -top-28 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.35)_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-cyan)/0.18)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent-cyan)/0.35)] to-transparent opacity-80" />

      {/* Segane järelsisu */}
      <div className="relative border-b border-[var(--border-strong)] bg-[linear-gradient(165deg,rgba(30,27,45,0.55)_0%,rgba(14,17,24,0.92)_100%)] px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-bright))]">
            {p.messyLabel}
          </p>
          <span className="rounded-md border border-[rgb(var(--accent-cyan)/0.22)] bg-[rgb(var(--accent-cyan)/0.08)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[rgb(var(--accent-cyan))]">
            {p.rawTextBadge}
          </span>
        </div>
        <ul className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed text-[var(--foreground-muted)] sm:text-[12px]">
          {p.messyLines.map((line) => (
            <li
              key={line}
              className="border-l-2 border-[rgb(var(--accent)/0.45)] pl-2.5"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Struktureeritud väljund */}
      <div className="relative space-y-4 bg-[linear-gradient(180deg,rgba(14,17,24,0.65)_0%,rgba(8,10,16,0.4)_100%)] p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(124,92,255)] to-[rgb(79,70,229)] text-[10px] font-bold text-white shadow-[0_0_20px_-4px_rgb(124,92,255/0.6)]">
            D
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-subtle)]">
            {p.outLabel}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-subtle)]">
            {p.actionsTitle}
          </p>
          <div className="mt-2 overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface-raised)] card-edge">
            <table className="w-full text-left text-[11px] sm:text-[12px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-muted)_75%,transparent)] text-[9px] font-semibold uppercase tracking-wide text-[var(--foreground-subtle)]">
                  <th className="px-2.5 py-2">Tegevus</th>
                  <th className="w-[52px] px-1 py-2">Vastutaja</th>
                  <th className="w-[72px] px-1 py-2 text-right">Tähtaeg</th>
                </tr>
              </thead>
              <tbody>
                {p.actions.map((row) => (
                  <tr
                    key={row.owner + row.task}
                    className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)]"
                  >
                    <td className="px-2.5 py-2 leading-snug text-[var(--fg)]">
                      {row.task}
                    </td>
                    <td className="px-1 py-2 text-[var(--foreground-muted)]">
                      {row.owner}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums text-[var(--foreground-subtle)]">
                      {row.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-raised)_95%,transparent)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-subtle)]">
            {p.deadlinesTitle}
          </p>
          <p className="mt-1 text-[12px] font-medium text-[var(--fg)]">
            {p.deadlinesSummary}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--accent)/0.35)] bg-[linear-gradient(135deg,rgb(var(--accent)/0.14)_0%,rgb(var(--accent-cyan)/0.06)_100%)] px-3 py-2.5 shadow-[0_0_32px_-12px_rgb(var(--accent)/0.35)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-bright))]">
            {p.emailTitle}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-[var(--fg)]">
            {p.emailSubject}
          </p>
          <p className="mt-2 whitespace-pre-line border-t border-[rgb(var(--accent)/0.2)] pt-2 font-mono text-[10px] leading-relaxed text-[var(--foreground-muted)] sm:text-[11px]">
            {p.emailPreview}
          </p>
        </div>
      </div>
    </div>
  );
}
