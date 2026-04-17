/**
 * Shared motion tokens — one easing curve keeps scroll reveals and hero motion coherent.
 */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  reveal: 0.58,
  staggerChild: 0.48,
  heroEnter: 0.52,
  ctaSwap: 0.42,
} as const;

export type Meeting = {
  id: string;
  title: string;
  source: "Märkmed" | "Üleskirjutus";
  snippet: string;
  actionItems: Array<{
    text: string;
    owner: string;
    due: string;
    status: "Mustand" | "Ootel" | "Käimas" | "Valmis";
  }>;
  owners: Array<{ name: string; focus: string; due: string }>;
  recap: string;
  followUp: string;
};

export const demoMeetings: Meeting[] = [
  {
    id: "weekly",
    title: "Nädala tootesünk",
    source: "Üleskirjutus",
    snippet:
      "Osalejad: Anna, Martin, Elena, Tomas. Otsused: onboarding täiendused järgmisse sprinti; uuendatud kliendipakkumine neljapäevaks; analüütika koristus järgmise nädala peale.",
    actionItems: [
      {
        text: "Viimistle onboardingi tekst",
        owner: "Anna",
        due: "kolmapäev",
        status: "Valmis",
      },
      {
        text: "Saada pakkumise mustand",
        owner: "Martin",
        due: "neljapäev",
        status: "Käimas",
      },
      {
        text: "Vaata lahtisi blokke",
        owner: "Elena",
        due: "homme",
        status: "Mustand",
      },
    ],
    owners: [
      { name: "Anna", focus: "Onboardingi tekst", due: "kolmapäev" },
      { name: "Martin", focus: "Kliendipakkumine", due: "neljapäev" },
      { name: "Elena", focus: "Blokkide ülevaatus", due: "homme" },
      { name: "Tomas", focus: "Analüütika koristus (järgmine nädal)", due: "järgmine nädal" },
    ],
    recap:
      "3 otsust\n3 tegevust määratud\n2 tähtaega sel nädalal\n1 blokker veel lahti",
    followUp:
      "Teema: Järgmised sammud tänasest tootesünkist\n\nTere, tiim,\nlühike kokkuvõte tänasest koosolekust.\nAnna viimistleb onboardingi teksti kolmapäevaks.\nMartin saadab uuendatud pakkumise neljapäevaks.\nElena vaatab blokke homme.\nAnalüütika koristuse paneme järgmise nädala peale.",
  },
  {
    id: "customer",
    title: "Kliendi eskalatsioon",
    source: "Märkmed",
    snippet:
      "Klient on õiguste tõttu kinni. Vajame lühiajalist lahendust + püsivat parandust. Määra vastutaja, SLA ja uuendus kahe tunni jooksul.",
    actionItems: [
      {
        text: "Tuvasta õiguste viga ja salvesta logid",
        owner: "Sam Chen",
        due: "täna",
        status: "Käimas",
      },
      {
        text: "Koosta kliendile uuendus: ajutine lahendus + ajakava",
        owner: "Nina Park",
        due: "2 h",
        status: "Mustand",
      },
      {
        text: "Vii püsiv parandus lipu taha",
        owner: "Alex (sina)",
        due: "esmaspäev",
        status: "Ootel",
      },
    ],
    owners: [
      { name: "Sam Chen", focus: "Põhjus + logid", due: "täna" },
      { name: "Nina Park", focus: "Kliendi uuendus + selgus", due: "2 h" },
      { name: "Alex (sina)", focus: "Parandus + väljalase", due: "esmaspäev" },
    ],
    recap:
      "Olukord: klient kinni õiguste tõttu.\nPlaan: Sam taastab ja logib täna. Nina saadab uuenduse kahe tunni jooksul. Püsiv parandus lipu taga esmaspäeval.",
    followUp:
      "Teema: Uuendus õiguste probleemi kohta\n\nTäname kannatlikkuse eest — siin on plaan. Ajutine lahendus on täna kättesaadav, püsiv parandus lipu taga esmaspäeval.\n\nJärgmine uuendus ~2 tunni pärast kinnitatud ajakavaga.",
  },
];
