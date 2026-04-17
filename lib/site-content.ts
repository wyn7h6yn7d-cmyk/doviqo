/**
 * Doviqo — avalehe tekstid (koosolekujärgne tegevus, mitte märkmerakendus).
 */

export const siteMeta = {
  title: "Doviqo — koosolekujärgne tegevusplaan",
  description:
    "Väikestele tiimidele: muuda pärast koosolekut segadus tegevusteks, vastutajateks, tähtaegadeks ja saatmisvalmis järelkirjaks. Doviqo ei salvesta märkmeid — see teeb töö, mis saab pärast koosolekut.",
  keywords: [
    "koosolek",
    "järeltegevus",
    "tegevuskava",
    "järelkiri",
    "vastutaja",
    "tähtaeg",
    "väike tiim",
    "üleskirjutus",
  ],
} as const;

export const nav = {
  brand: "Doviqo",
  links: [
    { href: "#product", label: "Toode" },
    { href: "#how", label: "Kuidas see töötab" },
    { href: "#benefits", label: "Miks Doviqo" },
    { href: "/studio", label: "Studio" },
  ] as const,
  studioCta: "Ava Studio",
  cta: "Ootenimekiri",
  homeAria: "Doviqo avaleht",
  navAria: "Põhinavigatsioon",
  menuOpen: "Ava menüü",
  menuClose: "Sulge menüü",
  studioBadge: "Studio",
  backHome: "Avaleht",
} as const;

export const hero = {
  eyebrow: "Pärast koosolekut, mitte märkmete hulgas",
  headline: "Koosoleku märkmed ei vii tööd edasi. Järgmised sammud viivad.",
  subheadline:
    "Doviqo aitab väikestel tiimidel muuta märkmed, üleskirjutused ja koosoleku sisu tegevusteks, vastutajateks, tähtaegadeks ja saatmisvalmis järelkirjaks — ilma tühja kokkuvõtte kirjutamiseta.",
  clarification:
    "Doviqo ei ole koht, kus märkmed „elavad“. See on koht, kus selgineb, mis pärast koosolekut tegelikult juhtub — struktuur, vastutus ja järelkiri.",
  primaryCta: "Ava Studio",
  secondaryCta: "Ootenimekiri",
  helper:
    "Studio demo töötab brauseris. Ootenimekirjaga saad teada, kui täisversioon valmis on.",
} as const;

export const heroPreview = {
  messyLabel: "Segane koosolekujärgne sisend",
  messyLines: [
    "anna — onboarding tekst… kolmapäev??",
    "martin acme pakkumine neljap",
    "elena takistused homme üle",
    "analüütika võlg → järgmine nädal",
    "kiri tervele tiimile pärast koosolekut",
  ],
  rawTextBadge: "Toores sisend",
  outLabel: "Selge tegevusplaan",
  actionsTitle: "Tegevused",
  actions: [
    { owner: "Anna", task: "Onboardingi e-kirja tekst", due: "kolmapäevaks" },
    { owner: "Martin", task: "Pakkumine ACME-le", due: "neljapäevaks" },
    { owner: "Elena", task: "Takistuste ülevaatus", due: "homme" },
  ],
  deadlinesTitle: "Tähtajad",
  deadlinesSummary: "homme · neljapäevaks · järgmine nädal",
  emailTitle: "Järelkiri",
  emailSubject: "Järgmised sammud pärast koosolekut",
  emailPreview: `Tere,

Siin on kokkulepitud järgmised sammud, vastutajad ja tähtajad — palun vaata ringi…`,
} as const;

export const productProof = {
  id: "product",
  title: "Teave sisse, järgmised sammud välja",
  lead: "Märkmerakendused hoiavad infot. Doviqo teeb järgmise sammu selgeks: tegevused, omanikud, tähtajad ja valmis järelkiri — see töö tuleb pärast koosolekut niikuinii.",
  inputStep: {
    label: "Sisend",
    body: "Märkmed või üleskirjutus — nii, nagu need päriselt välja tulevad.",
  },
  processStep: {
    label: "Struktuur",
    body: "Doviqo eraldab tegevused, vastutajad ja tähtajad ning paneb kokku kokkuvõtte ja järelkirja.",
  },
  outputStep: {
    label: "Väljund",
    items: [
      "Tegevused ja vastutajad",
      "Tähtajad ühes vaates",
      "Saatmisvalmis järelkiri (ka teemaga)",
    ] as const,
  },
  cta: "Ava Studio",
  ctaHint: "Avab Doviqo Studio — koosolekujärgne demo otse brauseris.",
} as const;

export const howItWorks = {
  id: "how",
  eyebrow: "" as const,
  title: "Kuidas see töötab",
  lead: "Kolm sammu: sisu sisse, plaan välja, siis edasiandmine.",
  steps: [
    {
      title: "Lisa koosoleku sisu",
      body: "Kleebi märkmed või üleskirjutus — mitte „ilusaks“ kirjutades.",
    },
    {
      title: "Saa tegevusplaan ja vastutus",
      body: "Näed tegevusi, vastutajaid ja tähtaegu ühes vaates.",
    },
    {
      title: "Jaga ja mine töö juurde",
      body: "Kopeeri järelkiri või kokkuvõte — vähem käsitsi meelde tuletamist.",
    },
  ] as const,
} as const;

export const benefits = {
  id: "benefits",
  eyebrow: "" as const,
  title: "Miks see väikese tiimi jaoks mõistlik on",
  lead:
    "Vähem segadust pärast koosolekut — rohkem tegevust, mis tegelikult edasi läheb.",
  items: [
    {
      title: "Vähem järelkirja nullist",
      body: "Ei pea iga kord uuesti kirjutama, mida märkmetes juba oli — struktuur tuleb ette.",
    },
    {
      title: "Kes, mis, millal",
      body: "Vastutus ja tähtajad on kohe näha — vähem „kes seda tegi?“.",
    },
    {
      title: "Vähem ununenud punkte",
      body: "Järgmised sammud ei kao chati või dokumendi lõppu.",
    },
    {
      title: "Kiirem järeltegevus",
      body: "Plaan valmis siis, kui koosolek veel meeles on.",
    },
  ] as const,
} as const;

export { waitlist } from "@/lib/waitlist/messages";

export const footer = {
  tagline:
    "Doviqo — koosolekujärgne tegevus: järgmised sammud, vastutajad, järelkiri.",
  navLabel: "Jaluse lingid",
  studioLink: "Doviqo Studio",
  waitlistLink: "Ootenimekiri",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;

/** Nupp „tagasi üles“ (ekraani alumine parem nurk). */
export const scrollToTopAria = "Tagasi lehe algusesse" as const;
