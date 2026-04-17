import { studioDemoPresets } from "@/lib/studio/copy";
import type { TegevusRida } from "@/lib/studio/types";

export type MeetingToneId =
  | "generic"
  | "team-weekly"
  | "client-meeting"
  | "sales-call"
  | "project-status"
  | "hiring-interview";

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

function luhikeUlesanne(kirjeldus: string): string {
  const t = kirjeldus.trim();
  if (t.length <= 56) return t;
  return `${t.slice(0, 53)}…`;
}

/**
 * Tuvastab demo eelseadistatud teksti või esimese rea järgi tooni.
 * Kohandatud tekst ilma pealkirja vastavusteta → generic.
 */
export function inferMeetingTone(raw: string): MeetingToneId {
  const trimmed = raw.trim();
  if (!trimmed) return "generic";

  for (const p of studioDemoPresets) {
    if (trimmed === p.body.trim()) return p.id as MeetingToneId;
  }

  const first = trimmed.split(/\r?\n/)[0]?.trim() ?? "";
  for (const p of studioDemoPresets) {
    const title = p.body.split(/\r?\n/)[0]?.trim() ?? "";
    if (title && first.toLowerCase() === title.toLowerCase()) {
      return p.id as MeetingToneId;
    }
  }

  return "generic";
}

export function isPresetTitleLine(line: string): boolean {
  const s = line.trim().toLowerCase();
  return studioDemoPresets.some(
    (p) => p.body.split(/\r?\n/)[0]?.trim().toLowerCase() === s,
  );
}

export function buildEmailTeema(tone: MeetingToneId): string {
  const d = kuupaevPealkirjas();
  const suffix = d ? ` (${d})` : "";

  switch (tone) {
    case "team-weekly":
      return `Nädalakoosolek — tiimi järgmised sammud${suffix}`;
    case "client-meeting":
      return `Kliendikohtumine — projekti järgmised sammud ja tähtajad${suffix}`;
    case "sales-call":
      return `Müügikõne — järeltegevused, materjalid ja tähtajad${suffix}`;
    case "project-status":
      return `Projekti seisuülevaade — täitmine ja verstapostid${suffix}`;
    case "hiring-interview":
      return `Värbamine — intervjuu järel (sisemine koordineerimine)${suffix}`;
    default:
      return d
        ? `Koosoleku järel — järgmised sammud (${d})`
        : "Koosoleku järel — järgmised sammud";
  }
}

export function buildKokkuvote(
  tegevused: TegevusRida[],
  tone: MeetingToneId,
): string {
  if (tegevused.length === 0) return "";

  const vastutajad = new Set(tegevused.map((x) => x.vastutaja));
  const nimed = [...vastutajad];
  const tahtaegadega = tegevused.filter((x) => x.tahtaeg !== "—");
  const unikaalsedTahtajad = [
    ...new Set(tahtaegadega.map((x) => x.tahtaeg)),
  ].slice(0, 6);

  const top3 = tegevused.slice(0, 3).map((r) => r.kirjeldus);
  const top3Line =
    top3.length > 0
      ? (() => {
          const frag = top3.map((k) => `„${luhikeUlesanne(k)}“`).join(", ");
          switch (tone) {
            case "team-weekly":
              return `Tiimisisene fookus järgmiseks tsükliks: ${frag}.`;
            case "client-meeting":
              return `Kliendi jaoks olulised järgmised sammud: ${frag}.`;
            case "sales-call":
              return `Järeltegevused ja pakkumised, mis hoiavad müügiprotsessi liikumas: ${frag}.`;
            case "project-status":
              return `Tähtaegade ja käivitusega seotud rõhuasemed: ${frag}.`;
            case "hiring-interview":
              return `Värbamistsükli prioriteedid (taustakontroll, otsus, järgmine voor): ${frag}.`;
            default:
              return `Kohese fookuse jaoks: ${frag}.`;
          }
        })()
      : "";

  let p1: string;
  switch (tone) {
    case "team-weekly":
      p1 = `Nädalakoosoleku märkmetest tulenevalt on allpool tiimisisene kokkuvõte: ${tegevused.length} järgmist sammu koos vastutajate ja tähtaegadega. Sobib jagamiseks Slackis, Teamsis või ühise dokumendina — kliendile või partneri poole sõnastage vastavalt vajadusele ümber.`;
      break;
    case "client-meeting":
      p1 = `Kliendikohtumise märkmetest on kokku pandud ${tegevused.length} projektipoolset järgmist sammu. Toon on suunatud selgusele ja tähtaegadele — kasutage sisemiselt kinnituseks või kohandage sõnastust, kui saadate kokkuvõtte kliendile.`;
      break;
    case "sales-call":
      p1 = `Müügikõne märkmetest on struktureeritud ${tegevused.length} järgnevat sammu; rõhk on järeltegevustel, materjalidel ja järgmisel kontaktil, et müügitoru jääks liikuma.`;
      break;
    case "project-status":
      p1 = `Projekti seisuülevaate märkmetest on eraldatud ${tegevused.length} täitmise ja verstapostidega seotud sammu — sobivad sprinti planeerimiseks, riskiloendisse või juhtkonna lühikokkuvõttesse.`;
      break;
    case "hiring-interview":
      p1 = `Värbamisintervjuu märkmetest on kokku pandud ${tegevused.length} sisemist sammu (kandidaat, taustakontroll, otsus). See on mõeldud värbamis- ja tiimisisaseks koordineerimiseks — mitte otse kandidaadile saatmiseks.`;
      break;
    default:
      p1 = `Märkmetest kokku ${tegevused.length} järgmist sammu — need on jagatavad tiimile ja sobivad ka järelkontrolliks enne saatmist.`;
  }

  let p2: string;
  if (nimed.length === 1 && nimed[0] === "Tiim") {
    p2 =
      "Vastutajaid ei tuvastanud ridadest kindlalt. Kui lisad nime kujul „Anna — …“ või pane tegevuse juurde omaniku, kajastub see automaatselt tabelis.";
  } else if (nimed.length <= 5) {
    const prefix =
      tone === "client-meeting"
        ? "Projektipoolsed vastutajad tuvastatud: "
        : tone === "hiring-interview"
          ? "Rollid ja vastutajad: "
          : "Vastutajad tuvastatud: ";
    p2 = `${prefix}${nimed.join(", ")}.`;
  } else {
    p2 = `Kokku ${nimed.length} vastutajat — vaata üle, et prioriteedid ja omanikud vastaksid tegelikule kokkuleppele.`;
  }

  let p3: string;
  if (unikaalsedTahtajad.length === 0) {
    p3 =
      "Tähtaegu ei leidnud märkmetest selgelt — lisa kalendrisse või kirjelda tähtaeg ridades (nt „homme“, „reedeks“).";
  } else {
    const tail =
      tone === "project-status"
        ? " — kinnita launchi ja sõltuvustega kooskõlas."
        : tone === "sales-call"
          ? " — hoia järgmine puute punkt kalendris paigas."
          : " — kinnita oma kalendriga.";
    p3 = `Tähtajad tekstist: ${unikaalsedTahtajad.join(", ")}${tail}`;
  }

  return [p1, p2, p3, top3Line].filter(Boolean).join("\n\n");
}

