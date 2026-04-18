/** Doviqo Studio — demo tekstid (koosoleku järgne täitmine, mitte märkmerakendus). */

export const studioMeta = {
  title: "Doviqo Studio — koosoleku järgne tegevuskava",
  description:
    "Interaktiivne demo: koosoleku tüüp, järelsisu, tegevused, vastutajad, tähtajad ja saatmisvalmis järelkiri — kõik brauseris, ilma pilvesalvestuseta.",
} as const;

export const studioUi = {
  studioEyebrow: "Interaktiivne demo",
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Muuda koosoleku järelsisu tegevusteks, vastutajateks, tähtaegadeks ja kanalisse sobivaks järelkirjaks.",

  demoNotice:
    "See on demoversioon. Tulemus tekib sinu brauseris — salvestust ega pilve siin ei ole. Doviqo ei ole koht, kus tekste kogutakse; see on tööriist, mis pärast koosolekut muudab järelsisu täitmiskõlblikuks plaaniks ja järelsõnumiks.",

  waitlistLink: "Ootenimekiri",
  studioNavAria: "Proovilehe lingid",

  workflowAria: "Koosolekujärgne töövoog",

  stepMeetingType: "1. Koosoleku tüüp",
  stepMeetingTypeHint:
    "Vali kontekst — väljund kohandub (tiim, klient, müük, projekt või värbamine).",

  stepInput: "2. Lisa koosoleku järelsisu",
  inputLabel: "Koosoleku järelsisu",
  inputLabelLong: "Koosoleku järelsisu — üleskirjutus või muu toores tekst",
  inputHint:
    "Kleebi siia see, mis koosoleku järel kätte saad (üleskirjutus, bulletid jne). Doviqo tõstab esile järgmised sammud, vastutuse ja tähtajad — täitmiseks, mitte arhiivi jaoks.",

  placeholder: `Näiteks:
- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- analytics cleanup lükkub järgmisse nädalasse
- tiimile lühike järelteavitus pärast plokki
- järgmises sprindis võtame onboarding’u parandused ette`,

  stepGenerate: "3. Koosta täitmisplaan",
  processBtn: "Koosta järgmised sammud",
  processing: "Koostan tegevustplaani…",
  resetBtn: "Alusta uuesti",

  meetingTypeLabel: "Koosoleku tüüp",
  meetingTypeGroupAria: "Koosoleku tüüp — väljundi toon",

  sampleSectionTitle: "Näidissituatsioon",
  sampleSectionLead:
    "Vali ülal koosoleku tüüp ja kasuta näidist — näed kohe, kuidas täitmisplaan välja näeb.",

  outputTitle: "Koosolekujärgne tegevuskava",
  outputHint:
    "Segane järelsisu → selge plaan: tegevused, vastutajad, tähtajad ja järelkiri kopeerimiseks.",

  transformStripLabel: "Tegevustplaan valmis",
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

  sectionKokkuvote: "Tegevuse taust",
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
  copyKokkuvote: "Kopeeri tegevuse taust",
  copyAll: "Kopeeri kõik",
  copyJarelkiri: "Kopeeri järelkiri",
  copySubject: "Kopeeri teema",
  copySlack: "Kopeeri Slacki jaoks",
  copyEmail: "Kopeeri e-kirjaks",
  copyTeam: "Kopeeri tiimile",
  copied: "Kopeeritud",

  quickActionsLabel: "Kiirkopeerimine",

  emptyTitle: "Siit algab koosoleku järgne selgus",
  emptyBody:
    "Vali koosoleku tüüp, lisa järelsisu (või näidis) ja vajuta „Koosta järgmised sammud“. Doviqo teeb nähtavaks tegevused, vastutajad, tähtajad ja järelkirja — mitte ei hoia sulle märkmeid alles.",

  loadingTitle: "Koostan tegevustplaani…",
  loadingHint:
    "Eraldame tegevused, vastutajad ja tähtajad; seome need kokku tegevuse tausta ja järelkirjaga.",
  loadingStep1: "Tegevused ja vastutajad",
  loadingStep2: "Tähtajad ja struktuur",
  loadingStep3: "Tegevuse taust ja järelkiri",

  successHint:
    "Kontrolli vastutajad ja tähtajad — seejärel kopeeri kanalisse või meilile.",

  emptyError: "Lisa vähemalt üks rida koosoleku järelsisust.",

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
