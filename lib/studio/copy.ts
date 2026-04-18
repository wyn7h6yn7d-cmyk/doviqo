/** Doviqo Studio — demo tekstid (koosoleku järgne täitmine, mitte märkmerakendus). */

export const studioMeta = {
  title: "Doviqo Studio — koosoleku järgne tegevuskava",
  description:
    "Interaktiivne demo: koosoleku kontekst, sisend, tegevused, vastutajad, tähtajad ja saatmisvalmis järelkiri — brauseris, ilma pilvesalvestuseta.",
} as const;

/** Kolm emotsionaalset telge — tühja lõuendi seletus (messy → actionable). */
export const studioEmotionalPillars = [
  { before: "Segane", after: "Selge" },
  { before: "Ebaselge", after: "Määratud" },
  { before: "Ununenud", after: "Teostatav" },
] as const;

export const studioUi = {
  studioEyebrow: "Koosoleku järgne komandokeskus",
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Ühest kohast: koosoleku sisu muutub tegevusteks, vastutuseks, tähtaegadeks ja kanalisse sobivaks järelväljundiks.",

  demoNotice:
    "Demo: tulemus tekib sinu brauseris; pilve ega salvestust siin ei ole. Muudame sisendi täitmisplaani — ei kogu märkmeid.",

  waitlistLink: "Ootenimekiri",
  studioNavAria: "Proovilehe lingid",

  workflowAria: "Koosoleku töövoog ja tegevuste lõuend",

  meetingBarTitle: "Koosoleku kontekst",
  meetingBarHint:
    "Iga valik seab tegevused ja järelteksti eri konteksti — tiim, klient, müük, projekt või värbamine.",

  intakeRailTitle: "Sisend",
  stepInput: "Lisa koosoleku sisu",
  inputLabel: "Lisa koosoleku sisu",
  inputLabelLong: "Lisa koosoleku sisu — märkmed või üleskirjutus",
  inputHint:
    "Kleebi siia märkmed või üleskirjutus. Doviqo teeb neist järgmised sammud.",

  transformZoneTitle: "Teisendus",
  transformZoneHint:
    "Sama sisend → struktureeritud täitmine. Üks klikk, et toore teksti asemel saada tegevuste plaan.",

  bridgeMessy: "Segane sisend",
  bridgeClear: "Tegevuste plaan",

  placeholder: `Näiteks:
- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- analytics cleanup lükkub järgmisse nädalasse
- tiimile lühike järelteavitus pärast plokki
- järgmises sprindis võtame onboarding’u parandused ette`,

  processBtn: "Koosta järgmised sammud",
  processing: "Koostan järgmisi samme…",
  resetBtn: "Alusta uuesti",

  meetingTypeLabel: "Koosoleku kontekst",
  meetingTypeGroupAria: "Koosoleku tüüp — tulemuse struktuur ja toon",

  sampleSectionTitle: "Näidissituatsioon",
  sampleSectionLead:
    "Koosoleku tüübi valik laeb näidissisu — saad selle kohe üle kirjutada.",

  outputTitle: "Tulemus ja tegevuskava",
  outputHint:
    "See on põhivaade: siin näed tegevust selgelt — kokkuvõte, ülesanded, vastutus, tähtajad ja järelkiri kopeerimiseks.",

  resultStatusBadge: "Tegevusplaan valmis",
  transformStripLabel: "Struktureeritud väljund",
  transformSummaryLine: "{raw} rida järelsisust → {items} tegevust",
  transformStripHint:
    "See on töö, mis peale koosolekut niikuinii ära teha — vähem käsitsi kordamist, rohkem selget vastutust ja edasiliikumist.",

  transformTitle: "Ülevaade",
  transformLines: "{raw} rida järelsisust → {items} tegevust",
  transformMeta:
    "{owners} vastutajat · {deadlines} tähtajaga · {chars} märki",

  rawInputToggle: "Näita algset teksti",
  rawInputHint:
    "Algne järelsisu, millest plaan tekkis — võrdle ridahaaval, kui vaja.",

  sectionKokkuvote: "Kokkuvõte",
  sectionOtsused: "Otsused",
  sectionTegevused: "Tegevused",
  sectionVastutajad: "Vastutajad",
  sectionTahtajad: "Tähtajad",
  sectionLahtised: "Lahtised küsimused",
  sectionEmailTeema: "Kirja teema",
  sectionJarelkiri: "Järelkiri",

  tableTask: "Tegevus",
  tableOwner: "Vastutaja",
  tableDue: "Tähtaeg",

  copy: "Kopeeri",
  copySection: "Kopeeri see plokk",
  copyKokkuvote: "Kopeeri kokkuvõte",
  copyOtsused: "Kopeeri otsused",
  copyLahtised: "Kopeeri lahtised küsimused",
  copyAll: "Kopeeri kõik",
  copyJarelkiri: "Kopeeri järelkiri",
  copySubject: "Kopeeri teema",
  copySlack: "Kopeeri Slacki jaoks",
  copyEmail: "Kopeeri e-kirjaks",
  copyTeam: "Kopeeri tiimile",
  copied: "Kopeeritud",

  quickActionsLabel: "Kiirkopeerimine",

  emptyTitle: "Siin saab tegevus nähtavaks",
  emptyBody:
    "Kui koosoleku sisu on üleval olemas ja vajutad „Koosta järgmised sammud“, tekivad siia struktureeritud plokid — kokkuvõte, tegevused, vastutajad, tähtajad ja järelkiri. See on rakenduse keskus, mitte näidis.",

  loadingTitle: "Koostan järgmisi samme…",
  loadingHint:
    "Eraldame tegevused, vastutajad ja tähtajad; paneme kokku kokkuvõtte ja järelkirja.",
  loadingStep1: "Tegevused ja vastutajad",
  loadingStep2: "Tähtajad ja struktuur",
  loadingStep3: "Kokkuvõte ja järelkiri",

  successHint:
    "Kontrolli vastutajad ja tähtajad — seejärel kopeeri kanalisse või meilile.",

  emptyError: "Lisa vähemalt üks rida koosoleku sisust.",

  backHome: "Tagasi avalehele",
} as const;

