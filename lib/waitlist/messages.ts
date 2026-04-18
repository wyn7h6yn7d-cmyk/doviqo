/**
 * Ootenimekirja tekstid — üks allikas kogu saidil.
 */
export const waitlist = {
  id: "waitlist",
  title: "Jäta end ootenimekirja",
  lead:
    "Doviqo on veel varajases järgus. Jäta oma e-posti aadress ja saad teada kohe, kui täisversioon avaneb.",
  emailLabel: "E-post",
  placeholder: "nimi@ettevote.ee",
  hint: "Aadressi ei müü edasi. Kirjutan ühe korra, kui on midagi olulist — mitte uudiskirja.",
  submit: "Soovin juurdepääsu",
  submitting: "Saadan…",
  successTitle: "Aitäh — sind on kirjas.",
  successBody: "",
  successCta: "Lisa teine aadress",
  errorInvalid: "Palun kontrolli e-posti aadressi.",
  errorEmpty: "Palun lisa e-posti aadress.",
  errorGeneric:
    "Ühendus ebaõnnestus. Proovi hetke pärast uuesti või kirjuta meile otse.",
  /** Tekst ootenimekirja sektsiooni all lingiga Studiot proovima */
  tryStudioLead: "Tahad kohe proovida, kuidas järelplaan kiiresti valmis tuleb?",
} as const;
