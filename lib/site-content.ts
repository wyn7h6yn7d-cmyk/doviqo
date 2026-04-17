/**
 * Kogu lehe tekst — eesti keel, ühtne terminoloogia.
 */

export const siteMeta = {
  title: "Doviqo — koosoleku märkmed selgeteks järgmisteks sammudeks",
  description:
    "Doviqo aitab väikestel tiimidel muuta märkmed ja transkriptsiooni tegevusteks, vastutajateks, tähtaegadeks ja saatmisvalmis järelkirjaks. Ei salvestit — ainult töö pärast koosolekut.",
} as const;

export const nav = {
  brand: "Doviqo",
  links: [
    { href: "#product", label: "Toode" },
    { href: "#how", label: "Kuidas see töötab" },
    { href: "#why", label: "Miks Doviqo" },
  ] as const,
  cta: "Liitu ootenimekirjaga",
  homeAria: "Doviqo avaleht",
  navAria: "Peamine navigeerimine",
  menuOpen: "Ava menüü",
  menuClose: "Sulge menüü",
} as const;

export const hero = {
  eyebrow: "Koosolekujärgne töövoog väikestele tiimidele",
  headline:
    "Muuda koosoleku märkmed minutitega selgeteks järgmisteks sammudeks.",
  subheadline:
    "Doviqo aitab väikestel tiimidel muuta märkmed ja transkriptsiooni tegevusteks, vastutajateks, tähtaegadeks ja saatmisvalmis järelkirjaks.",
  primaryCta: "Liitu ootenimekirjaga",
  secondaryCta: "Vaata näidet",
  helper:
    "Doviqo on praegu varajases versioonis. Liitu nimekirjaga ja saad esimesena teada, kui avame ligipääsu.",
} as const;

/** Hero parem pool — sisend → väljund (ühes vaates). */
export const heroPreview = {
  inputLabel: "Sisend",
  inputLines: [
    "onboarding — copy vajab parandust",
    "uus kliendipakkumine saata neljap",
    "analytics cleanup → järgmisse nädalasse",
    "Elena vaatab blokkerid üle",
    "tiimile kokkuvõte",
  ],
  bridge: "Doviqo",
  actionsLabel: "Tegevused",
  actions: [
    { line: "Anna — vii onboardingu tekst lõpuni — K" },
    { line: "Martin — saada kliendipakkumine — N" },
    { line: "Elena — vaata blokkerid üle — homme" },
  ],
  followUpLabel: "Järelkiri (mustand)",
  followUpLines: [
    "Tere!",
    "Siin on tänase koosoleku järgmised sammud.",
    "Anna viib onboardingu teksti lõpuni kolmapäevaks.",
    "Martin saadab uuendatud kliendipakkumise neljapäevaks.",
    "Elena vaatab blokkerid üle homseks.",
    "Analytics cleanup lükkub järgmisse nädalasse.",
  ],
} as const;

/** Demo sektsioon — täielik näidis (sisend → teisendus → väljund). */
export const demo = {
  id: "product",
  eyebrow: "Toode",
  title: "Mida saad sisse panna — ja mis tuleb välja",
  description:
    "Üks ja sama koosolek: kõigepealt nii, nagu märkmed tavaliselt välja näevad. Seejärel see, mille Doviqo sinu tiimile ette annab.",
  input: {
    meetingTitle: "Nädalakoosolek",
    participants: "Anna, Martin, Elena, Tomas",
    label: "Märkmed",
    bullets: [
      "onboarding copy vajab parandust",
      "uus kliendipakkumine saata neljapäevaks",
      "analytics cleanup lükata järgmisse nädalasse",
      "Elena vaatab blockerid üle",
      "vaja saata tiimile kokkuvõte",
    ],
  },
  transform: {
    label: "Doviqo",
    title: "Struktuur teksti seest",
    body: "Eraldame tegevused, vastutajad ja tähtajad ning koostame järelkirja mustandi.",
  },
  output: {
    label: "Väljund",
    actionsTitle: "Tegevused",
    actions: [
      "Anna — vii onboardingu tekst lõpuni — K",
      "Martin — saada kliendipakkumine — N",
      "Elena — vaata blokkerid üle — homme",
    ],
    followTitle: "Järelkiri",
    followBody: `Tere!

Siin on tänase koosoleku järgmised sammud.
Anna viib onboardingu teksti lõpuni kolmapäevaks.
Martin saadab uuendatud kliendipakkumise neljapäevaks.
Elena vaatab blokkerid üle homseks.
Analytics cleanup lükkub järgmisse nädalasse.`,
  },
} as const;

export const how = {
  id: "how",
  title: "Kuidas Doviqo töötab",
  steps: [
    {
      n: "01",
      title: "Lisa märkmed",
      body: "Kasuta olemasolevaid märkmeid või koosoleku üleskirjutust.",
    },
    {
      n: "02",
      title: "Vaata üle järgmised sammud",
      body: "Doviqo teeb nähtavaks tegevused, vastutajad ja tähtajad.",
    },
    {
      n: "03",
      title: "Saada edasi ja liigu tööga edasi",
      body: "Kasuta kokkuvõtet, järelkirja ja tegevusplaani kohe pärast koosolekut.",
    },
  ] as const,
} as const;

export const benefits = {
  id: "why",
  title: "Miks tiimid Doviqot vajavad",
  intro:
    "Väike tiim ei vaja järjekordset platvormi — vaja on selgust, kes teeb mis ja millal. Doviqo on selle jaoks.",
  items: [
    {
      title: "Vähem käsitsi kokkuvõtteid",
      text: "Kokkuvõte ja järelkiri on olemas — vähem kopeerimist ja ümberkirjutamist.",
    },
    {
      title: "Selged vastutajad ja tähtajad",
      text: "Iga tegevus on kellegi nimel ja tähtajaga, mitte märkmete lõpus ununenud.",
    },
    {
      title: "Vähem ununenud tegevusi",
      text: "Järgmised sammud on nähtavad kohe pärast koosolekut, mitte nädal hiljem.",
    },
    {
      title: "Kiirem järeltegevus pärast koosolekut",
      text: "Minutid, mitte tunnid — et pärast koosolekut saaks kohe edasi liikuda.",
    },
  ] as const,
} as const;

export const waitlist = {
  id: "waitlist",
  title: "Liitu ootenimekirjaga",
  lead:
    "Doviqo on hetkel varajases versioonis. Jäta oma e-post ja saad esimesena teada, kui avame ligipääsu.",
  emailLabel: "E-post",
  placeholder: "Sinu e-post",
  hint: "Üks teade, kui ligipääs avaneb. Ei rämpsposti.",
  submit: "Soovin ligipääsu",
  submitting: "Saadan…",
  successTitle: "Aitäh! Panime su nimekirja kirja.",
  successBody:
    "Kirjutame, kui saame sind sisse võtta. Kui soovid teist aadressi kasutada, vajuta all olevat nuppu.",
  successCta: "Lisa teine e-post",
  errorInvalid: "Palun sisesta korrektne e-posti aadress.",
  errorEmpty: "Palun sisesta e-posti aadress.",
  errorGeneric: "Midagi läks valesti. Proovi hetk hiljem uuesti.",
} as const;

export const footer = {
  tagline: "Doviqo — muuda koosoleku märkmed selgeteks järgmisteks sammudeks.",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;
