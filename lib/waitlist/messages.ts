/**
 * Ootenimekirja tekstid — üks allikas kogu saidil.
 * Kasutus: WaitlistSection, nav CTA, hero teisese järjekorra link.
 */
export const waitlist = {
  id: "waitlist",
  title: "Liitu ootenimekirjaga",
  lead:
    "Doviqo on praegu varajases versioonis. Jäta oma e-post ja saad esimesena teada, kui avame ligipääsu täisversioonile.",
  emailLabel: "E-post",
  placeholder: "Sinu e-post",
  hint: "Ei jaga sinu aadressi kolmandate osapooltega. Üks teade, mitte uudiskiri.",
  submit: "Soovin ligipääsu",
  submitting: "Saadan…",
  successTitle: "Aitäh! Panime su nimekirja kirja.",
  successBody:
    "Kirjutame, kui täisversioon avaneb. Seniks võid Doviqo Studiot vabalt proovida.",
  successCta: "Lisa teine aadress",
  errorInvalid: "Palun sisesta korrektne e-posti aadress.",
  errorEmpty: "Palun sisesta e-posti aadress.",
  errorGeneric:
    "Ühendus ebaõnnestus. Proovi hetke pärast uuesti või kirjuta meile otse.",
} as const;
