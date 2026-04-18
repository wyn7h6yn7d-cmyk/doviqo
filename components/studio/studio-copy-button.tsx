"use client";

import { useCallback, useState } from "react";

import { studioUi as t } from "@/lib/studio/copy";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  label?: string;
  /** Kopeeritud oleku tekst — võib olla pikem, nt „Kopeeritud — kleebi meili“. */
  successLabel?: string;
  className?: string;
  size?: "sm" | "md";
  /** Töövoo riba jaoks: esmane = selge tegevus, tuim = teine kanal (nt Slack). */
  variant?: "inline" | "workflow" | "workflowMuted";
};

const variantBase = {
  inline: "",
  workflow:
    "min-h-[2.85rem] w-full justify-center whitespace-normal rounded-xl border border-[rgb(var(--accent)/0.3)] bg-[linear-gradient(165deg,rgb(var(--accent)/0.14)_0%,color-mix(in_srgb,var(--surface-raised)_50%,transparent)_100%)] px-3 py-2.5 text-center text-[13px] font-semibold leading-snug text-[var(--fg)] text-pretty shadow-[inset_0_1px_0_rgb(255,255,255,0.06)] hover:border-[rgb(var(--accent-cyan)/0.35)] hover:bg-[rgb(var(--accent)/0.2)] hover:text-[var(--fg)]",
  workflowMuted:
    "min-h-10 w-full justify-center whitespace-normal rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-raised)_90%,transparent)] px-3 py-2 text-center text-[13px] font-medium leading-snug text-pretty text-[var(--foreground-muted)] hover:border-[rgb(var(--accent)/0.25)] hover:bg-[var(--surface-muted)] hover:text-[var(--fg)]",
};

export function StudioCopyButton({
  text,
  label = t.copy,
  successLabel,
  className,
  size = "sm",
  variant = "inline",
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  }, [text]);

  const show =
    copied && successLabel ? successLabel : copied ? t.copied : label;

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-cyan)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        variant === "inline" &&
          "rounded-lg font-medium text-[rgb(var(--accent-bright))] hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--accent-cyan))]",
        variant !== "inline" && variantBase[variant],
        size === "sm" && variant === "inline" ? "px-2 py-1 text-[11px]" : null,
        size === "md" &&
          variant === "inline" &&
          "px-3 py-1.5 text-[12px]",
        className,
      )}
      aria-live="polite"
    >
      {copied ? (
        <span
          className="inline-block size-1.5 shrink-0 rounded-full bg-[rgb(var(--accent-cyan))] shadow-[0_0_8px_rgb(var(--accent-cyan)/0.6)]"
          aria-hidden
        />
      ) : null}
      <span className={cn(copied && "text-[rgb(var(--accent-bright))]")}>
        {show}
      </span>
    </button>
  );
}