export function buildJarelkiri(
  tegevused: TegevusRida[],
  emailTeema: string,
  tone: MeetingToneId,
): string {
  const list = tegevused
    .map((row, i) => {
      const nr = i + 1;
      const dl = row.tahtaeg !== "—" ? ` (tähtaeg: ${row.tahtaeg})` : "";
      return `${nr}. ${row.vastutaja}: ${row.kirjeldus}${dl}`;
    })
    .join("\n");

  switch (tone) {
    case "team-weekly": {
      const intro = `Teema: ${emailTeema}

Hei tiim,

Siin on lühike kokkuvõte nädalakoosolekust ja järgmised sammud — kasutage seda ühiselt kanalis või jagatud dokumendina.

`;
      const outro = `

Kui vastutaja või tähtaeg vajab täpsustamist, andke teada siin või kanalis — paneme koos paika.

Tervitades`;
      return intro + list + outro;
    }
    case "client-meeting": {
      const intro = `Teema: ${emailTeema}

Tere,

Tänase kliendikohtumise põhjal allpool projekti järgmised sammud, vastutajad ja tähtajad. Palun kinnitage sisemiselt enne kliendile edastamist või kohandage sõnastust vastavalt suhtluse toonile.

`;
      const outro = `

Kui mõni punkt vajab täpsustamist või tähtaeg muutub, vastake sellele kirjale või uuendage oma tööriistas — hoiame projekti ja kliendi ootused kooskõlas.

Tervitades`;
      return intro + list + outro;
    }
    case "sales-call": {
      const intro = `Teema: ${emailTeema}

Tere,

Tänase müügikõne põhjal allpool kokkuvõte ning järgmised sammud: materjalid, hinnastus, järgmine kontakt. Eesmärk on hoida protsess liikuvana ja järgmine puute punkt ajastatud.

`;
      const outro = `

Kui kliendi prioriteedid või eelarve muutuvad, märkige see ära — kohandame plaani ja järelkõne fookust vastavalt.

Tervitades`;
      return intro + list + outro;
    }
    case "project-status": {
      const intro = `Teema: ${emailTeema}

Tere,

Projekti seisuülevaate põhjal allpool täitmisele ja verstapostidele fokusseeritud sammud. Sobib sprinti planeerimiseks, riskide ülevaatuseks või lühikese päevakorra manusena.

`;
      const outro = `

Kui launch, API või sõltuvused nihkuvad, uuendame plaani — anna teada, et tähtajad jääksid usutavaks.

Tervitades`;
      return intro + list + outro;
    }
    case "hiring-interview": {
      const intro = `Teema: ${emailTeema}

Tere,

Värbamisintervjuu põhjal allpool sisemine tööjaotus (kandidaat, taustakontroll, otsus, järgmine voor). Palun mitte edastada väljapoole värbamismeeskonda ilma kinnituseta.

`;
      const outro = `

Kui vastutaja või tähtaeg vajab muudatust, kirjutage HR-kanalisse või vastake sellele kirjale — hoiame värbamistsüklit kooskõlas.

Tervitades`;
      return intro + list + outro;
    }
    default: {
      const intro = `Teema: ${emailTeema}

Tere,

Täname tänase koosoleku eest. Allpool on koondatud järgmised sammud, vastutajad ja tähtajad — palun vaata üle ja anna teada, kui midagi vajab täpsustamist.

`;
      const outro = `

Kui vastutaja või tähtaeg ei vasta kokkuleppele, vasta sellele kirjale või uuenda üksust oma tiimikanalis — paneme need koos paika.

Tervitades`;
      return intro + list + outro;
    }
  }
}
