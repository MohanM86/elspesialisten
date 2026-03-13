import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Vilkår for bruk", description: "Vilkår for bruk av Elspesialisten. Les våre brukervilkår.", alternates: { canonical: "https://elspesialisten.no/vilkar" } };

export default function VilkarSide() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Vilkår" }]} /></div>
    <section className="section-white section-py"><div className="container-site max-w-prose">
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-8">Vilkår for bruk</h1>
      <div className="space-y-6 text-body-md text-secondary-600 leading-relaxed">
        <p>Ved å bruke Elspesialisten godtar du følgende vilkår.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Om tjenesten</h2>
        <p>Elspesialisten er en formidlingstjeneste som kobler privatpersoner og bedrifter med autoriserte elektrikere. Vi utfører ikke selv elektrisk arbeid.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Tilbud og priser</h2>
        <p>Alle priser på nettsiden er veiledende. Faktisk pris avtales direkte mellom deg og elektrikeren. Elspesialisten er ikke part i avtalen mellom deg og elektrikeren.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Ansvar</h2>
        <p>Elspesialisten formidler kun kontakt og er ikke ansvarlig for arbeidet som utføres av elektrikeren. Alle elektrikere vi formidler skal være DSB autoriserte.</p>
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-8">Kontakt</h2>
        <p>Spørsmål om vilkår kan rettes til kontakt@elspesialisten.no.</p>
      </div>
    </div></section>
  </main><Footer /></>);
}
