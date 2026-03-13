import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ChevronRight, Phone, ArrowRight, Clock, Shield, Star, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import ElladerKalkulator from "@/components/calculators/ElladerKalkulator";
import { getTjeneste, TJENESTER } from "@/data/tjenester";
import { formatPrisIntervall, buildServiceSchema } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }
export async function generateStaticParams() { return TJENESTER.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const t = getTjeneste(slug); if (!t) return {}; return { title: t.seoTitle, description: t.seoDesc, alternates: { canonical: `https://elspesialisten.no/tjenester/${slug}` } }; }

export default async function TjenesteSide({ params }: Props) {
  const { slug } = await params;
  const tjeneste = getTjeneste(slug);
  if (!tjeneste) notFound();
  const serviceSchema = buildServiceSchema({ navn: tjeneste.tittel, slug: tjeneste.slug, beskrivelse: tjeneste.kortBeskrivelse, prisMin: tjeneste.prisMin, prisMax: tjeneste.prisMax });
  const relaterteT = TJENESTER.filter((t) => tjeneste.relaterteSlug.includes(t.slug));

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Header /><main id="main-content">
      <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Tjenester", href: "/tjenester" }, { navn: tjeneste.tittel }]} /></div>
      <section className="section-gradient hero-pattern" aria-labelledby="tjeneste-heading">
        <div className="container-site py-12 sm:py-16"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-white border border-primary-200 rounded-16 p-5 mb-6 shadow-card-sm"><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden /><span className="text-label text-primary-600">Kort svar</span></div><p className="text-body-md text-secondary-800 font-medium">{tjeneste.kortBeskrivelse}</p></div>
            <h1 id="tjeneste-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">{tjeneste.tittel}</h1>
            <p className="text-body-lg text-secondary-600 mb-6 text-pretty">{tjeneste.intro}</p>
            <div className="card-flat p-5 mb-6"><div className="text-label text-secondary-500 mb-0.5">Typisk priskostnad</div><div className="price-value text-primary-600">{formatPrisIntervall(tjeneste.prisMin, tjeneste.prisMax)}</div><div className="text-caption text-secondary-400">{tjeneste.prisenhet} – veiledende</div></div>
            <div className="flex gap-3 flex-wrap"><Link href="#tilbud" className="btn-primary">Få gratis tilbud <ArrowRight className="w-4 h-4" /></Link><a href="tel:+4780000000" className="btn-phone"><Phone className="w-4 h-4" aria-hidden />Ring nå</a></div>
          </div>
          <div id="tilbud"><LeadForm kilde={`tjeneste-${slug}`} defaultOppdrag={tjeneste.id as any} /></div>
        </div></div>
      </section>
      <section className="section-white section-py-sm"><div className="container-site max-w-prose">
        <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Når trenger du {tjeneste.kortTittel.toLowerCase()}?</h2>
        <ul className="space-y-3">{tjeneste.naarTrengerDu.map((punkt) => (<li key={punkt} className="flex items-start gap-3 text-body-md text-secondary-700"><CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden />{punkt}</li>))}</ul>
      </div></section>
      {tjeneste.kalkulator === "elbillader" && (<section className="section-subtle section-py-sm"><div className="container-site"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div><h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Beregn din installasjonspris</h2><Link href="/kalkulator/elbillader" className="btn-secondary">Se full kalkulator <ChevronRight className="w-4 h-4" /></Link></div><ElladerKalkulator /></div></div></section>)}
      <section className="section-subtle section-py-sm"><div className="container-site max-w-prose"><FAQ items={tjeneste.faq} tittel={`Spørsmål om ${tjeneste.kortTittel.toLowerCase()}`} /></div></section>
      <section className="section-white section-py-sm"><div className="container-site"><div className="cta-block">
        <h2 className="font-display font-extrabold text-display-lg text-white mb-4 text-balance">Få gratis tilbud på {tjeneste.kortTittel.toLowerCase()}</h2>
        <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">Bestill gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
      </div></div></section>
    </main><Footer /><StickyMobileCTA /></>);
}
