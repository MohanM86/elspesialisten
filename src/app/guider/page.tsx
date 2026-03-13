import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Tag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { GUIDER } from "@/data/guider";

export const metadata: Metadata = { title: "Guider og råd om elektriker og elektro – Elspesialisten", description: "Finn informasjon om elektrisk arbeid, priser, regler og tips.", alternates: { canonical: "https://elspesialisten.no/guider" } };

export default function GuiderOversikt() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Guider" }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-12 text-center">
      <div className="badge-primary mb-4 mx-auto"><BookOpen className="w-3 h-3" aria-hidden />{GUIDER.length}+ guider</div>
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Guider og råd om elektrisk arbeid</h1>
      <p className="text-body-lg text-secondary-600 max-w-2xl mx-auto">Alt du trenger å vite om elektrisk arbeid i Norge, priser, regler, tips og forklaringer fra fageksperter.</p>
    </div></section>
    <section className="section-white section-py"><div className="container-site">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDER.map((guide) => (
          <Link key={guide.slug} href={`/guider/${guide.slug}`} className="card-flat p-5 hover:border-primary-300 hover:bg-primary-50 transition-all group">
            <h3 className="font-display font-semibold text-heading-sm text-secondary-900 group-hover:text-primary-600 transition-colors mb-3 text-pretty">{guide.tittel}</h3>
            <div className="flex items-center justify-between mt-auto"><div className="flex items-center gap-1 text-caption text-secondary-400"><Clock className="w-3 h-3" aria-hidden />{guide.lesetid} min lesing</div><span className="flex items-center gap-0.5 text-label text-primary-500">Les <ChevronRight className="w-3.5 h-3.5" aria-hidden /></span></div>
          </Link>
        ))}
      </div>
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
