import type { StudioTulemus } from "@/lib/studio/types";

/** Üks plokk teksti kopeerimiseks (e-post, Slack jne). */
export function formatStudioPlainExport(r: StudioTulemus): string {
  const tegevused = r.tegevused
    .map(
      (row) =>
        `• ${row.kirjeldus}\n  Vastutaja: ${row.vastutaja} · Tähtaeg: ${row.tahtaeg}`,
    )
    .join("\n\n");

  const vastutajad = r.vastutajad
    .map((v) => {
      const rows = v.ulesanded.map((u) => `    – ${u}`).join("\n");
      return `${v.nimi} (${v.tegevusteArv} tegevust)\n${rows}`;
    })
    .join("\n\n");

  const tahtajad = r.tahtajad
    .map((g) => {
      const read = g.read
        .map((x) => `  – ${x.vastutaja}: ${x.kirjeldus}`)
        .join("\n");
      return `${g.tahtaeg}:\n${read}`;
    })
    .join("\n\n");

  const otsusedBlock =
    r.otsused.length > 0
      ? ["", "Otsused", "—", r.otsused.map((x) => `• ${x}`).join("\n")]
      : [];

  const lahtisedBlock =
    r.lahtisedKusimused.length > 0
      ? [
          "",
          "Lahtised küsimused",
          "—",
          r.lahtisedKusimused.join("\n"),
        ]
      : [];

  return [
    "Kokkuvõte",
    "—",
    r.kokkuvote || "—",
    ...otsusedBlock,
    "",
    "Tegevused",
    "—",
    tegevused || "—",
    "",
    "Vastutajad",
    "—",
    vastutajad || "—",
    "",
    "Tähtajad",
    "—",
    tahtajad || "—",
    ...lahtisedBlock,
    "",
    "Kirja teema",
    "—",
    r.emailTeema || "—",
    "",
    "Järelkiri",
    "—",
    r.jarelkiri,
  ].join("\n");
}

/** Slack / kiirkanal — lühidalt, loetav. */
export function formatSlackExport(r: StudioTulemus): string {
  const lines = [
    `*Kokkuvõte*\n${r.kokkuvote || "—"}`,
    "",
  ];
  if (r.otsused.length) {
    lines.push("*Otsused*", ...r.otsused.map((o) => `• ${o}`), "");
  }
  lines.push(
    "*Tegevused*",
    ...r.tegevused.map(
      (row) =>
        `• ${row.kirjeldus} _(${row.vastutaja} · ${row.tahtaeg})_`,
    ),
  );
  if (r.lahtisedKusimused.length) {
    lines.push("", "*Lahtised küsimused*", ...r.lahtisedKusimused.map((q) => `• ${q}`));
  }
  lines.push("", `*Järelkiri*\n\`\`\`\n${r.jarelkiri}\n\`\`\``);
  return lines.join("\n");
}

/** E-kirja sisu (ilma teemareata) — kopeerimiseks posti keresse. */
export function formatEmailBodyExport(r: StudioTulemus): string {
  return r.jarelkiri
    .trim()
    .replace(/^Teema:\s*.+(\r?\n)+/i, "")
    .trim();
}

/** Tiimile lühike ülevaade — kiirsõnum, stand-up. */
export function formatTeamBriefExport(r: StudioTulemus): string {
  const top = r.tegevused
    .slice(0, 5)
    .map((x) => `• ${x.vastutaja}: ${x.kirjeldus} (${x.tahtaeg})`)
    .join("\n");
  return [
    "Koosolekujärgne plaan:",
    "",
    top,
    "",
    r.kokkuvote
      ? `Kokkuvõte: ${r.kokkuvote.split("\n")[0]}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatTegevusedPlain(r: StudioTulemus): string {
  return r.tegevused
    .map(
      (row) =>
        `${row.kirjeldus}\n  Vastutaja: ${row.vastutaja} · Tähtaeg: ${row.tahtaeg}`,
    )
    .join("\n\n");
}

export function formatVastutajadPlain(r: StudioTulemus): string {
  return r.vastutajad
    .map((v) => {
      const lines = v.ulesanded.map((u) => `  • ${u}`).join("\n");
      return `${v.nimi} (${v.tegevusteArv})\n${lines}`;
    })
    .join("\n\n");
}

export function formatTahtajadPlain(r: StudioTulemus): string {
  return r.tahtajad
    .map((g) => {
      const lines = g.read
        .map((x) => `  • ${x.vastutaja}: ${x.kirjeldus}`)
        .join("\n");
      return `${g.tahtaeg}\n${lines}`;
    })
    .join("\n\n");
}

export function formatOtsusedPlain(r: StudioTulemus): string {
  return r.otsused.map((x) => `• ${x}`).join("\n");
}
