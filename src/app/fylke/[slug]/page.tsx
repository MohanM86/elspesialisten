import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, ArrowRight, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getFylke, getAllFylkeSlugs, getKommunerByFylke } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() { return getAllFylkeSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fylke = getFylke(slug);
  if (!fylke) return {};
  return { title: fylke.seoTitle, description: fylke.seoDesc, alternates: { canonical: `https://elspesialisten.no/fylke/${slug}` } };
}

export default async function FylkeSide({ params }: Props) {
  const { slug } = await params;
  const fylke = getFylke(slug);
  if (!fylke) notFound();
  const kommuner = getKommunerByFylke(slug);
  const fylkeFAQ = [
    { sporsmal: `Hva koster elektriker i ${fylke.navn}?`, svar: `Prisen varierer etter kommune og type oppdrag. Typisk timepris er 700–1 200 kr inkl. moms. Bruk vår kalkulator eller bestill gratis tilbud for nøyaktig pris i din kommune.` },
    { sporsmal: `Finnes det elektrikere i hele ${fylke.navn}?`, svar: `Ja, Elspesialisten har autoriserte elektrikere i alle ${kommuner.length} kommuner i ${fylke.navn}. Vi formidler rask kontakt uansett hvor du bor i fylket.` },
    { sporsmal: `Kan jeg få akutt elektriker i ${fylke.navn}?`, svar: `Ja. Meld din forespørsel med hastegrad «Akutt» og vi kobler deg med tilgjengelig elektriker raskest mulig, dag og kveld.` },
  ];

  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Elektriker", href: "/elektriker" }, { navn: fylke.navn }]} /></div>
    <section className="section-gradient hero-pattern" aria-labelledby="fylke-heading">
      <div className="container-site py-12 sm:py-16"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="badge-primary mb-4"><MapPin className="w-3 h-3" aria-hidden />Fylke</div>
          <h1 id="fylke-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">Elektriker i <span className="text-gradient-primary">{fylke.navn}</span></h1>
          <p className="text-body-lg text-secondary-600 mb-6">{fylke.beskrivelse}</p>
          <p className="text-body-md text-secondary-600 mb-7">Vi kobler deg med DSB godkjente elektrikere i alle {kommuner.length} kommuner i {fylke.navn}. Gratis og uforpliktende tilbud innen 24 timer.</p>
          <div className="flex gap-3 flex-wrap"><Link href="#tilbud" className="btn-primary">Få gratis tilbud <ArrowRight className="w-4 h-4" /></Link><a href="tel:+4780000000" className="btn-phone"><Phone className="w-4 h-4" aria-hidden />Ring nå</a></div>
        </div>
        <div id="tilbud"><LeadForm kilde={`fylke-${slug}`} /></div>
      </div></div>
    </section>
    <section className="section-white section-py-sm"><div className="container-site">
      <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Elektriker i kommuner i {fylke.navn}</h2>
      <p className="text-body-md text-secondary-500 mb-7">Klikk på din kommune for priser og tilbud fra lokale elektrikere.</p>
      {kommuner.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {kommuner.map((k) => (<Link key={k.slug} href={`/kommune/${k.slug}`} className="card-flat px-4 py-3 hover:border-primary-300 hover:bg-primary-50 transition-all group"><div className="text-label font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors">{k.navn}</div><div className="flex items-center gap-1 text-caption text-primary-400 mt-1">Finn elektriker <ChevronRight className="w-3 h-3" aria-hidden /></div></Link>))}
        </div>
      ) : (<div className="bg-neutral-50 rounded-16 p-8 text-center"><p className="text-body-md text-secondary-500">Kommunedata for {fylke.navn} lastes inn. Bruk søkefeltet eller ring oss for direkte hjelp.</p><Link href="/kontakt" className="btn-primary mt-4">Kontakt oss</Link></div>)}
    </div></section>
    <section className="section-subtle section-py-sm"><div className="container-site max-w-prose"><FAQ items={fylkeFAQ} tittel={`Vanlige spørsmål om elektriker i ${fylke.navn}`} /></div></section>
    <section className="section-white section-py-sm"><div className="container-site"><div className="cta-block">
      <h2 className="font-display font-extrabold text-display-lg text-white mb-4 text-balance">Bestill elektriker i {fylke.navn} – gratis tilbud</h2>
      <p className="text-body-lg text-primary-100 mb-7 max-w-md mx-auto">Vi dekker alle kommuner i {fylke.navn}. Gratis og uforpliktende.</p>
      <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">Få gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
    </div></div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
