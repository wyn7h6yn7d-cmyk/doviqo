"use client";

import { useCallback, useState } from "react";

import { studioUi as t } from "@/lib/studio/copy";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
};

export function StudioCopyButton({
  text,
  label = t.copy,
  className,
  size = "sm",
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "shrink-0 rounded-lg font-medium text-indigo-600 transition hover:bg-[rgb(var(--accent)/0.08)] hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.28)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        size === "sm" ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]",
        className,
      )}
    >
      {copied ? t.copied : label}
    </button>
  );
}
