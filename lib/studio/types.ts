export type TegevusRida = {
  kirjeldus: string;
  vastutaja: string;
  tahtaeg: string;
};

/** Vastutaja koos tema ülesannete arvu ja lühikirjeldustega. */
export type VastutajaInfo = {
  nimi: string;
  tegevusteArv: number;
  /** Lühised ülesande pealkirjad (esimesed sõnad). */
  ulesanded: string[];
};

/** Tegevused rühmitatuna tähtaja järgi. */
export type TahtaegGrupp = {
  tahtaeg: string;
  read: TegevusRida[];
};

/** Statistika, mida UI kasutab „enne → pärast“ nähtavaks tegemiseks. */
export type TransformSummary = {
  rawLineCount: number;
  rawCharCount: number;
  /** Pärast päiste/tyhjade väljajätmist ja liitmist. */
  actionableLineCount: number;
  structuredItemCount: number;
  uniqueVastutajad: number;
  /** Mitu tegevust sai konkreetse tähtaja (mitte „—“). */
  tahtaegadega: number;
};

export type StudioTulemus = {
  tegevused: TegevusRida[];
  vastutajad: VastutajaInfo[];
  tahtajad: TahtaegGrupp[];
  kokkuvote: string;
  /** Saatmiseks valmis e-kiri (sh teema rida). */
  jarelkiri: string;
  /** Soovitatud e-kirja teema (eraldi kopeeritav). */
  emailTeema: string;
  /** Tekstist tuvastatud lahtised küsimused (kui ühtegi pole — tühi). */
  lahtisedKusimused: string[];
  summary: TransformSummary;
};