export type StudioDemoPreset = {
  id: string;
  title: string;
  body: string;
};

/** Koosoleku tüübid — pealkiri + näidissisu (toon tuleb valikust). */
export const studioDemoPresets: readonly StudioDemoPreset[] = [
  {
    id: "team-weekly",
    title: "Tiimi koosolek",
    body: `Tiimi koosolek

- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- analytics cleanup lükkub järgmisse nädalasse
- saata tiimile lühike järelteavitus pärast plokki
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

- potentsiaalne klient tahab lühikest ülevaadet tänasest kõnest
- saata hinnastus ja pakettide võrdlus
- Liis saadab case study neljapäevaks
- Jaan uurib, kas onboarding saab alata juba järgmisel nädalal
- follow-up call võiks teha reedel
- otsustaja tuleb järgmisele kõnele kaasa`,
  },
  {
    id: "project-status",
    title: "Projekti ülevaade",
    body: `Projekti ülevaade

- disainid on valmis aga front-end ootab veel kahte vaadet
- Karl võtab dashboardi tabeli reede peale
- Nora lõpetab settings vaate neljapäevaks
- API ühendus lükkub järgmise nädala algusse
- vaja panna paika uus launch kuupäev
- saata juhtkonnale lühike ülevaade tänase seisuga`,
  },
  {
    id: "hiring-interview",
    title: "Värbamisintervjuu",
    body: `Värbamisintervjuu

- kandidaat jättis väga hea mulje
- vaja kontrollida referentse
- Kati saadab kodutöö täna õhtul
- Mart annab homseks värbamistiimile lühikese sisemise tagasiside
- otsus võiks tulla hiljemalt reedel
- kutsuda kandidaat järgmisesse vooru, kui referentsid on korras`,
  },
];
