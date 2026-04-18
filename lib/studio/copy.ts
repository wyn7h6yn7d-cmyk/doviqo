/** Doviqo Studio — demo tekstid (koosoleku järgne täitmine, mitte märkmerakendus). */

export const studioMeta = {
  title: "Doviqo Studio — koosoleku järgne tegevuskava",
  description:
    "Interaktiivne demo: koosoleku kontekst, sisend, tegevused, vastutajad, tähtajad ja saatmisvalmis järelkiri — brauseris, ilma pilvesalvestuseta.",
} as const;

/** Kolm emotsionaalset telge — tühja lõuendi seletus (messy → actionable). */
export const studioEmotionalPillars = [
  { before: "Lahtised otsad", after: "Tegevuse plaan" },
  { before: "Uuesti sõnastada", after: "Valmis järeltekst" },
  { before: "Käsitsi koguda", after: "Kopeeri ja saada" },
] as const;

export const studioUi = {
  studioEyebrow: "Koosoleku järgne komandokeskus",
  productName: "Doviqo Studio",
  workspaceSubtitle:
    "Mitte märkmete kast — vaid järeltegevuse selgus: kontekst, sisend, struktuur ja koopia kanalisse. Siin näed, kes teeb, mis ja millal.",

  demoBadge: "Interaktiivne demo",
  demoNotice:
    "Interaktiivne demo: väljund tekib sinu brauseris; pilve või püsivaid märkmeid siin pole. Sisend muutub täitmisplaaniks, mitte arhiivi.",

  waitlistLink: "Ootenimekiri",
  studioNavAria: "Proovilehe lingid",

  workflowAria: "Koosoleku töövoog ja tegevuste lõuend",

  workflowStripTitle: "Viis sammu — siit algab järeltegevus",
  workflowStripHint:
    "Ülemine rida on sinu juhend: samast tekstist tuleb konteksti järgi erinev rõhk ja järelkirja toon.",
  workflowStepLabels: [
    "Kontekst",
    "Sisend",
    "Teisendus",
    "Struktuur",
    "Kanalisse",
  ] as const,

  meetingBarTitle: "Millise koosoleku järgi koostad plaani?",
  meetingBarHint:
    "Kontekst muudab kokkuvõtte rõhku, järelkirja tooni ja seda, mis tähtis tundub — vali enne teisendust.",
  meetingTypeFooterNote:
    "Muudad konteksti uuesti, kui sama tekst peaks kõlama teisiti (nt kliendile vs tiimile).",

  intakeRailTitle: "Koosoleku sissevõtt",
  stepInput: "Lisa koosoleku sisu",
  inputLabel: "Koosoleku sisend",
  inputLabelLong: "Lisa koosoleku sisu — punktid, üleskirjutus või lõik",
  inputHint:
    "Kleebi märkmed või üleskirjutus. Doviqo teeb neist järgmised sammud: tegevused, vastutajad, tähtajad ja valmis järeltekst — mitte ümberkirjutus.",

  transformZoneTitle: "Teisendus täitmiseks",
  transformZoneHint:
    "Üks samm enne väljundit: toorest järelsisust saad tegevuste plaani — see on järgmine töö, mitte ümberkirjutus.",

  bridgeMessy: "Segane sisend",
  bridgeClear: "Tegevuste plaan",

  placeholder: `Näiteks:
- Anna lõpetab onboarding’u teksti kolmapäevaks
- Martin saadab kliendile uuendatud pakkumise neljapäeval
- Elena vaatab blockerid homme üle
- analytics cleanup lükkub järgmisse nädalasse
- tiimile lühike järelteavitus pärast plokki
- järgmises sprindis võtame onboarding’u parandused ette`,

  processBtn: "Loo tegevuskava",
  processing: "Teen järelsisust tegevuskava…",
  resetBtn: "Alusta uuesti",

  meetingTypeLabel: "Koosoleku kontekst",
  meetingTypeGroupAria: "Koosoleku tüüp — määrab järeltegevuse rõhu ja järelkirja tooni",
  meetingTypeContextLine: "Mida see kontekst muudab:",

  sampleSectionTitle: "Näidisjärelsisu",
  sampleSectionLead:
    "Konteksti valik laeb näidise — asenda oma pärisjärelsisuga, et näha täpset väljundit.",

  outputTitle: "Järeltegevuse väljund",
  outputHint:
    "Peamine tulu on siin: kokkuvõte, otsused, tegevused, vastutus, tähtajad ja järelkiri — ühest vaatest kopeeritav kanalisse või meilile.",

  resultStatusBadge: "Järeltegevuse plaan valmis",
  transformStripLabel: "Kohe kasutatav väljund",
  transformSummaryLine: "{raw} rida järelsisust → {items} tegevust",
  transformStripHint:
    "See on sama töö, mida tiim pärast koosolekut niikuinii teeb — Doviqo seab selle kohe kirjas, et saaksid kanalisse minna, mitte uuesti kokku võtta.",

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
  copySlack: "Kopeeri Slacki",
  copyEmail: "Kopeeri e-kirjaks",
  copyTeam: "Kopeeri tiimile",
  copied: "Kopeeritud",
  copiedKokkuvote: "Kopeeritud — kleebi kokkuvõte",
  copiedJarelkiri: "Kopeeritud — kleebi järelkiri",
  copiedAll: "Kopeeritud — kogu plaan",
  copiedTeam: "Kopeeritud — kleebi tiimile",
  copiedEmail: "Kopeeritud — kleebi meili",
  copiedSlack: "Kopeeritud — kleebi Slacki",

  workflowCopyTitle: "Järgmine samm — valmis tekst",
  workflowCopyHint:
    "Vali kanal: kokkuvõte, täisfail, tiim, e-post või Slack. Üks klõps vähendab käsitsi järelsõnumit.",
  quickActionsLabel: "Kiirkopeerimine",
  workflowMoreChannels: "Lisa kanal",

  emptyTitle: "Valmis järeltegevuse paan — ootab sinu sisendit",
  emptyBody:
    "Ülal valid koha ja tooni, vasakule paned koosoleku sisu, seejärel „Loo tegevuskava“. Siia tekivad plokid allpool — sama demo loogika sinu tekstiga.",
  emptyChipsLead: "Siia tekib struktuur:",

  loadingTitle: "Järjestan järeltegevuse…",
  loadingHint:
    "Eraldame olulise, paneme paika vastutuse ja tähtajad, lõime saatmisvalmis järelteksti.",
  loadingStep1: "Tegevused ja vastutajad",
  loadingStep2: "Tähtajad ja struktuur",
  loadingStep3: "Kokkuvõte ja järelkiri",

  successHint:
    "Kopeerimised on valmis kleebimiseks — vaata vastutajad üle, seejärel pane kanalisse või meili.",

  emptyError: "Lisa vähemalt üks rida koosoleku sisust.",

  backHome: "Tagasi avalehele",
} as const;

export type StudioDemoPreset = {
  id: string;
  title: string;
  /** Üks lause: mis see kontekst väljundis rõhutab */
  intent: string;
  body: string;
};

/** Koosoleku tüübid — pealkiri + näidissisu (toon tuleb valikust). */
export const studioDemoPresets: readonly StudioDemoPreset[] = [
  {
    id: "team-weekly",
    title: "Tiimi koosolek",
    intent: "Sisemine rõhk: ülesanded, takistused, kiire kanal.",
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
    intent: "Kliendisuhe: kinnitused, lubadused, järgmine samm.",
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
    intent: "Müük: materjalid, järgmine kontakt, otsustus.",
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
    intent: "Täitmine: verstapostid, sõltuvused, kuupäevad.",
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
    intent: "Värbamine: järgmine voor, sisemine koordineerimine.",
    body: `Värbamisintervjuu

- kandidaat jättis väga hea mulje
- vaja kontrollida referentse
- Kati saadab kodutöö täna õhtul
- Mart annab homseks värbamistiimile lühikese sisemise tagasiside
- otsus võiks tulla hiljemalt reedel
- kutsuda kandidaat järgmisesse vooru, kui referentsid on korras`,
  },
];
