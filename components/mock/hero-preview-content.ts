/** Staatiline tekst hero eelvaate kaartidele — üks allikas. */

export const HERO_MEETING_TITLE = "Nädala tootesünk";

export const HERO_DECISIONS = [
  "Onboarding täiendused järgmisse sprinti",
  "Uuendatud pakkumine neljapäevaks",
  "Analüütika koristus järgmise nädala peale",
] as const;

export const HERO_ACTION_ITEMS = [
  {
    task: "Viimistle onboardingi tekst",
    owner: "Anna",
    due: "K",
    status: "Avatud",
  },
  {
    task: "Saada pakkumise mustand",
    owner: "Martin",
    due: "N",
    status: "Ülevaatusel",
  },
  {
    task: "Vaata blokke",
    owner: "Elena",
    due: "Homme",
    status: "Blokeeritud",
  },
] as const;

export const HERO_EMAIL_SUBJECT = "Järgmised sammud tänasest sünkist";

export const HERO_EMAIL_BODY = `Tere, tiim,
lühike kokkuvõte tänasest koosolekust.
Anna viimistleb onboardingi teksti kolmapäevaks.
Martin saadab uuendatud pakkumise neljapäevaks.
Elena vaatab blokke homme.
Analüütika koristuse paneme järgmise nädala peale.`;
