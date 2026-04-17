import type {
  StudioTulemus,
  TahtaegGrupp,
  TegevusRida,
  TransformSummary,
  VastutajaInfo,
} from "@/lib/studio/types";

/** Levinud eesnimed (tuvastus demo jaoks; hiljem API / sõnastik). */
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
]);

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
  return false;
}

/**
 * Tähtajad ja kuupäevad — spetsiifilisemad mustrid enne üldisemaid
 * (nt „homme“ ei tohi varastada „ülehomme“).
 */
function leiaTahtaeg(text: string): string {
  const t = text.toLowerCase();

  const dateNum = text.match(/\b(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\b/);
  if (dateNum) return dateNum[0];

  if (/\bq[1-4]\b/i.test(t)) {
    const m = t.match(/\bq([1-4])\b/i);
    return m ? `Q${m[1]}` : "Q1";
  }

  if (/järgmisel\s+nädalal\b/.test(t)) return "järgmisel nädalal";
  if (/järgmisse\s+nädalasse|järgmine\s+nädalasse\b/.test(t)) return "järgmine nädal";
  if (/järgmine\s+nädal\b/.test(t)) return "järgmine nädal";

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

  if (/järgmine\s+(esmaspäev|teisipäev|kolmapäev|neljapäev|reede)/.test(t)) {
    const m = t.match(
      /järgmine\s+(esmaspäev|teisipäev|kolmapäev|neljapäev|reede)/i,
    );
    return m ? `järgmine ${m[1]!.toLowerCase()}` : "järgmine nädal";
  }

  if (/järgmine\s+sprint|järgmises\s+sprintis/.test(t)) return "järgmine sprint";

  if (/neljapäeval|neljapäevaks?|\bneljap\b/.test(t)) return "neljapäevaks";
  if (/kolmapäevaks?|\bkolmap\b/.test(t)) return "kolmapäevaks";
  if (/esmaspäevaks?|\besmasp\b/.test(t)) return "esmaspäevaks";
  if (/teisipäevaks?/.test(t)) return "teisipäevaks";
  if (/\breedel\b/.test(t)) return "reedel";
  if (/reedeks|\breede\b(?!\w)/.test(t)) return "reedeks";
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
  /^([A-ZÕÄÖÜ][a-zõäöü]{2,})\s+(?:teeb|teeb\s+üle|saadab|võtab|viib|viima|vaatab|kinnitab|koostab|kirjutab|uuendab|täidab|korraldab|organiseerib|vastutab|tegeleb|teostab|valmistab|lisab|eemaldab|parandab|kontrollib|paigaldab|testib|ühendab|esitleb|koondab)\b/i;

function leiaEesnimi(text: string): string | null {
  const start = text.match(/^([A-ZÕÄÖÜ][a-zõäöü]{2,})\s*[—–\-:]\s*/);
  if (start && EESNIMED.has(start[1]!)) return start[1]!;

  const leadVerb = text.match(EESNIMI_VERB);
  if (leadVerb && EESNIMED.has(leadVerb[1]!)) return leadVerb[1]!;

  const tail = text.match(
    /\s+(?:[-–—]\s*)?([A-ZÕÄÖÜ][a-zõäöü]{2,})\s*[.!?]?\s*$/,
  );
  if (
    tail &&
    EESNIMED.has(tail[1]!) &&
    !/kolmapäev|neljapäev|esmaspäev|reedel|teisipäev/i.test(tail[1]!)
  )
    return tail[1]!;

  const re = /\b([A-ZÕÄÖÜ][a-zõäöü]{2,})\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = m[1]!;
    if (EESNIMED.has(n)) return n;
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
    /\s*(?:neljapäevaks?|kolmapäevaks?|esmaspäevaks?|teisipäevaks?|reedeks?|\breedel\b|homme|ülehomme|täna|järgmisel\s+nädalal|järgmine\s+nädal|järgmisse\s+nädalasse|järgmine\s+sprint|selle\s+nädala\s+lõpuks|õhtuks|kuu\s+lõpuks).*$/i,
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

  return jarjestus.map((tahtaeg) => ({
    tahtaeg,
    read: map.get(tahtaeg)!,
  }));
}

function ehitaKokkuvote(tegevused: TegevusRida[]): string {
  if (tegevused.length === 0) return "";

  const vastutajad = new Set(tegevused.map((x) => x.vastutaja));
  const nimed = [...vastutajad];
  const tahtaegadega = tegevused.filter((x) => x.tahtaeg !== "—");
  const unikaalsedTahtajad = [
    ...new Set(tahtaegadega.map((x) => x.tahtaeg)),
  ].slice(0, 5);

  const osa1 = `Koosoleku märkmetest koorusid ${tegevused.length} konkreetset sammu — need on kohe jagatavad tiimile või projektivaatesse ülekantavad.`;

  let osa2: string;
  if (nimed.length === 1 && nimed[0] === "Tiim") {
    osa2 =
      "Vastutajaid polnud ridadest automaatselt tuvastatud — märgi need käsitsi või lisa märkmetesse eesnimed (nt „Anna — …“).";
  } else if (nimed.length <= 4) {
    osa2 = `Vastutajad tekstis: ${nimed.join(", ")}.`;
  } else {
    osa2 = `Vastutajaid on ${nimed.length} — ülevaatusel tasub fookus panna prioriteetidele ja tähtaegadele.`;
  }

  let osa3: string;
  if (unikaalsedTahtajad.length === 0) {
    osa3 =
      "Tähtajad ei tulnud märkmetest selgelt välja; lisa need kalendrisse või järgmise koosoleku päevakorda.";
  } else if (unikaalsedTahtajad.length <= 3) {
    osa3 = `Tähtajad, mis tekstist leidsin: ${unikaalsedTahtajad.join(", ")} — kinnita, et need vastavad tegelikule kokkuleppele.`;
  } else {
    osa3 = `Tähtajaid on mitu; iga tegevuse juures on tähtaeg eraldi välja toodud — kontrolli kriitilised kuupäevad üle.`;
  }

  const top3 = tegevused.slice(0, 3).map((r) => r.kirjeldus);
  const osa4 =
    top3.length > 0
      ? `Esimesed prioriteedid töötluses: ${top3.map((k) => `„${luhikeUlesanne(k)}“`).join(", ")}.`
      : "";

  return [osa1, osa2, osa3, osa4].filter(Boolean).join(" ");
}

function kuupaevPealkirjas(): string {
  try {
    return new Intl.DateTimeFormat("et-EE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

function ehitaEmailTeema(): string {
  const d = kuupaevPealkirjas();
  return d
    ? `Koosoleku järgmised sammud — ${d}`
    : "Koosoleku järgmised sammud";
}

function jarelkiriMustand(
  tegevused: TegevusRida[],
  emailTeema: string,
): string {
  const intro = `Teema: ${emailTeema}

Tere,

Täname tänase arutelu eest. Panin kokku lühikese ülevaate järgmistest sammudest — vaata palun üle ja anna teada, kui midagi vajab täpsustamist või vastutaja vahetust.

`;

  const body = tegevused
    .map((row, i) => {
      const nr = i + 1;
      const dl =
        row.tahtaeg !== "—" ? ` — tähtaeg: ${row.tahtaeg}` : "";
      return `${nr}. ${row.vastutaja}: ${row.kirjeldus}${dl}`;
    })
    .join("\n");

  const outro = `

Kui mõni tähtaeg või vastutaja vajab muutmist, vasta sellele kirjale või kirjuta meeskonna kanalisse — paneme paika järgmise sammu.

Parimate soovidega`;

  return intro + body + outro;
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

export function processMeetingNotes(raw: string): StudioTulemus {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return {
      tegevused: [],
      vastutajad: [],
      tahtajad: [],
      kokkuvote: "",
      jarelkiri: "",
      emailTeema: "",
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

  const split = trimmed.split(/\r?\n/);
  const merged = liidaRead(split);

  const tegevused: TegevusRida[] = [];

  for (const line of merged) {
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
  const kokkuvote = ehitaKokkuvote(tegevused);
  const emailTeema = ehitaEmailTeema();
  const jarelkiri = jarelkiriMustand(tegevused, emailTeema);
  const summary = ehitaSummary(trimmed, merged.length, tegevused);

  return {
    tegevused,
    vastutajad,
    tahtajad,
    kokkuvote,
    jarelkiri,
    emailTeema,
    summary,
  };
}
