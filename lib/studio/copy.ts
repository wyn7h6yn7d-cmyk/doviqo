/** Doviqo Studio — demo tekstid. */

export const studioMeta = {
  title: "Doviqo Studio — proovi koosoleku märkmeid",
  description:
    "Proovi brauseris: märkmed või üleskirjutus muutuvad tegevusteks, vastutajateks, tähtaegadeks, kokkuvõtteks ja järelkirjaks.",
} as const;

export const studioUi = {
  studioEyebrow: "Proovi brauseris",
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Kleebi siia märkmed või üleskirjutus — ühest käivitusest näed tegevusi, vastutajaid, tähtaegu, kokkuvõtet ja järelkirja.",
  demoNotice:
    "See on demoversioon. Tulemus tekib sinu brauseris, et näidata, kuidas Doviqo töötab — salvestust ega pilve siin ei ole.",
  waitlistLink: "Ootenimekiri",

  studioNavAria: "Proovilehe lingid",

  inputLabel: "Koosoleku märkmed",
  inputLabelLong: "Koosoleku märkmed",
  inputHint: "" as const,
  placeholder: `Näiteks:
- Anna lõpetab sisseelamise teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab takistused homme üle
- analüütika paneeli võlg lükkub järgmisse nädalasse
- saada tiimile kokkuvõte`,

  presetsGroupAria: "Näidissisendid",
  presetsSectionTitle: "Näidissisendid",
  presetsSectionLead:
    "Vali stsenaarium — tekst täidetakse väljale. Seejärel vajuta „Koosta väljund”.",

  processBtn: "Koosta väljund",
  processing: "Koostan väljundit…",
  resetBtn: "Tühjenda",

  outputTitle: "Väljund",
  outputHint:
    "Kopeeri plokid eraldi või kogu korraga — tiimikiri, e-post või tööriist.",

  transformStripLabel: "Väljund valmis",
  transformSummaryLine: "{raw} rida märkmeid → {items} tegevust",
  transformStripHint:
    "Vaata vastutajad ja tähtajad üle, seejärel kopeeri või edasta.",

  transformTitle: "Ülevaade",
  transformLines: "{raw} rida märkmeid → {items} tegevust",
  transformMeta:
    "{owners} vastutajat · {deadlines} tähtajaga · {chars} märki",

  rawInputToggle: "Näita algset teksti",
  rawInputHint:
    "See on sama sisend, mille töötlesid — võrdle ridahaaval, kui vaja.",

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

  emptyTitle: "Lisa märkmed, et näha tulemust",
  emptyBody:
    "Vali näidissisend sisendi väljal või kleebi oma tekst — näed, kuidas märkmed muutuvad tegevusplaaniks.",

  loadingTitle: "Koostan väljundit…",
  loadingHint: "Eraldame tegevused, vastutajad, tähtajad ja paneme järelkirja kokku.",
  loadingStep1: "Tegevused ridadest",
  loadingStep2: "Vastutajad ja tähtajad",
  loadingStep3: "Kokkuvõte ja järelkiri",

  successHint:
    "Kontrolli vastutajad ja tähtajad, seejärel jaga tiimiga edasi.",

  emptyError: "Lisa vähemalt üks rida teksti.",

  backHome: "Tagasi avalehele",
} as const;

export type StudioDemoPreset = {
  id: string;
  title: string;
  body: string;
};

/** Valitavad demo stsenaariumid — pealkiri + märkmete tekst. */
export const studioDemoPresets: readonly StudioDemoPreset[] = [
  {
    id: "team-weekly",
    title: "Tiimi nädalakoosolek",
    body: `Tiimi nädalakoosolek

- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- analytics cleanup lükkub järgmisse nädalasse
- vaja saata tiimile kokkuvõte
- järgmises sprindis võtame onboarding’u parandused ette`,
  },
  {
    id: "client-meeting",
    title: "Kliendikohtumine",
    body: `Kliendikohtumine

- klient tahab uut hinnapakkumist reedeks
- saata ülevaade tööde ajakavast
- Mari kontrollib tehnilised sõltuvused üle
- Andres valmistab ette järgmise demo
- klient tahab järgmise kohtumise esmaspäeval
- vaja kinnitada, kas integratsioon jääb esimese faasi sisse`,
  },
  {
    id: "sales-call",
    title: "Müügikõne",
    body: `Müügikõne

- potentsiaalne klient tahab lühikest kokkuvõtet tänasest kõnest
- saata hinnastus ja pakettide võrdlus
- Liis saadab case study neljapäevaks
- Jaan uurib, kas onboarding saab alata juba järgmisel nädalal
- follow-up call võiks teha reedel
- otsustaja tuleb järgmisele kõnele kaasa`,
  },
  {
    id: "project-status",
    title: "Projekti seisuülevaade",
    body: `Projekti seisuülevaade

- disainid on valmis aga front-end ootab veel kahte vaadet
- Karl võtab dashboardi tabeli reede peale
- Nora lõpetab settings vaate neljapäevaks
- API ühendus lükkub järgmise nädala algusse
- vaja panna paika uus launch kuupäev
- saata juhtkonnale lühike kokkuvõte tänase seisuga`,
  },
  {
    id: "hiring-interview",
    title: "Värbamisintervjuu",
    body: `Värbamisintervjuu

- kandidaat jättis väga hea mulje
- vaja kontrollida referentse
- Kati saadab kodutöö täna õhtul
- Mart teeb kokkuvõtte homseks
- otsus võiks tulla hiljemalt reedel
- kutsuda kandidaat järgmisesse vooru, kui referentsid on korras`,
  },
];
