/**
 * Doviqo — avalehe tekstid (koosoleku järgne täitmine, mitte märkmerakendus).
 */

export const siteMeta = {
  title: "Doviqo — koosoleku järgne täitmine",
  description:
    "Koosoleku järeltegevus brauseris: proovi Doviqo Studiot — tegevused, vastutajad, tähtajad, järelkiri. Interaktiivne demo; fookus on täitmisel, mitte märkmete kogumisel.",
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
    { href: "#how", label: "Kuidas see töötab" },
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
  headline: "Koosoleku lõpus algab järeltegevus — mitte „kokkuvõtte“ kirjutamine",
  subheadline:
    "Doviqo muudab järelsisu tegevusteks, vastutuseks, tähtaegadeks ja kanalisse minevaks tekstiks. Ei ole märkmete hoidla: sama loogika töötab Studiot demos — kleebi oma tekst, näed kohe planni.",
  clarification:
    "Sisend on koosoleku järelsisu (üleskirjutus, punktid, lõik). Väljund on töö, mida muidu teeksid käsitsi: plaan, mis on valmis saatmiseks.",
  demoCallout:
    "Studiot demo näitab toodet kohe: üks klõps, oma järelsisu, päris struktuur — pole ainult turundustekst.",
  primaryCta: "Proovi Doviqo Studiot",
  secondaryCta: "Ootenimekiri",
  helper:
    "Studio demo avaneb kohe ja töötab ainult brauseris. Ootenimekiri on eraldi: uudised tulevase täisversiooni kohta.",
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
  eyebrow: "Demoga tõestatud töövoog",
  title: "Studiot avades näed sama loogikat oma tekstiga",
  lead:
    "Avalehel on staatiline näidis; /studio demos paned pärisjärelsisu ja näed kohe kokkuvõtet, tegevusi, tähtaegu ja järelkirja. See on järeltegevuse tööriist — mitte koosoleku „märkmete“ kogumise moodul.",
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
