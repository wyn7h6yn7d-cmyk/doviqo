import type {
  StudioTulemus,
  TahtaegGrupp,
  TegevusRida,
  TransformSummary,
  VastutajaInfo,
} from "@/lib/studio/types";
import {
  buildEmailTeema,
  buildJarelkiri,
  buildKokkuvote,
  inferMeetingTone,
  isPresetTitleLine,
  type MeetingToneId,
} from "@/lib/studio/meeting-tone";

/** Levinud eesnimed + demo jaoks laiendatud nimekiri. */
const EESNIMED = new Set([
  "Anna",
  "Martin",
  "Elena",
  "Tomas",
  "Kristjan",
  "Laura",
  "Kaspar",
  "Mari",
  "Jüri",
  "Kadi",
  "Peeter",
  "Jaan",
  "Markus",
  "Sander",
  "Riin",
  "Liis",
  "Elena",
  "Andres",
  "Nora",
  "Kati",
  "Mart",
  "Hendrik",
  "Kristiina",
  "Lisa",
  "Rasmus",
  "Karl",
  "Marten",
  "Siim",
  "Grete",
  "Priit",
  "Margus",
  "Aivar",
  "Külli",
  "Ülle",
  "Ott",
  "Mikk",
  "Triin",
  "Katre",
  "Anu",
  "Jaak",
  "Inga",
  "Timo",
  "Keiu",
  "Raido",
  "Helen",
  "Koit",
  "Erki",
]);

/** Sõnad, mis ei ole isikunimed (ka korduvad päistest). */
const NIMI_BLOKEER = new Set([
  "Analytics",
  "Dashboard",
  "Slack",
  "Investori",
  "Osalejad",
  "Nädalakoosolek",
  "Tiimikoosolek",
  "Koosolek",
  "Järgmine",
  "Teams",
  "Jira",
  "Notion",
]);

