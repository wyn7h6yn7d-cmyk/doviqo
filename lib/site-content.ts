/**
 * Doviqo — avalehe tekstid (koosoleku järgne täitmine, mitte märkmerakendus).
 */

export const siteMeta = {
  title: "Doviqo — koosoleku järgne täitmine",
  description:
    "Koosoleku järel ei pea sa käsitsi kokku võtma — Doviqo Studio teeb järelsisust tegevuskava ja järelkirja. Proovi brauseris; märkmed jäävad mujale, selgus saab siit.",
  keywords: [
    "koosolek",
    "järeltegevus",
    "tegevuskava",
    "järelkiri",
    "vastutaja",
    "tähtaeg",
    "väike tiim",
    "järelkontroll",
    "täitmine",
  ],
} as const;

export const nav = {
  brand: "Doviqo",
  links: [
    { href: "/studio", label: "Studiot demo" },
    { href: "#product", label: "Töövoog" },
    { href: "#benefits", label: "Miks Doviqo" },
  ] as const,
  studioCta: "Proovi Studiot",
  cta: "Ootenimekiri",
  homeAria: "Doviqo avaleht",
  navAria: "Põhinavigatsioon",
  menuOpen: "Ava menüü",
  menuClose: "Sulge menüü",
  studioBadge: "Studio",
  backHome: "Avaleht",
} as const;

export const hero = {
  eyebrow: "Interaktiivne demo · Doviqo Studio",
  headline: "Koosoleku lõpus ei ole küsimus „märkmetes“, vaid „mis edasi?“",
  subheadline:
    "Doviqo teeb järelsisust tegevused, vastutajad, tähtajad ja saatmisvalmis järelkirja. Märkmed jäävad rakendustesse; siin näed kohe, mis töö käima läheb — proovi Studiot.",
  primaryCta: "Ava Doviqo Studio",
  secondaryCta: "Ootenimekiri",
  helper:
    "Studio töötab kohe brauseris. Ootenimekiri annab teada, kui täisversioon valmis on.",
} as const;

export const heroPreview = {
  chromeEyebrow: "Doviqo Studio",
  chromeHint: "Studiot vaate eelvaade (staatiline)",
  messyLabel: "Koosoleku järelsisu — nii nagu see tuli",
  messyLines: [
    "anna — onboarding tekst… kolmapäev??",
    "martin acme pakkumine neljap",
    "elena takistused homme üle",
    "analüütika võlg → järgmine nädal",
    "tiimile järelteavitus peale ühist blokki",
  ],
  rawTextBadge: "Toores järelsisu",
  outLabel: "Tegevuskava ja järelkanal",
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

Siin on kokkulepitud järgmised sammud, vastutajad ja tähtajad — järgmine samm on tööl, mitte taas ümber rääkimisel…`,
  openStudioCta: "Käivita päris demo",
  footnote:
    "Täielik töövoog (koosolekutüübid, täpne struktuur, kopeerimisnupud) — avaneb ainult Studiost.",
} as const;

export const productProof = {
  id: "product",
  eyebrow: "Üks töövoog, päris väljund",
  title: "Sisend → tegevuskava ja järelkiri — Studiod",
  lead:
    "Studios valid konteksti, paned sisse järelsisu ja saad kohe struktuuri: see, mida tiim pärast koosolekut nagunii teeb — ainult kiiremini kui käsitsi.",
  inputStep: {
    label: "Järelsisu",
    body: "Üleskirjutus, bulletid või lõik dokumendist — nii nagu see koosoleku järel kätte saad.",
  },
  processStep: {
    label: "Teisendus",
    body: "Tekstist tulevad välja tegevused, vastutajad ja tähtajad — üldine kokkuvõte jääb tagaplaanile; ees on järgmised sammud.",
  },
  outputStep: {
    label: "Väljund",
    items: [
      "Tegevused ja omanikud ühes vaates",
      "Tähtajad prioriteediga",
      "Saatmisvalmis järelkiri (teema ja sisu)",
    ] as const,
  },
  cta: "Ava päris demo",
  ctaHint:
    "Viib otse Doviqo Studiot — seal on koosoleku tüübid, täpne väljund ja kopeerimine ühe klikiga.",
} as const;

export const howItWorks = {
  id: "how",
  eyebrow: "" as const,
  title: "Kuidas see töötab",
  lead:
    "Kolm sammu — täpselt nii näed Studios: järelsisu sisse, plaan kätte, valmis tekst Slacki või meilile.",
  steps: [
    {
      title: "Aseta sisse koosoleku järelsisu",
      body: "Võib olla üleskirjutus, kiirkonspekt või lõik tekstist — oluline on, mis edasi teha tuleb, mitte lause ilu.",
    },
    {
      title: "Vaata tegevused ja vastutus läbi",
      body: "Näed kohe, kes teeb, mis ja millal — ilma pikast käsitsi läbikammimist.",
    },
    {
      title: "Anna kanalisse ja lükka töö käima",
      body: "Järelkiri või tegevuste plaan on valmis kopeerimiseks; vähem manuaalset meelde tuletamist ja uuesti kirjutamist.",
    },
  ] as const,
  studioCta: "Proovi neid samme Studiost",
  studioCtaHint: "Interaktiivne demo — sama loogika, oma näidis.",
} as const;

export const benefits = {
  id: "benefits",
  eyebrow: "" as const,
  title: "Miks see on täitmine, mitte märkmed",
  lead:
    "Väikesed tiimid ei vaja veel üht teksti hoidlat — nad vajavad kiiresti selget järeltegevust ja kanalisse minevat sõnumit.",
  items: [
    {
      title: "Vähem käsitsi järelkordamist",
      body: "Struktuur ja järelsõnum tulevad järelsisust ette — vähem sama ümberütlemist Slackis ja dokumendis.",
    },
    {
      title: "Selge vastutus ja tähtajad",
      body: "„Kes teeb, mis ja millal“ on kohe näha — vähem „kes seda üldse võttis?“.",
    },
    {
      title: "Järgmised sammud jäävad kinni",
      body: "Tegevused ei kao chati lõppu: need on ees enne uut koosolekut.",
    },
    {
      title: "Kiire start enne kui meeled jahutavad",
      body: "Plaan valmis siis, kui otsused on veel värsge peaga — nagu järjekindel järeltegevus.",
    },
  ] as const,
} as const;

export { waitlist } from "@/lib/waitlist/messages";

export const footer = {
  tagline:
    "Doviqo — koosoleku järgne täitmine. Proovi brauseris: /studio demo näitab toote loogikat kohe.",
  navLabel: "Jaluse lingid",
  studioLink: "Doviqo Studio",
  waitlistLink: "Ootenimekiri",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;

/** Nupp „tagasi üles“ (ekraani alumine parem nurk). */
export const scrollToTopAria = "Tagasi lehe algusesse" as const;
