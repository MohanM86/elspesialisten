import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = { title: "Vanlige spørsmål om elektriker og elektro – FAQ", description: "Svar på alle vanlige spørsmål om elektriker, priser, regler og prosessen.", alternates: { canonical: "https://elspesialisten.no/faq" } };

const FAQ_ITEMS = [
  { sporsmal: "Hva koster en elektriker i Norge?", svar: "Timeprisen for elektriker i Norge er typisk 650–1 200 kr inkludert moms. Prisen varierer etter region, bedrift og tidspunkt." },
  { sporsmal: "Kan jeg gjøre elektrisk arbeid selv?", svar: "Nei, fast elektrisk installasjon krever autorisasjon. Det er kun tillatt å bytte lyspærer, stikkontaktlokk og lignende." },
  { sporsmal: "Hvor raskt kan jeg få tak i elektriker?", svar: "Via Elspesialisten kan du forvente kontakt innen 24 timer. For akutte oppdrag kan vi formidle raskere." },
  { sporsmal: "Hva er DSB autorisasjon?", svar: "DSB (Direktoratet for samfunnssikkerhet og beredskap) godkjenner og regulerer elektrikere i Norge." },
  { sporsmal: "Hvor ofte bør jeg kontrollere det elektriske anlegget?", svar: "Fagmiljøet anbefaler el kontroll hvert 10. år for boliger og hvert 5. år for fritidshus." },
];

export default function FAQSide() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Vanlige spørsmål" }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-12 text-center">
      <div className="badge-primary mb-4 mx-auto"><HelpCircle className="w-3 h-3" aria-hidden />{FAQ_ITEMS.length} spørsmål besvart</div>
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Vanlige spørsmål om elektriker</h1>
    </div></section>
    <section className="section-white section-py"><div className="container-site max-w-3xl"><FAQ items={FAQ_ITEMS} tittel="Ofte stilte spørsmål" /></div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
