import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ChevronRight, ArrowRight, Info } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PrisKalkulator from "@/components/calculators/PrisKalkulator";
import { formatPrisIntervall } from "@/lib/utils";
import { TJENESTER } from "@/data/tjenester";

export const metadata: Metadata = { title: "Elektriker priser 2025 – Hva koster elektrisk arbeid i Norge?", description: "Fullstendig prisoversikt for elektrisk arbeid i Norge. Se priser på elbillader, sikringsskap, smarthus og mer.", alternates: { canonical: "https://elspesialisten.no/priser" } };

export default function PriserSide() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Priser" }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-12 text-center">
      <div className="badge-accent mb-4 mx-auto"><Calculator className="w-3 h-3" aria-hidden />Oppdaterte priser 2025</div>
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Elektriker priser i Norge 2025</h1>
      <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto">Fullstendig og oppdatert prisoversikt for de vanligste elektriske tjenestene i Norge. Alle priser er veiledende og inkluderer moms.</p>
    </div></section>
    <section className="section-white section-py-sm"><div className="container-site">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {[{ tid: "Normaltime (man–fre 07–17)", min: 650, max: 950 }, { tid: "Kveld og lørdag", min: 950, max: 1200 }, { tid: "Natt og søndag / helligdag", min: 1200, max: 1500 }].map(({ tid, min, max }) => (
          <div key={tid} className="card p-6"><div className="text-label text-secondary-500 mb-2">{tid}</div><div className="price-value text-secondary-900 mb-1">{formatPrisIntervall(min, max)}</div><div className="text-caption text-secondary-400">per time inkl. moms</div></div>
        ))}
      </div>
      <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-6">Priser på vanlige elektriske tjenester</h2>
      <div className="overflow-x-auto mb-12"><table className="w-full border-collapse"><thead><tr className="bg-neutral-50 border-b-2 border-neutral-200"><th className="text-left px-4 py-3 text-label text-secondary-700">Tjeneste</th><th className="text-left px-4 py-3 text-label text-secondary-700">Pris fra</th><th className="text-left px-4 py-3 text-label text-secondary-700">Pris til</th><th className="px-4 py-3"></th></tr></thead><tbody>
        {TJENESTER.map((t, idx) => (<tr key={t.slug} className={`border-b border-neutral-100 ${idx % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}><td className="px-4 py-3.5 font-medium text-secondary-900">{t.tittel}</td><td className="px-4 py-3.5 font-mono font-semibold text-secondary-800">{t.prisMin.toLocaleString("nb-NO")} kr</td><td className="px-4 py-3.5 font-mono font-semibold text-secondary-800">{t.prisMax.toLocaleString("nb-NO")} kr</td><td className="px-4 py-3.5"><Link href={`/tjenester/${t.slug}`} className="text-label text-primary-500 hover:text-primary-700 flex items-center gap-1">Les mer <ChevronRight className="w-3.5 h-3.5" aria-hidden /></Link></td></tr>))}
      </tbody></table></div>
    </div></section>
    <section className="section-subtle section-py-sm"><div className="container-site"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"><div><h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Beregn pris på ditt oppdrag</h2><Link href="/kalkulator" className="btn-secondary">Se alle kalkulatorer <ChevronRight className="w-4 h-4" /></Link></div><PrisKalkulator /></div></div></section>
    <section className="section-white section-py-sm"><div className="container-site"><div className="cta-block"><h2 className="font-display font-extrabold text-display-lg text-white mb-4">Få konkrete priser fra elektrikere i ditt område</h2><Link href="/kontakt" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">Bestill gratis tilbud <ArrowRight className="w-5 h-5" /></Link></div></div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
