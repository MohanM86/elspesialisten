import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Personvernerklæring", description: "Personvernerklæring for Elspesialisten. Les om hvordan vi behandler dine personopplysninger.", alternates: { canonical: "https://elspesialisten.no/personvern" } };

export default function PersonvernSide() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Personvern" }]} /></div>
    <section className="section-white section-py"><div className="container-site max-w-prose">
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-8">Personvernerklæring</h1>
      <div className="space-y-6 text-body-md text-secondary-600 leading-relaxed">
        <p>Elspesialisten tar personvern på alvor. Denne erklæringen forklarer hvordan vi samler inn, bruker og beskytter dine personopplysninger.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Hvilke opplysninger samler vi inn?</h2>
        <p>Når du sender en forespørsel via vårt kontaktskjema, samler vi inn navn, telefonnummer, postnummer og eventuelt e postadresse. Vi lagrer også hvilken type oppdrag du trenger hjelp med.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Hvordan bruker vi opplysningene?</h2>
        <p>Dine opplysninger brukes utelukkende til å koble deg med relevante, autoriserte elektrikere i ditt område. Vi deler kun informasjonen din med elektrikere som er aktuelle for ditt oppdrag.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Lagring og sikkerhet</h2>
        <p>Vi lagrer dine opplysninger så lenge det er nødvendig for å fullføre formidlingen. All databehandling skjer i henhold til personopplysningsloven og GDPR.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Dine rettigheter</h2>
        <p>Du har rett til innsyn, retting og sletting av dine personopplysninger. Kontakt oss på kontakt@elspesialisten.no for spørsmål om personvern.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Informasjonskapsler</h2>
        <p>Vi bruker nødvendige informasjonskapsler for at nettsiden skal fungere. Vi bruker ikke sporingskapsler uten ditt samtykke.</p>
      </div>
    </div></section>
  </main><Footer /></>);
}