function onLikelyEesnimi(w: string): boolean {
  if (NIMI_BLOKEER.has(w)) return false;
  if (w.length < 3 || w.length > 22) return false;
  return /^[A-ZÕÄÖÜ][a-zõäöü'-]+$/.test(w);
}

function normalizeLine(raw: string): string {
  return raw.replace(/^[\s\-–—•*]+/, "").trim();
}

function onTyhiVoiPais(line: string): boolean {
  const l = line.trim();
  if (l.length === 0) return true;
  if (/^osalejad\s*:/i.test(l)) return true;
  if (/^kuupäev\s*:/i.test(l)) return true;
  if (/^kuupäev\s+[0-9]/i.test(l)) return true;
  if (/^kohal\s*:/i.test(l)) return true;
  if (/^päevakord\s*:/i.test(l)) return true;
  if (/^tegevused\s*:?\s*$/i.test(l)) return true;
  if (/^järgmised\s+sammud\s*:?\s*$/i.test(l)) return true;
  if (/^otsused\s*:?\s*$/i.test(l)) return true;
  if (/^action\s+items?\s*:?\s*$/i.test(l)) return true;
  if (/^-{3,}$/.test(l)) return true;
  if (/^nädalakoosolek\s*[—–-]\s*.+$/i.test(l)) return true;
  if (/^nädalakoosolek$/i.test(l)) return true;
  if (/^koosolek\s*[—–-]\s*.+$/i.test(l)) return true;
  if (/^koosolek$/i.test(l)) return true;
  if (/^järgmine\s+koosolek\b/i.test(l)) return true;
  if (/^tiimikoosolek\b/i.test(l)) return true;
  if (/^lisa\s*:\s*/i.test(l)) return true;
  return false;
}

/**
 * Koosoleku pealkiri / päis — üks rida, harva tegevus.
 * Ei filtreeri rida, kus on nimi või tähtaeg (need on tegevused).
 */
function onLikelyPealkiri(line: string): boolean {
  const l = line.trim();
  if (l.length > 140) return false;
  if (/[—–-].{8,}/.test(l) && !/\b(teeb|saadab|koostab|vaatab|lõpetab|tuleb|uuendab|peab|hakkab)\b/i.test(l)) {
    if (/^(?:tiimikoosolek|nädalakoosolek|koosolek)\b/i.test(l)) return true;
    if (/^(?:müük|toode|projekt|sprint)\s*[—–-]/i.test(l)) return true;
  }
  return false;
}

/**
 * Tähtajad — spetsiifilised mustrid enne üldisemaid (nt „ülehomme“ enne „homme“).
 */
function leiaTahtaeg(text: string): string {
  const t = text.toLowerCase();

  const dateNum = text.match(/\b(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\b/);
  if (dateNum) return dateNum[0];

  if (/\bq[1-4]\b/i.test(t)) {
    const m = t.match(/\bq([1-4])\b/i);
    return m ? `Q${m[1]}` : "Q1";
  }

  if (/\bjärgmisel\s+nädalal\b/.test(t)) return "järgmisel nädalal";
  if (/\bjärgmisse\s+nädalasse\b/.test(t)) return "järgmine nädal";
  if (/\bjärgmine\s+nädal\b/.test(t)) return "järgmine nädal";
  if (/\bjärgmine\s+sprint\b/.test(t)) return "järgmine sprint";

  if (/selle\s+nädala\s+lõpuks|nädala\s+lõpuks/.test(t)) return "selle nädala lõpuks";
  if (/kuu\s+lõpuks|kuu\s+lõpus/.test(t)) return "kuu lõpuks";
  if (
    /(aprilli|mai|juuni|juuli|augusti|septembri|oktoobri|novembri|detsembri)\s+lõpuks?/i.test(
      t,
    )
  ) {
    const m = t.match(
      /(aprilli|mai|juuni|juuli|augusti|septembri|oktoobri|novembri|detsembri)\s+lõpuks?/i,
    );
    if (m) return `${m[1]} lõpuks`;
  }

  if (
    /järgmine\s+(esmaspäev|teisipäev|kolmapäev|neljapäev|reede)/.test(t)
  ) {
    const m = t.match(
      /järgmine\s+(esmaspäev|teisipäev|kolmapäev|neljapäev|reede)/i,
    );
    return m ? `järgmine ${m[1]!.toLowerCase()}` : "järgmine nädal";
  }

  if (/\besmaspäeval\b/.test(t)) return "esmaspäeval";
  if (/\bteisipäeval\b/.test(t)) return "teisipäeval";
  if (/\bkolmapäeval\b/.test(t)) return "kolmapäeval";
  if (/\bneljapäeval\b/.test(t)) return "neljapäeval";
  if (/\breedel\b/.test(t)) return "reedel";
  if (/\breedeks\b/.test(t)) return "reedeks";

  if (/\bneljapäevaks\b/.test(t)) return "neljapäevaks";
  if (/\bkolmapäevaks\b/.test(t)) return "kolmapäevaks";
  if (/\besmaspäevaks\b/.test(t)) return "esmaspäevaks";
  if (/\bteisipäevaks\b/.test(t)) return "teisipäevaks";
  if (/\blaupäevaks?\b/.test(t)) return "laupäevaks";
  if (/\bpühapäevaks?\b/.test(t)) return "pühapäevaks";

  if (/\bülehomme\b/.test(t)) return "ülehomme";
  if (/\bhomme\b/.test(t)) return "homme";
  if (/\btäna\b/.test(t)) return "täna";
  if (/\bõhtuks\b/.test(t)) return "õhtuks";
  if (/homseks\s+õhtuks|tänaseks\s+õhtuks/.test(t)) return "õhtuks";

  return "—";
}

const EESNIMI_VERB =
  /^([A-ZÕÄÖÜ][a-zõäöü'-]{2,})\s+(?:teeb|teeb\s+üle|saadab|võtab|viib|viima|vaatab|kinnitab|koostab|kirjutab|uuendab|täidab|korraldab|organiseerib|vastutab|tegeleb|teostab|valmistab|lisab|eemaldab|parandab|kontrollib|paigaldab|testib|ühendab|esitleb|koondab|lõpetab|lükkab|tuleb|peab|hakkab|jätkab|annab|küsib|koostada|saata|paneme|panen|toimetab|kavandab)\b/i;

function leiaEesnimi(text: string): string | null {
  const start = text.match(/^([A-ZÕÄÖÜ][a-zõäöü'-]{2,})\s*[—–\-:]\s*/);
  if (start) {
    const w = start[1]!;
    if (EESNIMED.has(w) || onLikelyEesnimi(w)) return w;
  }

  const leadVerb = text.match(EESNIMI_VERB);
  if (leadVerb) {
    const w = leadVerb[1]!;
    if (EESNIMED.has(w) || onLikelyEesnimi(w)) return w;
  }

  const tail = text.match(
    /\s+(?:[-–—]\s*)?([A-ZÕÄÖÜ][a-zõäöü'-]{2,})\s*[.!?]?\s*$/,
  );
  if (
    tail &&
    (EESNIMED.has(tail[1]!) || onLikelyEesnimi(tail[1]!)) &&
    !/kolmapäev|neljapäev|esmaspäev|reedel|teisipäev/i.test(tail[1]!)
  )
    return tail[1]!;

  const re = /\b([A-ZÕÄÖÜ][a-zõäöü'-]{2,})\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = m[1]!;
    if (EESNIMED.has(n) || onLikelyEesnimi(n)) return n;
  }
  return null;
}

function puhastaKirjeldus(line: string, eesnimi: string | null): string {
  let s = line;

  if (eesnimi) {
    s = s.replace(new RegExp(`^\\s*${eesnimi}\\s*[—–\\-:]\\s*`, "i"), "");
    s = s.replace(new RegExp(`\\b${eesnimi}\\b`, "gi"), " ");
    s = s.replace(
      new RegExp(`\\s*[-–—]\\s*${eesnimi}\\s*[.!?]?\\s*$`, "i"),
      "",
    );
  }

  s = s.replace(
    /\s*(?:neljapäeval|neljapäevaks?|kolmapäeval|kolmapäevaks?|esmaspäeval|esmaspäevaks?|teisipäeval|teisipäevaks?|reedel|reedeks|homme|ülehomme|täna|järgmisel\s+nädalal|järgmine\s+nädal|järgmisse\s+nädalasse|järgmine\s+sprint|selle\s+nädala\s+lõpuks|õhtuks|kuu\s+lõpuks).*$/i,
    "",
  );
  s = s.replace(/\b\d{1,2}\.\d{1,2}(?:\.\d{2,4})?\b.*$/i, "");
  s = s.replace(/\s*q[1-4]\b.*$/i, "");
  s = s.replace(/^[\s\-–—:→]+/, "").trim();
  s = s.replace(/\s{2,}/g, " ");

  if (s.length < 2) return line.trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function onJatkeread(line: string): boolean {
  const l = line.trim();
  if (l.length === 0) return false;
  if (/^(ja|ning|samuti|seejärel|lisaks|aga|muide)\b/i.test(l)) return true;
  if (/^[a-zõäöüõä]/.test(l) && l.length < 140 && !leiaEesnimi(l)) return true;
  return false;
}

function liidaRead(eread: string[]): string[] {
  const out: string[] = [];
  for (const raw of eread) {
    const line = normalizeLine(raw);
    if (line.length === 0) continue;
    if (onTyhiVoiPais(line)) continue;

    if (out.length > 0 && onJatkeread(line)) {
      const sep = /^ja\b|^ning\b|^samuti\b/i.test(line.trim()) ? " " : " ";
      out[out.length - 1] = `${out[out.length - 1]}${sep}${line}`;
    } else {
      out.push(line);
    }
  }
  return out;
}

function luhikeUlesanne(kirjeldus: string): string {
  const t = kirjeldus.trim();
  if (t.length <= 56) return t;
  return `${t.slice(0, 53)}…`;
}

function ehitaVastutajad(tegevused: TegevusRida[]): VastutajaInfo[] {
  const map = new Map<string, string[]>();
  for (const row of tegevused) {
    const n = row.vastutaja;
    if (!map.has(n)) map.set(n, []);
    map.get(n)!.push(luhikeUlesanne(row.kirjeldus));
  }
  return Array.from(map.entries()).map(([nimi, ulesanded]) => ({
    nimi,
    tegevusteArv: ulesanded.length,
    ulesanded,
  }));
}

/** Tähtaja rühmade järjestus (varajasem / kriitilisem eespool). */
function tahtaegSortKey(s: string): number {
  const order: Record<string, number> = {
    täna: 1,
    õhtuks: 2,
    homme: 3,
    ülehomme: 4,
    reedel: 10,
    reedeks: 11,
    neljapäeval: 12,
    neljapäevaks: 13,
    kolmapäeval: 14,
    kolmapäevaks: 15,
    esmaspäeval: 16,
    teisipäeval: 17,
    "järgmine nädal": 30,
    "järgmisel nädalal": 31,
    "järgmine sprint": 32,
  };
  if (order[s]) return order[s]!;
  if (s === "—") return 999;
  if (/^\d{1,2}\.\d{1,2}/.test(s)) return 5;
  return 50;
}

function ehitaTahtajad(tegevused: TegevusRida[]): TahtaegGrupp[] {
  const jarjestus: string[] = [];
  const map = new Map<string, TegevusRida[]>();

  for (const row of tegevused) {
    const key = row.tahtaeg;
    if (!map.has(key)) {
      map.set(key, []);
      jarjestus.push(key);
    }
    map.get(key)!.push(row);
  }

  const sorted = [...jarjestus].sort(
    (a, b) => tahtaegSortKey(a) - tahtaegSortKey(b),
  );

  return sorted.map((tahtaeg) => ({
    tahtaeg,
    read: map.get(tahtaeg)!,
  }));
}

function ehitaSummary(
  raw: string,
  actionableLines: number,
  tegevused: TegevusRida[],
): TransformSummary {
  const rawLines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0).length;
  const tahtaegadega = tegevused.filter((t) => t.tahtaeg !== "—").length;
  const uniqueVastutajad = new Set(tegevused.map((t) => t.vastutaja)).size;

  return {
    rawLineCount: rawLines,
    rawCharCount: raw.length,
    actionableLineCount: actionableLines,
    structuredItemCount: tegevused.length,
    uniqueVastutajad,
    tahtaegadega,
  };
}

function filtreeriTegevuseRead(merged: string[]): string[] {
  const filtered = merged.filter((line) => {
    if (onTyhiVoiPais(line)) return false;
    if (onLikelyPealkiri(line)) return false;
    if (isPresetTitleLine(line)) return false;
    return true;
  });
  return filtered.length > 0 ? filtered : merged;
}

/**
 * Otsused (kokkulepped, ajajoondused) ja lahtised küsimused — teksti ja tooni põhjal.
 * Küsimused klassifitseeritakse enne otsuseid, et vältida kattumist.
 */
function extractOtsusedJaLahtised(
  mergedLines: string[],
  tone: MeetingToneId,
): { otsused: string[]; lahtisedKusimused: string[] } {
  const otsused: string[] = [];
  const lahtised: string[] = [];
  const seenO = new Set<string>();
  const seenQ = new Set<string>();

  const norm = (s: string) => s.replace(/\s+/g, " ").trim();

  const pushO = (raw: string) => {
    const x = norm(raw.replace(/^[\s\-–—•*]+/, ""));
    if (x.length < 8 || seenO.has(x)) return;
    seenO.add(x);
    otsused.push(x);
  };
  const pushQ = (raw: string) => {
    const x = norm(raw.replace(/^[\s\-–—•*]+/, ""));
    if (x.length < 6 || seenQ.has(x)) return;
    seenQ.add(x);
    lahtised.push(x);
  };

  for (const line of mergedLines) {
    if (onTyhiVoiPais(line)) continue;
    const t = normalizeLine(line);
    if (t.length < 6 || t.length > 360) continue;

    if (isAssignedActionLine(line)) {
      continue;
    }

    const low = t.toLowerCase();

    if (isOpenQuestionLine(t, low)) {
      pushQ(t);
      continue;
    }

    if (isDecisionLine(t, low, tone)) {
      pushO(t);
    }
  }

  return {
    otsused: otsused.slice(0, 10),
    lahtisedKusimused: lahtised.slice(0, 10),
  };
}

/** Rida, millest tuleb ülesanne (nimi + tegevusverb) — selliseid ei loeta otsuseks. */
function isAssignedActionLine(line: string): boolean {
  const t = line.trim();
  const n = leiaEesnimi(t);
  if (
    n &&
    /\b(teeb|saadab|vaatab|lõpetab|kontrollib|koostab|kirjutab|uurib|valmistab|annab|korraldab|kannab)\b/i.test(
      t,
    )
  ) {
    return true;
  }
  return /^[-–—•*]?\s*[A-ZÕÄÖÜ][a-zõäöü'-]{2,}\s+[—–\-:].+\b(teeb|saadab|vaatab|lõpetab|kontrollib|koostab)\b/i.test(
    t,
  );
}

function isOpenQuestionLine(t: string, low: string): boolean {
  if (t.includes("?")) return true;
  if (
    /\b(vaja kinnitada|vaja täpsust|vaja kontrollida|vaja otsustada|täpsustada|pole veel kindel|pole kindel|selgub alles|selgitada)\b/i.test(
      low,
    )
  ) {
    return true;
  }
  if (/^(kas |miks |kuidas |millal |millises )\b/i.test(low)) return true;
  if (/\b(kas integratsioon|kas jääb|kas onboarding)\b/i.test(low)) return true;
  return false;
}

function isDecisionLine(t: string, low: string, tone: MeetingToneId): boolean {
  if (
    /\b(otsustati|kokku lepitud|kinnitatud|kinnitus|fikseeritud|üksmeelne|kokkulepe|kokkulepp)\b/i.test(
      low,
    )
  ) {
    return true;
  }
  if (/^otsus\s*[—–\-:]/i.test(t.trim())) return true;
  if (/\b(vastu võetud|vastuvõetud)\b/i.test(low)) return true;
  if (/\b(jääb|jäävad)\b.*\b(faasi|scope|bundle|versiooni)\b/i.test(low)) {
    return true;
  }
  if (/\b(lükkub|lükatakse)\b.*\b(nädal|kuu|sprint|nädalasse|nädalas)\b/i.test(low)) {
    return true;
  }
  if (/\b(prioriteet on|fookus on|strategiline suund)\b/i.test(low)) return true;
  if (/\b(otsus\s+võiks|otsus\s+tuleb|otsustatakse hiljemalt)\b/i.test(low)) {
    return true;
  }
  if (
    /\b(järgmises\s+(?:sprindis|nädalas|voorus))\b/i.test(low) &&
    /\b(võtame|teeme|põhifookus)\b/i.test(low)
  ) {
    return true;
  }

  if (
    tone === "project-status" &&
    /\b(launch|käivit|release)\b/i.test(low) &&
    /\b(kuupäev|nihk|paika|ajakava)\b/i.test(low) &&
    !t.includes("?")
  ) {
    return true;
  }
  if (
    tone === "sales-call" &&
    /\b(materjal|hind|etapp|protsess)\b/i.test(low) &&
    /\b(kinnit|kokkulepe|järgmine kontakt)\b/i.test(low)
  ) {
    return true;
  }
  if (
    tone === "client-meeting" &&
    /\b(ulatus|maht|faasis|järgmine etapp)\b/i.test(low) &&
    !/\?/.test(t)
  ) {
    return true;
  }

  return false;
}

export type ProcessMeetingNotesOptions = {
  /** Kui valitud, kirjutab üle automaatse tooni tuvastuse (Studio koosoleku tüüp). */
  toneOverride?: MeetingToneId;
};

export function processMeetingNotes(
  raw: string,
  options?: ProcessMeetingNotesOptions,
): StudioTulemus {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return {
      tegevused: [],
      vastutajad: [],
      tahtajad: [],
      kokkuvote: "",
      jarelkiri: "",
      emailTeema: "",
      otsused: [],
      lahtisedKusimused: [],
      summary: {
        rawLineCount: 0,
        rawCharCount: 0,
        actionableLineCount: 0,
        structuredItemCount: 0,
        uniqueVastutajad: 0,
        tahtaegadega: 0,
      },
    };
  }

  const inferred = inferMeetingTone(trimmed);
  const tone: MeetingToneId =
    options?.toneOverride !== undefined ? options.toneOverride : inferred;

  const split = trimmed.split(/\r?\n/);
  const merged = liidaRead(split);
  const { otsused, lahtisedKusimused } = extractOtsusedJaLahtised(merged, tone);
  const linesToUse = filtreeriTegevuseRead(merged);

  const tegevused: TegevusRida[] = [];

  for (const line of linesToUse) {
    const tahtaeg = leiaTahtaeg(line);
    const eesnimi = leiaEesnimi(line);
    const vastutaja = eesnimi ?? "Tiim";
    const kirjeldus = puhastaKirjeldus(line, eesnimi);

    tegevused.push({
      kirjeldus,
      vastutaja,
      tahtaeg,
    });
  }

  if (tegevused.length === 0) {
    tegevused.push({
      kirjeldus: merged.join(" ").slice(0, 400) || trimmed.slice(0, 400),
      vastutaja: "Tiim",
      tahtaeg: "—",
    });
  }

  const vastutajad = ehitaVastutajad(tegevused);
  const tahtajad = ehitaTahtajad(tegevused);
  const kokkuvote = buildKokkuvote(tegevused, tone);
  const emailTeema = buildEmailTeema(tone);
  const jarelkiri = buildJarelkiri(tegevused, emailTeema, tone);
  const summary = ehitaSummary(trimmed, linesToUse.length, tegevused);

  return {
    tegevused,
    vastutajad,
    tahtajad,
    kokkuvote,
    jarelkiri,
    emailTeema,
    otsused,
    lahtisedKusimused,
    summary,
  };
}
