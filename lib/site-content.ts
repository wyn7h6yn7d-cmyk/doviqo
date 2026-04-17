/**
 * Doviqo — avalehe tekstid (emakeelne, müügivalmis).
 */

export const siteMeta = {
  title: "Doviqo — koosoleku märkmed tegevusteks ja valmis järelkirjaks",
  description:
    "Doviqo aitab väiksematel tiimidel segaduslikud koosoleku märkmed või üleskirjutus muuta tegevusteks, vastutajateks, tähtaegadeks ja saatmiseks valmis järelkirjaks. Proovi Doviqo Studiot brauseris.",
  keywords: [
    "koosolek",
    "märkmed",
    "üleskirjutus",
    "tegevused",
    "järelkiri",
    "tiim",
    "väike tiim",
  ],
} as const;

export const nav = {
  brand: "Doviqo",
  links: [
    { href: "#product", label: "Tõestus" },
    { href: "#how", label: "Kuidas töötab" },
    { href: "#benefits", label: "Kasu" },
    { href: "/studio", label: "Studio" },
  ] as const,
  cta: "Liitu ootenimekirjaga",
  homeAria: "Doviqo avaleht",
  navAria: "Peamine navigeerimine",
  menuOpen: "Ava menüü",
  menuClose: "Sulge menüü",
} as const;

export const hero = {
  eyebrow: "Koosoleku järel — kiiremini kui käsitsi",
  headline: "Segased märkmed saavad selge tegevuskava ja järelkirja.",
  subheadline:
    "Kleebi sisse märkmed või lühike üleskirjutus. Doviqo eraldab järgmised sammud, vastutajad ja tähtajad ning paneb kokku kokkuvõtte ja valmis e-kirja — ühe töövooga.",
  primaryCta: "Proovi Doviqo Studiot",
  secondaryCta: "Liitu ootenimekirjaga",
  helper:
    "Studio on interaktiivne demo: töötab kohe brauseris. Ootenimekirjaga tead esimesena, kui lisanduvad tiimivaated ja sügavam integratsioon.",
  trustLine:
    "Demorežiimis töödeldakse teksti sinu brauseris; me ei salvesta märkmeid serverisse.",
} as const;

export const demo = {
  id: "product",
  proofCaption: "Interaktiivne tõestus",
  title: "Enne ja pärast — sama koosolek, teine selgus",
  description:
    "Vasakul on märkmed nagu need tihti välja jäävad. Paremal on sama sisu struktureeritud: tegevused, vastutajad, tähtajad ja järelkiri — täpselt see, mida Studiost oma tekstiga saad.",
  input: {
    meetingTitle: "Nädalakoosolek",
    participants: "Anna, Martin, Elena, Tomas",
    label: "Toore tekstina",
    bullets: [
      "onboarding e-kirja tekst vajab viimistlust",
      "uuendatud pakkumine ACME-le neljapäevaks",
      "analytics võlg lükata järgmisse nädalasse",
      "Elena vaatab blokeerivad kohad üle homme",
      "Slacki lühike kokkuvõte kogu tiimile",
    ],
  },
  output: {
    label: "Struktureeritud tulemus",
    actionsTitle: "Tegevused",
    actions: [
      "Anna — viib onboardingu teksti lõpuni — kolmapäevaks",
      "Martin — saadab uuendatud pakkumise — neljapäevaks",
      "Elena — vaatab blokeerivad kohad üle — homme",
    ],
    followTitle: "Valmis järelkiri (katkend)",
    followBody: `Tere,

Täname tänase koosoleku eest. Alljärgnevalt on järgmised sammud, vastutajad ja tähtajad — vaata palun üle.

1. Anna: onboarding e-kirja tekst (kolmapäevaks)
2. Martin: uuendatud pakkumine ACME-le (neljapäevaks)
3. Elena: blokeerivad kohad (homme)

Kui tähtaeg või vastutaja vajab muutmist, anna teada.

Tervitades`,
  },
  footerHint:
    "Proovi sama oma märkmetega Studiost — tulemus sõltub sinu sisendist ja on alati kopeeritav edasi saatmiseks.",
  studioCta: "Ava Doviqo Studio",
} as const;

export const howItWorks = {
  id: "how",
  eyebrow: "Töövoog",
  title: "Kuidas see kolme minutiga käib",
  lead:
    "Üks sisend, üks töövoog. Ülejäänu on korrastatud väljund, mida saad kohe jagada.",
  steps: [
    {
      title: "Kleebi märkmed või üleskirjutus",
      body:
        "Too tekst otse märkmest, dokumendist või koosoleku transkriptsioonist — üks mõte rea kohta töötab kõige kindlamini.",
    },
    {
      title: "Doviqo eraldab tegevused ja vastutajad",
      body:
        "Loeme ridadest välja, kes mida teeb ja mis ajaks — nii ei jää ülesanded lõputult „kellegi kaela“.",
    },
    {
      title: "Saad tähtajad ja kokkuvõtte ühele lehele",
      body:
        "Näed kohe, mis vajab kinnitamist ja mis on juba ajaraamiga seotud — ilma eraldi tabelita.",
    },
    {
      title: "Kopeeri järelkiri ja saada minutitega",
      body:
        "Valmis e-kirja mustand koos teemareaga — järelejäänud on vaid isikupärane viimistlus.",
    },
  ] as const,
} as const;

export const benefits = {
  id: "benefits",
  eyebrow: "Miks Doviqo",
  title: "Väike tiim, suur koormus — vähem haldust, rohkem tegevust",
  lead:
    "Kui koosolekud on tihedad, ei pea „järgmiste sammude“ kokkuvõtmine võtma pool tundi. Doviqo aitab hoida fookust tööl, mitte administraatoril.",
  items: [
    {
      title: "Selgus ilma uue tööriistata",
      body:
        "Sa ei pea õppima keerulist projektitarkvara — see on märkmetest tegevuskavaks ja kirjaks, mida juba kasutad.",
    },
    {
      title: "Vastutus ei kao pooleli",
      body:
        "Iga rida saab omaniku ja tähtaja; vähem „kes seda tegi?“ ja rohkem tegelikku edasiliikumist.",
    },
    {
      title: "Järelkiri valmis sama päeva sees",
      body:
        "Saad koosoleku lõpus kohe saata kokkuleppe kokkuvõtte — ilma tühja lehte vaadates.",
    },
    {
      title: "Demost päris tooteni üks sirge tee",
      body:
        "Täna töötab demo brauseris. Tulevikus lisanduvad tiimivaated ja integratsioonid — sama töövoog jääb.",
    },
  ] as const,
} as const;

export { waitlist } from "@/lib/waitlist/messages";

export const footer = {
  tagline:
    "Doviqo — koosoleku märkmed tegevusteks, vastutajatega ja valmis järelkirjaks.",
  navLabel: "Jaluse lingid",
  studioLink: "Doviqo Studio",
  waitlistLink: "Ootenimekiri",
} as const;

export const skipLink = "Liigu põhisisu juurde" as const;
