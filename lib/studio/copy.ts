/** Doviqo Studio — demo tekstid (koosolekujärgne tegevus, mitte märkmerakendus). */

export const studioMeta = {
  title: "Doviqo Studio — koosolekujärgne tegevusplaan",
  description:
    "Interaktiivne demo: koosoleku tüüp, sisend, tegevused, vastutajad, tähtajad ja saatmisvalmis järelkiri — kõik brauseris.",
} as const;

export const studioUi = {
  studioEyebrow: "Interaktiivne demo",
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Muuda koosoleku sisu mõne hetkega tegevusplaaniks, vastutajateks ja järelkirjaks.",

  demoNotice:
    "See on demoversioon. Tulemus tekib sinu brauseris — salvestust ega pilve siin ei ole. Doviqo ei ole koht, kus märkmed „elavad“; see on koht, kus pärast koosolekut tekivad järgmised sammud.",

  waitlistLink: "Ootenimekiri",
  studioNavAria: "Proovilehe lingid",

  workflowAria: "Koosolekujärgne töövoog",

  stepMeetingType: "1. Koosoleku tüüp",
  stepMeetingTypeHint:
    "Vali kontekst — väljund kohandub (tiim, klient, müük, projekt või värbamine).",

  stepInput: "2. Lisa koosoleku sisu",
  inputLabel: "Lisa koosoleku sisu",
  inputLabelLong: "Koosoleku sisu — märkmed või üleskirjutus",
  inputHint:
    "Kleebi siia märkmed või üleskirjutus. Doviqo tõstab välja, mis tuleb edasi teha.",
  placeholder: `Näiteks:
- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- vaja saata tiimile kokkuvõte`,

  stepGenerate: "3. Koosta tegevusplaan",
  processBtn: "Koosta järgmised sammud",
  processing: "Koostan tegevusplaani…",
  resetBtn: "Alusta uuesti",

  meetingTypeLabel: "Koosoleku tüüp",
  meetingTypeGroupAria: "Koosoleku tüüp — väljundi toon",

  sampleSectionTitle: "Näidissituatsioon",
  sampleSectionLead:
    "Vali ülal koosoleku tüüp ja kasuta näidist — saad kohe näha, kuidas plaan välja näeb.",

  outputTitle: "Koosolekujärgne tegevuskava",
  outputHint:
    "Segi sõne → selge plaan: tegevused, vastutajad, tähtajad ja järelkiri valmis kopeerimiseks.",

  transformStripLabel: "Tegevusplaan valmis",
  transformSummaryLine: "{raw} rida sisendist → {items} tegevust",
  transformStripHint:
    "See on töö, mis tuleb pärast koosolekut — vähem käsitsi kokkuvõtet, rohkem selgust ja vastutust.",

  transformTitle: "Ülevaade",
  transformLines: "{raw} rida sisendist → {items} tegevust",
  transformMeta:
    "{owners} vastutajat · {deadlines} tähtajaga · {chars} märki",

  rawInputToggle: "Näita algset teksti",
  rawInputHint:
    "Algne sisend, millest plaan tekkis — võrdle ridahaaval, kui vaja.",

  sectionKokkuvote: "Kokkuvõte",
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
  copyAll: "Kopeeri kõik",
  copyJarelkiri: "Kopeeri järelkiri",
  copySubject: "Kopeeri teema",
  copySlack: "Kopeeri Slacki jaoks",
  copyEmail: "Kopeeri e-kirjaks",
  copyTeam: "Kopeeri tiimile",
  copied: "Kopeeritud",

  quickActionsLabel: "Kiirkopeerimine",

  emptyTitle: "Siit algab koosolekujärgne selgus",
  emptyBody:
    "Vali koosoleku tüüp, lisa koosoleku sisu (või näidis) ja vajuta „Koosta järgmised sammud“. Doviqo teeb nähtavaks tegevused, vastutajad, tähtajad ja järelkirja — mitte ei hoia märkmeid.",

  loadingTitle: "Koostan tegevusplaani…",
  loadingHint:
    "Eraldame tegevused, vastutajad, tähtajad, paneme kokku kokkuvõtte ja järelkirja.",
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
    title: "Projekti ülevaade",
    body: `Projekti ülevaade

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
