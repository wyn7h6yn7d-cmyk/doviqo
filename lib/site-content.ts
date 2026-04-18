/**
 * Doviqo — avalehe tekstid (koosoleku järgne täitmine, mitte märkmerakendus).
 */

export const siteMeta = {
  title: "Doviqo — koosoleku järgne täitmine",
  description:
    "Väikestele tiimidele: koosoleku järelsisust saad selge tegevuskava — vastutajad, tähtajad ja saatmisvalmis järelkiri. Doviqo ei kogu ega hoia märkmeid; see kiirendab seda, mis pärast koosolekut niikuinii ära tuleb teha.",
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
  eyebrow: "Koosolekust välja, töö juurde",
  headline: "Pärast koosolekut ei jää õhku „mis edasi?“",
  subheadline:
    "Doviqo seab koosoleku järel kinni tegevused, vastutajad, tähtajad ja valmis järelkirja — et vähem käsitsi korrata ja kiiremini käima lükata. See ei ole märkmerakendus ega üldine kokkuvõtetööriist: fookus on täitmisel, mitte teksti hoidmisel.",
  clarification:
    "Siia ei pea midagi „alamaks“ koguma: sisend on koosoleku järelsisu (üleskirjutus, logi, lõik tekstist), väljund on plaan ja kanalisse pandav järelsõnum.",
  primaryCta: "Ava Studio",
  secondaryCta: "Ootenimekiri",
  helper:
    "Studio demo töötab brauseris. Ootenimekirjaga tead, kui täisversioon tuleb.",
} as const;

export const heroPreview = {
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
} as const;

export const productProof = {
  id: "product",
  title: "Segasest järelsisust saad täitmisvalmis plaani",
  lead:
    "Märkmerakendused hoiavad teksti alles. Doviqo ei salvesta koosolekut kuskile arhiivi — see tõstab esile järgmised sammud, vastutuse ja tähtajad ning annab valmis järelsõnumi, mille annad kohe tiimile või kliendile. Eesmärk on kiirem järeltegevus, mitte „puhtam lõik“.",
  inputStep: {
    label: "Järelsisu",
    body: "Üleskirjutus, bulletid või lõik dokumendist — nii nagu see koosoleku järel kätte saad.",
  },
  processStep: {
    label: "Struktuur",
    body: "Doviqo eraldab tegevused, vastutajad ja tähtajad ning seab need järjekorda — mitte ei asenda koosolekut ühe üldise „kokkuvõttega“.",
  },
  outputStep: {
    label: "Väljund",
    items: [
      "Tegevused ja omanikud ühes vaates",
      "Tähtajad prioriteediga",
      "Saatmisvalmis järelkiri (teema ja sisu)",
    ] as const,
  },
  cta: "Ava Studio",
  ctaHint: "Avab Doviqo Studio — proovi koosoleku järgset demot brauseris.",
} as const;

export const howItWorks = {
  id: "how",
  eyebrow: "" as const,
  title: "Kuidas see töötab",
  lead: "Kolm sammu: võta järelsisu, tõmba plaan välja, jaga ja mine tegema.",
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
} as const;

export const benefits = {
  id: "benefits",
  eyebrow: "" as const,
  title: "Miks väike tiim seda kasutab",
  lead:
    "Koosolekud vahetuvad kiiresti; Doviqo hoiab fookuse asjadel, mis muidu kipuvad pudenema või vestluses ära kaduma.",
  items: [
    {
      title: "Vähem käsitsi järelkordamist",
      body: "Ei pea nullist kokku panema seda, mis juba koosolekul otsustati — struktuur ja järelsõnum tulevad ette.",
    },
    {
      title: "Selge „kes, mis, millal“",
      body: "Vastutus ja tähtajad on kohe näha — vähem segadust ja „kes seda üldse võttis?“.",
    },
    {
      title: "Tegevused püsivad esiplaanil",
      body: "Järgmised sammud ei kao chati lõppu ega unune dokumendi keskele — need on järjest ees.",
    },
    {
      title: "Kiirem start pärast koosolekut",
      body: "Saad täitmisplaani valmis siis, kui otsused on värske peaga veel meeles.",
    },
  ] as const,
} as const;

export { waitlist } from "@/lib/waitlist/messages";

export const footer = {
  tagline:
    "Doviqo — koosoleku järgne täitmine: tegevused, vastutajad, tähtajad, valmis järelväljund.",
  navLabel: "Jaluse lingid",
  studioLink: "Doviqo Studio",
  waitlistLink: "Ootenimekiri",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;

/** Nupp „tagasi üles“ (ekraani alumine parem nurk). */
export const scrollToTopAria = "Tagasi lehe algusesse" as const;
