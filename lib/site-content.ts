/**
 * Doviqo — avalehe tekstid.
 */

export const siteMeta = {
  title: "Doviqo — koosoleku järel tegevuseks",
  description:
    "Väikestele tiimidele: koosoleku märkmed või üleskirjutus muutuvad tegevuste nimekirjaks, vastutajateks, tähtaegadeks ja valmis järelkirjaks. Pole salvesti ega üldine märkmerakendus — vaid tööriist, mis koosoleku lõppedes sammu ette annab.",
  keywords: [
    "koosolek",
    "märkmed",
    "üleskirjutus",
    "tegevused",
    "järelkiri",
    "väike tiim",
    "järeltegevus",
  ],
} as const;

export const nav = {
  brand: "Doviqo",
  links: [
    { href: "#product", label: "Toode" },
    { href: "#how", label: "Kuidas see töötab" },
    { href: "#benefits", label: "Miks Doviqo" },
    { href: "/studio", label: "Prooviversioon" },
  ] as const,
  studioCta: "Proovi brauseris",
  cta: "Ootenimekiri",
  homeAria: "Doviqo avaleht",
  navAria: "Põhinavigatsioon",
  menuOpen: "Ava menüü",
  menuClose: "Sulge menüü",
  /** Studio päises logo kõrval */
  studioBadge: "Prooviversioon",
  /** Studio päises lingi tekst avalehele */
  backHome: "Avaleht",
} as const;

export const hero = {
  eyebrow: "Koosoleku järel: plaan selgeks",
  headline:
    "Koosoleku märkmed tegevusteks, vastutajateks ja järelkirjaks — ilma tühja kokkuvõtte kirjutamiseta.",
  subheadline:
    "Üks töövoog: kleebid sisse märkmed või üleskirjutuse ja saad tegevused, vastutajad, tähtajad, lühikokkuvõtte ning saatmiseks valmis järelkirja.",
  clarification:
    "See pole salvesti ega üldine märkmerakendus. See on tööriist koosoleku järel — et otsused ei jääks paberile.",
  primaryCta: "Proovi brauseris",
  secondaryCta: "Ootenimekiri",
  helper:
    "Demot käivitad kohe brauseris. Ootenimekirjas saad teada, kui täisversioon tuleb.",
} as const;

export const heroPreview = {
  messyLabel: "Segased märkmed",
  messyLines: [
    "anna — onboarding tekst… kolmapäev??",
    "martin acme pakkumine neljap",
    "elena takistused homme üle",
    "analüütika võlg → järgmine nädal",
    "kiri tervele tiimile pärast koosolekut",
  ],
  rawTextBadge: "Toores tekst",
  outLabel: "Ühtlane väljund",
  actionsTitle: "Tegevused",
  actions: [
    { owner: "Anna", task: "Onboardingi e-kirja tekst", due: "kolmapäevaks" },
    { owner: "Martin", task: "Pakkumine ACME-le", due: "neljapäevaks" },
    { owner: "Elena", task: "Takistuste ülevaatus", due: "homme" },
  ],
  deadlinesTitle: "Tähtajad",
  deadlinesSummary: "homme · neljapäevaks · järgmine nädal",
  emailTitle: "Järelkiri",
  emailSubject: "Pärast koosolekut — järgmised sammud",
  emailPreview: `Tere,

Aitäh arutelu eest. Allpool on järgmised sammud, vastutajad ja tähtajad — palun vaata ringi…`,
} as const;

export const productProof = {
  id: "product",
  title: "Tekst sisse, plaan välja",
  lead: "Siin on sama loogika lühidalt: märkmed või üleskirjutus läbivad töötluse ja muutuvad tegevusteks, tähtaegadeks ning valmis järelkirjaks.",
  inputStep: {
    label: "Sisend",
    body: "Märkmed või üleskirjutus — täpselt nii, nagu need päriselt välja tulevad.",
  },
  processStep: {
    label: "Töötlus",
    body: "Doviqo eraldab ridadest tegevused, vastutajad ja tähtajad ning paneb kokku kokkuvõtte.",
  },
  outputStep: {
    label: "Väljund",
    items: [
      "Tegevused vastutajatega",
      "Tähtajad ühes vaates",
      "Valmis järelkiri (ka teemaga)",
    ] as const,
  },
  cta: "Proovi brauseris",
  ctaHint: "Avab Doviqo Studio — töötab kohe siinsamas brauseris.",
} as const;

export const howItWorks = {
  id: "how",
  eyebrow: "" as const,
  title: "Kuidas see töötab",
  lead: "Kolm sammu: märkmed sisse, ülevaade, siis edasiandmine.",
  steps: [
    {
      title: "Lisa märkmed",
      body: "Kasuta olemasolevaid märkmeid või koosoleku üleskirjutust.",
    },
    {
      title: "Vaata järgmised sammud üle",
      body: "Näed tegevusi, vastutajaid ja tähtaegu ühes kohas.",
    },
    {
      title: "Edasta ja mine töö juurde tagasi",
      body: "Kasuta kokkuvõtet ja järelkirja kohe pärast koosolekut.",
    },
  ] as const,
} as const;

export const benefits = {
  id: "benefits",
  eyebrow: "" as const,
  title: "Miks see väikese tiimi jaoks mõistlik on",
  lead:
    "Vähem korraldust pärast koosolekut — rohkem tegevust, mis tegelikult edasi läheb.",
  items: [
    {
      title: "Vähem sama järelkirja nullist",
      body: "Sa ei pea iga kord uuesti algusest kirjutama, mida juba märkmetes oli.",
    },
    {
      title: "Kes teeb, mis ajaks",
      body: "Vastutajad ja tähtajad on kohe näha — vähem segadust.",
    },
    {
      title: "Vähem ununenud punkte",
      body: "Olulised järgmised sammud ei kao chati või märkmete alla ära.",
    },
    {
      title: "Kiirem järeltegevus",
      body: "Kokkuvõte ja järelkiri valmis siis, kui koosolek veel meeles on.",
    },
  ] as const,
} as const;

export { waitlist } from "@/lib/waitlist/messages";

export const footer = {
  tagline:
    "Doviqo — koosoleku märkmed tegevuseks, vastutajateks ja järelkirjaks.",
  navLabel: "Jaluse lingid",
  studioLink: "Doviqo Studio",
  waitlistLink: "Ootenimekiri",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;

/** Nupp „tagasi üles“ (ekraani alumine parem nurk). */
export const scrollToTopAria = "Tagasi lehe algusesse" as const;
