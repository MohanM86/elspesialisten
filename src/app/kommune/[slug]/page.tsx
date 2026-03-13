import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Phone, Shield, Clock, Star, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getKommune, getAllKommuneSlugs, getKommunerByFylke } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";
import { ELEKTRIKER_PER_KOMMUNE, TOTALT_ELEKTRIKERE } from "@/data/elektrikere-stats";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() { return getAllKommuneSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kommune = getKommune(slug);
  if (!kommune) return {};
  return { title: kommune.seoTitle ?? `Elektriker ${kommune.navn} – Finn sertifisert elektriker`, description: kommune.seoDesc ?? `Trenger du elektriker i ${kommune.navn}? Gratis og uforpliktende tilbud fra sertifiserte elektrikere. Rask respons i hele kommunen.`, alternates: { canonical: `https://elspesialisten.no/kommune/${slug}` } };
}

export default async function KommuneSide({ params }: Props) {
  const { slug } = await params;
  const kommune = getKommune(slug);
  if (!kommune) notFound();
  const relatertKommuner = getKommunerByFylke(kommune.fylkeSlug).filter((k) => k.slug !== slug).slice(0, 6);
  const antallBedrifter = ELEKTRIKER_PER_KOMMUNE[slug] || 0;
  const kommuneFAQ = [
    { sporsmal: `Hva koster elektriker i ${kommune.navn}?`, svar: `Timeprisen for elektriker i ${kommune.navn} ligger typisk mellom 750 og 1 200 kr inkludert moms. Prisen avhenger av oppdragstype, tidspunkt og kompleksitet. Vi anbefaler å innhente flere tilbud for å sammenligne.` },
    { sporsmal: `Hvor mange elektrikerbedrifter finnes i ${kommune.navn}?`, svar: `I ${kommune.navn} er det ${antallBedrifter > 0 ? antallBedrifter : "flere"} bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Brønnøysundregistrene. Dette inkluderer alt fra enkeltpersonforetak til større elektroentreprenører.` },
    { sporsmal: `Hvordan finner jeg en god elektriker i ${kommune.navn}?`, svar: `Sjekk at elektrikeren er registrert i Elvirksomhetsregisteret hos DSB, be om referanser, og sammenlign alltid flere tilbud. En seriøs elektriker gir deg skriftlig tilbud med spesifisert materiell og arbeidskostnad.` },
    { sporsmal: `Kan jeg gjøre elektrisk arbeid selv i ${kommune.navn}?`, svar: `Nei, elektrisk installasjonsarbeid krever autorisasjon i hele Norge. Du kan kun bytte lyspærer og plugge inn apparater. Alt arbeid på fast installasjon må utføres av autorisert elektriker.` },
  ];

  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Elektriker", href: "/elektriker" }, { navn: kommune.fylke, href: `/fylke/${kommune.fylkeSlug}` }, { navn: `Elektriker ${kommune.navn}` }]} /></div>
    <section className="section-gradient hero-pattern" aria-labelledby="kommune-hero-heading">
      <div className="container-site py-10 sm:py-16"><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="badge-primary mb-3"><MapPin className="w-3 h-3" aria-hidden />{kommune.fylke}</div>
          <h1 id="kommune-hero-heading" className="font-display font-extrabold text-display-xl text-secondary-950 mb-3 text-balance">Elektriker i <span className="text-gradient-primary">{kommune.navn}</span></h1>
          <p className="text-body-md text-secondary-600 mb-4">{kommune.kortTekst}</p>
          {antallBedrifter > 0 && (
            <div className="bg-secondary-900 text-white rounded-12 px-4 py-3 mb-5 inline-flex items-center gap-3">
              <span className="font-display font-extrabold text-heading-lg text-primary-400">{antallBedrifter}</span>
              <span className="text-body-sm text-secondary-300">elektrikerbedrifter registrert i {kommune.navn}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-5">
            {[{ ikkon: Shield, tekst: "DSB autoriserte" }, { ikkon: Clock, tekst: "Svar innen 24t" }, { ikkon: Star, tekst: "Gratis tilbud" }].map(({ ikkon: Icon, tekst }) => (<div key={tekst} className="flex items-center gap-1.5 badge-neutral text-body-sm"><Icon className="w-3.5 h-3.5" aria-hidden />{tekst}</div>))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3"><Link href="#tilbud" className="btn-primary">Få gratis tilbud i {kommune.navn}</Link><a href="tel:+4780000000" className="btn-phone"><Phone className="w-4 h-4" aria-hidden />Ring nå</a></div>
        </div>
        <div id="tilbud"><LeadForm kilde={`kommune-${slug}`} /></div>
      </div></div>
    </section>
    {antallBedrifter > 0 && (
      <section className="bg-secondary-900 text-white" aria-label="Statistikk"><div className="container-site py-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="font-display font-extrabold text-heading-lg text-primary-400">{antallBedrifter}</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Lokale bedrifter</div></div>
          <div><div className="font-display font-extrabold text-heading-lg text-primary-400">{TOTALT_ELEKTRIKERE.toLocaleString("nb-NO")}</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Totalt i Norge</div></div>
          <div><div className="font-display font-extrabold text-heading-lg text-primary-400">43.210</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Næringskode</div></div>
        </div>
      </div></section>
    )}
    <section className="section-white section-py-sm"><div className="container-site max-w-prose">
      <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i {kommune.navn} – hva du trenger å vite</h2>
      <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
        <p>{kommune.langTekst}</p>
        {antallBedrifter > 0 && <p>Elektrikerbransjen i {kommune.navn} teller {antallBedrifter} registrerte bedrifter under næringskode 43.210 (elektrisk installasjonsarbeid) ifølge Brønnøysundregistrene. Markedet spenner fra mindre enkeltpersonforetak til etablerte elektroentreprenører med flere ansatte.</p>}
      </div>
    </div></section>
    <section className="section-subtle section-py-sm"><div className="container-site max-w-prose"><FAQ items={kommuneFAQ} tittel={`Vanlige spørsmål om elektriker i ${kommune.navn}`} showSchema={false} /></div></section>
    {relatertKommuner.length > 0 && (<section className="section-white section-py-sm"><div className="container-site">
      <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-5">Elektriker i nærliggende kommuner i {kommune.fylke}</h2>
      <div className="flex flex-wrap gap-3">{relatertKommuner.map((k) => (<Link key={k.slug} href={`/kommune/${k.slug}`} className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">Elektriker {k.navn}</Link>))}</div>
    </div></section>)}
    <section className="section-subtle section-py-sm"><div className="container-site"><div className="cta-block">
      <h2 className="font-display font-extrabold text-display-lg text-white mb-4 text-balance">Bestill elektriker i {kommune.navn} – gratis tilbud</h2>
      <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">Få gratis tilbud</Link>
    </div></div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
