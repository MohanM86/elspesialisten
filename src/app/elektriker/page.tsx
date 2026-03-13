import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FYLKER, KOMMUNER } from "@/data/kommuner";

export const metadata: Metadata = {
  title: "Elektriker i alle norske kommuner – Finn lokal elektriker",
  description: "Finn sertifisert elektriker i din norske kommune. Vi dekker alle 356 kommuner i Norge med autoriserte elektrikere. Gratis og uforpliktende tilbud.",
  alternates: { canonical: "https://elspesialisten.no/elektriker" },
};

export default function ElektrikerOversikt() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Elektriker i Norge" }]} /></div>
    <section className="section-gradient hero-pattern" aria-labelledby="oversikt-heading">
      <div className="container-site py-12 text-center">
        <div className="badge-neutral mb-4 mx-auto"><MapPin className="w-3 h-3" aria-hidden />340+ kommuner dekket</div>
        <h1 id="oversikt-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Elektriker i alle norske kommuner</h1>
        <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto mb-6">Vi kobler deg med autoriserte elektrikere i hele Norge, fra Lindesnes til Nordkapp. Finn din kommune og få gratis tilbud i dag.</p>
      </div>
    </section>
    <section className="section-white section-py"><div className="container-site">
      {FYLKER.map((fylke) => {
        const kommunerIFylket = KOMMUNER.filter((k) => k.fylkeSlug === fylke.slug);
        return (<div key={fylke.slug} className="mb-12 last:mb-0">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3"><h2 className="font-display font-bold text-heading-xl text-secondary-950">{fylke.navn}</h2><span className="badge-neutral text-[0.75rem]">{fylke.kommuneCount} kommuner</span></div>
            <Link href={`/fylke/${fylke.slug}`} className="text-label text-primary-600 hover:text-primary-700 flex items-center gap-1 flex-shrink-0">Se fylkesside <ChevronRight className="w-3.5 h-3.5" aria-hidden /></Link>
          </div>
          {kommunerIFylket.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {kommunerIFylket.map((k) => (<Link key={k.slug} href={`/kommune/${k.slug}`} className="card-flat px-3.5 py-2.5 hover:border-primary-300 hover:bg-primary-50 transition-all group"><div className="text-label font-medium text-secondary-800 group-hover:text-primary-600 transition-colors leading-tight">{k.navn}</div></Link>))}
              {fylke.kommuneCount > kommunerIFylket.length && (<Link href={`/fylke/${fylke.slug}`} className="card-flat px-3.5 py-2.5 border-dashed hover:border-primary-300 hover:bg-primary-50 transition-all group flex items-center gap-1"><span className="text-label text-secondary-400 group-hover:text-primary-500 transition-colors">+{fylke.kommuneCount - kommunerIFylket.length} til</span></Link>)}
            </div>
          ) : (<Link href={`/fylke/${fylke.slug}`} className="block card-flat px-5 py-4 hover:border-primary-300 hover:bg-primary-50 transition-all text-body-sm text-secondary-600">Se alle {fylke.kommuneCount} kommuner i {fylke.navn} →</Link>)}
          <div className="border-b border-neutral-100 mt-8" aria-hidden />
        </div>);
      })}
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
