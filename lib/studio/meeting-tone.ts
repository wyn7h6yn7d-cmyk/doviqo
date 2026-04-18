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
      return `Tiim — nädala plaan ja tegevused${suffix}`;
    case "client-meeting":
      return `Kliendikohtumine — kinnitused ja järgmised sammud${suffix}`;
    case "sales-call":
      return `Müük — järel, materjalid, järgmine kontakt${suffix}`;
    case "project-status":
      return `Projekt — verstapostid, täitmine, sõltuvused${suffix}`;
    case "hiring-interview":
      return `Värbamine — intervjuu järel (tiim/Hr)${suffix}`;
    default:
      return d
        ? `Koosoleku järel — järgmised sammud (${d})`
        : "Koosoleku järel — järgmised sammud";
  }
}

/** Ühendatud tekst kõigist tegevusridadest — deterministlike märksõnade jaoks. */
function tegevusteBlob(t: TegevusRida[]): string {
  return t.map((r) => `${r.kirjeldus} ${r.vastutaja} ${r.tahtaeg}`).join("\n");
}

function hasBlockerSignal(blob: string): boolean {
  return /\b(blocker|takistus|tõkke|oht|risk|võlg|ootab\b|ei ole valmis|puudub veel|ei valmis)/i.test(
    blob,
  );
}

function hasPricingSignal(blob: string): boolean {
  return /\b(hind|hinna|pakkum|paket|eelarve|maksab|case study|materjal)/i.test(blob);
}

function hasNextTouchSignal(blob: string): boolean {
  return /\b(follow-up|järgmine (?:kõne|kohtumine|call|demo)|reedel kontakt|järgmine võimalus)/i.test(
    blob,
  );
}

function hasDeliverySignal(blob: string): boolean {
  return /\b(launch|käivit|release|go-live|api|sprint|verstap|dashboard|front-end|sõltuv|integratsioon)/i.test(
    blob,
  );
}

function hasHiringSignal(blob: string): boolean {
  return /\b(kandidaat|referents|voor|intervjuu|hr|värb|otsust)/i.test(blob);
}

function dynamicKokkLause(tone: MeetingToneId, blob: string): string | null {
  switch (tone) {
    case "team-weekly":
      if (hasBlockerSignal(blob)) {
        return "Tekstis nähtub võimalikke takistusi või sõltuvusi — vaata need enne järgmist plokki koos läbi.";
      }
      return null;
    case "sales-call":
      if (hasPricingSignal(blob) && hasNextTouchSignal(blob)) {
        return "Materjalide/hinna ja järgmise kontakti read on koos — hoia müügis sama järjekord.";
      }
      if (hasPricingSignal(blob)) {
        return "Hinna- või materjalitegevused on eraldi nähtavad — kinnita need müügijuhi või CRM-i järgi.";
      }
      if (hasNextTouchSignal(blob)) {
        return "Järgmine kontakt või demo on tekstis kajastunud — kalendris sama kui kanalis.";
      }
      return null;
    case "project-status":
      if (hasDeliverySignal(blob)) {
        return "Launchi, API või ülesannete sõltuvused kajastuvad ridades — vastenda need plaaniga enne välise kliendi uuendust.";
      }
      return null;
    case "hiring-interview":
      if (hasHiringSignal(blob)) {
        return "Kandidaat, voor või reference ridadest — hoia värbamisreeglid (iseäranis väline jagamine) silmas.";
      }
      return null;
    case "client-meeting":
      if (/\b(kinnita|kliendile|partner)/i.test(blob)) {
        return "Kui mõni punkt on kliendile uudis, vaata sõnastus üle enne väljasaatmist.";
      }
      return null;
    default:
      return null;
  }
}

function listPealkiriJarelkirjas(tone: MeetingToneId): string {
  switch (tone) {
    case "team-weekly":
      return "Tegevused ja omanikud (sisemine kanal)";
    case "client-meeting":
      return "Projektipoolne plaan — kinnitused ja tähtajad";
    case "sales-call":
      return "Järeltegevused ja müügikäik";
    case "project-status":
      return "Täitmine, verstapostid ja kuupäevad";
    case "hiring-interview":
      return "Värbamismeeskonna sammud (sisemine)";
    default:
      return "Järgmised sammud";
  }
}

