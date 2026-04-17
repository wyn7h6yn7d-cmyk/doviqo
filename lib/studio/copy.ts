/** Doviqo Studio — kasutajaliidese tekstid (emakeelne). */

export const studioMeta = {
  title: "Doviqo Studio",
  description:
    "Interaktiivne demo: kleebi koosoleku märkmed või üleskirjutus. Struktureeritud tegevused, vastutajad, tähtajad, kokkuvõte ja järelkiri — töötab brauseris.",
} as const;

export const studioUi = {
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Üks sisend → tegevused, vastutajad, tähtajad, kokkuvõte ja järelkiri. Demo töötab brauseris.",
  demoBadge: "Varajane demo",
  localBadge: "töötab brauseris",
  demoNotice:
    "See on varajane demoversioon: töötlemine toimub sinu seadmes ja teksti ei salvestata meie serverisse. Tulevikus lisanduvad tiimivaated, kalender ja sügavam integratsioon — sama töövoog jääb alles.",
  waitlistLink: "Liitu ootenimekirjaga",

  inputLabel: "Sisend",
  inputLabelLong: "Koosoleku märkmed või üleskirjutus",
  inputHint:
    "Võid kleepida otse märkmest, dokumendist või transkriptsioonist. Üks mõte rea kohta sobib kõige paremini; jätkuread (nt „ja samuti…“) ühendame üheks ülesandeks.",
  placeholder: `Näide ridadena:

Anna — koosta müügipakkumine — neljapäevaks
Martin saadab lepingu mustandi reedel üle
tuleb uuendada hinnakiri — järgmisel nädalal
Elena vaatab üle turundusmaterjalid — homme`,

  sampleTitle: "Laadi näidis",
  sampleBody:
    "Täidame korraliku näidise: eesnimed, tähtajad (homme, reedel, neljapäevaks, järgmisel nädalal) ja üks pikem „segane“ rida.",
  sampleBtn: "Laadi näidis",
  sampleShortcut: "Täida näidisega",

  processBtn: "Korda märkmed ülesanneteks",
  processing: "Töötlen…",
  resetBtn: "Tühjenda",

  outputTitle: "Tulemus",
  outputHint:
    "Kopeeri iga plokk eraldi või kõik korraga — valmis Slacki, e-posti või projektitööriista.",

  transformStripLabel: "Ümbertöötlemine",
  transformStripHint:
    "Sisend → struktureeritud väljund (deterministlik demo loogika).",

  transformTitle: "Ülevaade",
  transformLines: "{raw} rida märkmeid → {items} tegevust",
  transformMeta:
    "{owners} vastutajat · {deadlines} tähtajaga · {chars} märki",

  rawInputToggle: "Näita algset teksti",
  rawInputHint:
    "See on sama sisend, mille töötlesid — hoidke kõrvuti, et kontrollida täpsust.",

  sectionTegevused: "Tegevused",
  sectionVastutajad: "Vastutajad",
  sectionTahtajad: "Tähtajad",
  sectionKokkuvote: "Kokkuvõte",
  sectionEmailTeema: "Kirja teema",
  sectionJarelkiri: "Järelkiri",

  tableTask: "Tegevus",
  tableOwner: "Vastutaja",
  tableDue: "Tähtaeg",

  copy: "Kopeeri",
  copySection: "Kopeeri see plokk",
  copyAll: "Kopeeri kõik",
  copyJarelkiri: "Kopeeri järelkiri",
  copySubject: "Kopeeri teema",
  copied: "Kopeeritud",

  emptyTitle: "Alusta märkmetega",
  emptyBody:
    "Kleebi siia koosoleku märkmed või lühike üleskirjutus. Ühest nupuvajutusest saad tegevused, vastutajad, tähtajad ja järelkirja — tühi tulp ootab sisendit.",
  emptyCta: "Või lae näidis",

  loadingTitle: "Korraldame märkmed ülesanneteks…",
  loadingHint:
    "Eraldame ridadest tegevused, loeme vastutajad ja tähtajad, paneme kokku kokkuvõtte ja järelkirja.",
  loadingStep1: "Tegevused ridadest välja",
  loadingStep2: "Vastutajad ja tähtajad paika",
  loadingStep3: "Kokkuvõte ja järelkiri valmis",

  successHint:
    "Kontrolli üle vastutajad ja tähtajad, täpsusta vajadusel ja saada edasi — sama voogu tahame pärast iga koosolekut.",

  emptyError: "Lisa vähemalt üks rida teksti.",

  backHome: "Tagasi avalehele",
} as const;

export const sampleNotes = `Tiimikoosolek — müük ja toode
Osalejad: Anna, Martin, Elena, Tomas

Anna — koosta uuendatud müügipakkumine ACME-le — neljapäevaks
Martin saadab lepingu mustandi üle vaadata — reedel
analytics dashboardi tehniline võlg tuleb lükata järgmisse nädalasse
Elena vaatab blokeerivad kohad ja sõltuvused üle — homme
ja samuti: lühike kokkuvõte Slacki kogu tiimile pärast koosolekut
tuleb uuendada investori slaidid — järgmisel nädalal

Lisa: järgmine süvaistung neljapäeval kell 10.`;
