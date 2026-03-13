import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Kontakt oss – Bestill gratis tilbud fra elektriker",
  description: "Kontakt Elspesialisten for gratis og uforpliktende tilbud fra sertifiserte elektrikere. Fyll ut skjemaet og motta svar innen 24 timer.",
  alternates: { canonical: "https://elspesialisten.no/kontakt" },
  robots: { index: false },
};

export default function KontaktSide() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Kontakt" }]} /></div>
    <section className="section-gradient hero-pattern" aria-labelledby="kontakt-heading">
      <div className="container-site py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 id="kontakt-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Bestill gratis tilbud fra elektriker</h1>
            <p className="text-body-lg text-secondary-600 mb-8">Fyll ut skjemaet og motta uforpliktende tilbud fra sertifiserte elektrikere i ditt område innen 24 timer. Helt gratis.</p>
            <div className="flex items-center gap-2 text-body-sm text-secondary-500"><Shield className="w-4 h-4 text-success-500 flex-shrink-0" aria-hidden />Alle elektrikere er DSB godkjente. Din informasjon er trygg og deles kun med relevante fagpersoner.</div>
          </div>
          <div><LeadForm kilde="kontakt-side" /></div>
        </div>
      </div>
    </section>
  </main><Footer /><StickyMobileCTA /></>);
}
