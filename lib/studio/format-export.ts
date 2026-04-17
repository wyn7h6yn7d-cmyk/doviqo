import type { StudioTulemus } from "@/lib/studio/types";

/** Üks plokk teksti kopeerimiseks (e-post, Slack, märkmik). */
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

  return [
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
    "",
    "Kokkuvõte",
    "—",
    r.kokkuvote,
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
