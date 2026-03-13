import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ElladerKalkulator from "@/components/calculators/ElladerKalkulator";
import SikringsskapeKalkulator from "@/components/calculators/SikringsskapeKalkulator";
import PrisKalkulator from "@/components/calculators/PrisKalkulator";

export const metadata: Metadata = { title: "Elektriker priskalkulator – Beregn pris på elbillader, sikringsskap og mer", description: "Bruk våre gratis kalkulatorer for å beregne pris på elektrisk arbeid.", alternates: { canonical: "https://elspesialisten.no/kalkulator" } };

export default function KalkulatorOversikt() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Kalkulatorer" }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-12 text-center">
      <div className="badge-accent mb-4 mx-auto"><Calculator className="w-3 h-3" aria-hidden />Gratis kalkulatorer</div>
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Beregn prisen på elektrisk arbeid</h1>
      <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto">Bruk våre gratis kalkulatorer for å få et godt prisestimat før du bestiller.</p>
    </div></section>
    <section className="section-white section-py-sm"><div className="container-site space-y-16">
      <div><h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">Elbillader kalkulator</h2><div className="max-w-xl"><ElladerKalkulator /></div></div>
      <div className="border-t border-neutral-200 pt-16"><h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">Sikringsskap kalkulator</h2><div className="max-w-xl"><SikringsskapeKalkulator /></div></div>
      <div className="border-t border-neutral-200 pt-16"><h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">Generell priskalkulator</h2><div className="max-w-xl"><PrisKalkulator /></div></div>
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
