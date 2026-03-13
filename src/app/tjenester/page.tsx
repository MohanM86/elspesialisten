import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ChevronRight, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { TJENESTER, TJENESTE_KATEGORIER } from "@/data/tjenester";
import { formatPrisIntervall } from "@/lib/utils";

export const metadata: Metadata = { title: "Elektriske tjenester – Se alle tjenester og priser", description: "Oversikt over alle elektriske tjenester: elbillader, sikringsskap, smarthus, varmekabler, belysning, akutt elektriker og mer.", alternates: { canonical: "https://elspesialisten.no/tjenester" } };

export default function TjenesterOversikt() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Tjenester" }]} /></div>
    <section className="section-gradient hero-pattern" aria-labelledby="tjenester-heading">
      <div className="container-site py-12 text-center">
        <div className="badge-primary mb-4 mx-auto"><Zap className="w-3 h-3" aria-hidden />Alle elektriske tjenester</div>
        <h1 id="tjenester-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Elektriske tjenester i hele Norge</h1>
        <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto mb-8">Vi formidler sertifiserte elektrikere til alle typer elektriske oppdrag, fra elbillader og sikringsskap til smarthus og akutt hjelp.</p>
        <Link href="/kontakt" className="btn-primary-lg">Få gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </section>
    <section className="section-white section-py"><div className="container-site">
      {TJENESTE_KATEGORIER.map((kat) => {
        const inKat = TJENESTER.filter((t) => t.kategori === kat.id);
        if (!inKat.length) return null;
        return (<div key={kat.id} className="mb-14">
          <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 rounded-12 bg-primary-50 flex items-center justify-center"><Zap className="w-4 h-4 text-primary-500" aria-hidden /></div><h2 className="font-display font-bold text-heading-xl text-secondary-950">{kat.navn}</h2></div>
          <div className="grid grid-auto-fill-320 gap-5">{inKat.map((t) => (
            <Link key={t.slug} href={`/tjenester/${t.slug}`} className="card p-6 group">
              <h3 className="font-display font-semibold text-heading-sm text-secondary-900 group-hover:text-primary-600 transition-colors mb-2">{t.tittel}</h3>
              <p className="text-body-sm text-secondary-500 clamp-2 mb-4">{t.kortBeskrivelse}</p>
              <div className="flex items-center justify-between mt-auto"><span className="font-mono text-body-sm font-semibold text-secondary-700">{formatPrisIntervall(t.prisMin, t.prisMax)}</span><span className="flex items-center gap-1 text-label text-primary-500">Les mer <ChevronRight className="w-3.5 h-3.5" aria-hidden /></span></div>
            </Link>
          ))}</div>
        </div>);
      })}
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