/** Lühike, deterministlik lõppsõnum enne „Tervitades“ — ei dubleeri alati kokkuvõttega. */
function dynamicJarelkiriTail(tone: MeetingToneId, blob: string): string | null {
  switch (tone) {
    case "team-weekly":
      if (hasBlockerSignal(blob)) {
        return "Blokeerivad või kinni olevad punktid: võta päevakorra tipuks enne uusi ülesandeid.";
      }
      return null;
    case "sales-call":
      if (hasPricingSignal(blob) && hasNextTouchSignal(blob)) {
        return "Hoia hinna/materjalide rida ja järgmise kontakti aega ühes vaates (CRM või kalender).";
      }
      if (hasNextTouchSignal(blob)) {
        return "Järgmine müügisamm: sama kanal mis lähteprotsessis (e-post, LinkedIn või telefon).";
      }
      return null;
    case "project-status":
      if (hasDeliverySignal(blob)) {
        return "Kui launch/API sõltuvus muutub, uuenda sama loendit enne välise kliendiuuenduse saatmist.";
      }
      return null;
    case "hiring-interview":
      if (hasHiringSignal(blob)) {
        return "Kandidaadiandmeid väljapoole jagada ainult kinnitatud kanalis — kinnitab interviewer või HR.";
      }
      return null;
    case "client-meeting":
      if (/\b(kinnita|kliendile)\b/i.test(blob)) {
        return "Enne välja: üks kiire review läbi kliendi pilgu (kohustused ja kuupäevad).";
      }
      return null;
    default:
      return null;
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

  const blob = tegevusteBlob(tegevused);
  const dynKokk = dynamicKokkLause(tone, blob);

  let p1: string;
  switch (tone) {
    case "team-weekly":
      p1 = `Tiimisisene kooster: kirjas on ${tegevused.length} sammu omaniku ja tähtajaga — lühidalt ja operatiivselt. Jagamiseks Slacki/Teamsi või ühise plokina; välisele kliendile minev sõnastus tuleb eraldi koostada.`;
      break;
    case "client-meeting":
      p1 = `Kliendikohtumise tööversioon: ${tegevused.length} sammu, mis seab paika täitmise, vastutajad ja tähtajad. Sisu on projekti poolt aus — partnerlik/teenindav toon lisatakse enne väljasaatmist.`;
      break;
    case "sales-call":
      p1 = `Müügikõne järel on ${tegevused.length} müügisammu (materjalid, hind, järgmine kontakt, otsustusprotsess). Eesmärk on, et toru ei seiskuks ja järgmine puute punkt oleks ajastatud.`;
      break;
    case "project-status":
      p1 = `Projekti ülevaade kokku ${tegevused.length} sammuga: verstapostid, sõltuvused ja kättesaadavus. Sobib sprintiks, riskitabelisse või lühikese edasikanali manusena — kliendi pressiks kopeeri ainult kinnitatud read.`;
      break;
    case "hiring-interview":
      p1 = `Värbamise sisemine plaan: ${tegevused.length} sammu (kandidaat, järgmine voor, referentsid, koordineerimine). Pole mõeldud otse kandidaadile — ainult tiimi/HR siseseks koosseisuks.`;
      break;
    default:
      p1 = `Koosoleku järelsisust on eraldatud ${tegevused.length} järgmist sammu — jagatavad tiimile ja sobivad järelkontrolliks enne väljasaatmist.`;
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
    switch (tone) {
      case "team-weekly":
        p3 =
          "Tähtaegu tekstist ei tuvastanud — märgi Slacki või ridadesse (nt homme, reedeks), et sync jääks selgeks.";
        break;
      case "client-meeting":
        p3 =
          "Tähtaegu ei leidnud kindlalt — lisa kalendrisse ja taasta kliendile kinnitusena, kui kuupäev on uus.";
        break;
      case "sales-call":
        p3 =
          "Tähtaeg puudub ridadest — pane CRM-i või kalendrisse, et müügijärg oleks jälgitav.";
        break;
      case "project-status":
        p3 =
          "Kuupäevi tekstist ei kinnitanud — täienda sprinti või Gantti, et launch/sõltuvused oleksid nähtavad.";
        break;
      case "hiring-interview":
        p3 =
          "Tähtaeg tekstis ebaselge — täpsusta interview/HR kanalis (järgmine voor, feedbacki tähtaeg).";
        break;
      default:
        p3 =
          "Tähtaegu ei leidnud järelsisust selgelt — lisa kalendrisse või kirjelda tähtaeg ridades (nt „homme“, „reedeks“).";
    }
  } else {
    const tail =
      tone === "team-weekly"
        ? " — hoia päevakorra või taski tipus, et blockers ei kao põhja."
        : tone === "client-meeting"
          ? " — need on kliendile lubatud kuupäevad ainult pärast sisemist kinnitust."
          : tone === "project-status"
            ? " — vastenda launchi ja sõltuvustega (API, sisend, GTM)."
            : tone === "sales-call"
              ? " — sidu järgmise calli/demo ajaga ühte vaatesse."
              : tone === "hiring-interview"
                ? " — koonda interview plani ja kandidaadi kogemusega kokku."
                : " — kinnita oma kalendriga.";
    p3 = `Tähtajad tekstist: ${unikaalsedTahtajad.join(", ")}${tail}`;
  }

  return [p1, p2, p3, top3Line, dynKokk].filter(Boolean).join("\n\n");
}

export function buildJarelkiri(
  tegevused: TegevusRida[],
  emailTeema: string,
  tone: MeetingToneId,
): string {
  const blob = tegevusteBlob(tegevused);
  const tail = dynamicJarelkiriTail(tone, blob);

  const listBody = tegevused
    .map((row, i) => {
      const nr = i + 1;
      const dl = row.tahtaeg !== "—" ? ` (tähtaeg: ${row.tahtaeg})` : "";
      return `${nr}. ${row.vastutaja}: ${row.kirjeldus}${dl}`;
    })
    .join("\n");

  const listTitle = listPealkiriJarelkirjas(tone);
  const list = `${listTitle}\n\n${listBody}`;

  const enneTervitus = tail ? `\n\n${tail}` : "";

  switch (tone) {
    case "team-weekly": {
      const intro = `Teema: ${emailTeema}

Hei tiim,

Lühidalt ja otse: kes teeb, millal, ja mis võiks takistada. Kasuta sisemises kanalis (Slack/Teams) — väline sõnum eraldi.

`;
      const outro = `

Kui omanik või tähtaeg vajab täpsustamist, vastake siia või kanalis.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
    case "client-meeting": {
      const intro = `Teema: ${emailTeema}

Tere,

Tänase kliendikohtumise tööversioon: allpool kinnitused, vastutajad ja tähtajad. Enne väljasaatmist kohandada kliendi keeles; see tekst on projektipoolne plaan.

`;
      const outro = `

Kui tähtaeg või lubadus muutub, uuendage oma tööriistas ja vajadusel saatke kliendile lühiuuendus.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
    case "sales-call": {
      const intro = `Teema: ${emailTeema}

Tere,

Müügikõne järel: järeltegevused, materjalid, hind ja järgmine samm otsustusprotsessis. Eesmärk on, et protsess liiguks ja järgmine kontakt oleks kalendris.

`;
      const outro = `

Kui prioriteedid või eelarve muutuvad, logige see CRM-i — kohandame plaani vastavalt.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
    case "project-status": {
      const intro = `Teema: ${emailTeema}

Tere,

Projekti ülevaade: verstapostid, täitmine ja sõltuvused. Sobib sprinti, riskitšekiks või juhtkonna lühikokkuvõtte manusena.

`;
      const outro = `

Kui launch, API või järjestus nihkub, uuenda sama loendit — väliseks release-kõneks kopeeri ainult kinnitatud read.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
    case "hiring-interview": {
      const intro = `Teema: ${emailTeema}

Tere,

Värbamise koordineerimine: järgmine voor, muljed, referentsid ja sisemine tööjaotus. Ärge saatke otse välisele kandidaadile ilma kinnituseta.

`;
      const outro = `

Kui roll või tähtaeg muutub, kirjutage HR-kanalisse või vastake sellele kirjale.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
    default: {
      const intro = `Teema: ${emailTeema}

Tere,

Täname koosoleku eest. Allpool järgmised sammud, vastutajad ja tähtajad — palun vaata üle enne edasisaatmist.

`;
      const outro = `

Kui vastutaja või tähtaeg ei klapi, vasta sellele kirjale või märgi kanalis.${enneTervitus}

Tervitades`;
      return intro + list + outro;
    }
  }
}
