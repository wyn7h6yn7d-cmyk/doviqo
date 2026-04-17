/** Järelkirja sisu (toote eelvaade). */
export function EmailDraftCard({ body }: { body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <p className="whitespace-pre-line text-sm leading-7 text-white/78">
        {body}
      </p>
    </div>
  );
}
