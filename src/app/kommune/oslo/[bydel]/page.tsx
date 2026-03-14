import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Shield, Clock, Star, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import BedriftOversikt from "@/components/ui/BedriftOversikt";
import { OSLO_BEDRIFTER } from "@/data/bedrifter/oslo";
import { OSLO_BYDELER, getBydel, getAllBydelSlugs } from "@/data/oslo-bydeler";
import { buildFAQSchema } from "@/lib/utils";

interface Props { params: Promise<{ bydel: string }>; }

export async function generateStaticParams() {
  return getAllBydelSlugs().map((bydel) => ({ bydel }));
}

function inRange(postnr: string, ranges: [number, number][]): boolean {
  const p = parseInt(postnr, 10);
  if (isNaN(p)) return false;
  return ranges.some(([lo, hi]) => p >= lo && p <= hi);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bydel: slug } = await params;
  const bydel = getBydel(slug);
  if (!bydel) return {};
  const bedrifter = OSLO_BEDRIFTER.filter((b) => inRange(b.p, bydel.postRanges));
  return {
    title: `Elektriker ${bydel.navn}, Oslo | ${bedrifter.length} bedrifter | Elspesialisten`,
    description: `Finn elektriker i ${bydel.navn} i Oslo. ${bedrifter.length} registrerte bedrifter i bydelen. Sikringsskap, elbillader, feilsøking og akutt hjelp.`,
    alternates: { canonical: `https://elspesialisten.no/kommune/oslo/${slug}` },
  };
}

export default async function BydelSide({ params }: Props) {
  const { bydel: slug } = await params;
  const bydel = getBydel(slug);
  if (!bydel) notFound();

  const bedrifter = OSLO_BEDRIFTER.filter((b) => inRange(b.p, bydel.postRanges));
  const andreBydeler = OSLO_BYDELER.filter((b) => b.slug !== slug);

  const faqItems = [
    { sporsmal: `Hva koster elektriker i ${bydel.navn}?`, svar: `Timeprisen for elektriker i ${bydel.navn} er den samme som i Oslo generelt: mellom 850 og 1 400 kr inkludert moms. Prisen varierer etter oppdragstype og tidspunkt.` },
    { sporsmal: `Hvor mange elektrikerbedrifter finnes i ${bydel.navn}?`, svar: `Det er ${bedrifter.length} bedrifter registrert med forretningsadresse i ${bydel.navn} (basert på postnummer). Mange bedrifter fra andre bydeler tar også oppdrag i ${bydel.navn}.` },
    { sporsmal: `Trenger jeg oppgradere sikringsskapet i ${bydel.navn}?`, svar: `${bydel.beskrivelse} Har du et sikringsskap med skrusikringer fra før 1980, bør det byttes. Kost: 25 000 til 45 000 kr.` },
    { sporsmal: `Kan jeg installere elbillader i ${bydel.navn}?`, svar: `Ja, men det må gjøres av autorisert elektriker. I ${bydel.navn} er installasjon i borettslag spesielt aktuelt. Elektriker melder arbeidet til Elvia (netteier). Pris: 12 000 til 35 000 kr.` },
    { sporsmal: `Hva gjør jeg ved strømbrudd i ${bydel.navn}?`, svar: `Sjekk sikringsskapet for utløste sikringer. Er hovedsikringen utløst, kan det tyde på jordfeil. Vedvarer problemet, kontakt Elvia på 03444 eller ring døgnvakt elektriker.` },
  ];

  const faqSchema = buildFAQSchema(faqItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main-content">

        <div className="container-site pt-5 pb-2">
          <Breadcrumb items={[{ navn: "Elektriker", href: "/elektriker" }, { navn: "Oslo", href: "/kommune/oslo" }, { navn: `Elektriker ${bydel.navn}` }]} />
        </div>

        {/* ═══ HERO ═══ */}
        <section className="section-gradient hero-pattern" aria-labelledby="bydel-hero">
          <div className="container-site py-10 sm:py-14"><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="badge-primary mb-3"><MapPin className="w-3 h-3" aria-hidden />Oslo – {bydel.navn}</div>
              <h1 id="bydel-hero" className="font-display font-extrabold text-display-xl text-secondary-950 mb-3 text-balance">Elektriker i <span className="text-gradient-primary">{bydel.navn}</span></h1>
              <p className="text-body-md text-secondary-600 mb-4">{bydel.beskrivelse}</p>
              {bedrifter.length > 0 && (
                <div className="bg-secondary-900 text-white rounded-12 px-4 py-3 mb-5 inline-flex items-center gap-3">
                  <span className="font-display font-extrabold text-heading-lg text-primary-400">{bedrifter.length}</span>
                  <span className="text-body-sm text-secondary-300">elektrikerbedrifter i {bydel.navn}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-5">
                {[{ i: Shield, t: "DSB autoriserte" }, { i: Clock, t: "Svar innen 24t" }, { i: Star, t: "Gratis tilbud" }].map(({ i: Icon, t }) => (<div key={t} className="flex items-center gap-1.5 badge-neutral text-body-sm"><Icon className="w-3.5 h-3.5" aria-hidden />{t}</div>))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#tilbud" className="btn-primary">Få gratis tilbud i {bydel.navn}</Link>
                <a href="tel:+4780000000" className="btn-phone"><Phone className="w-4 h-4" aria-hidden />Ring nå</a>
              </div>
            </div>
            <div id="tilbud"><LeadForm kilde={`bydel-oslo-${slug}`} /></div>
          </div></div>
        </section>

        {/* ═══ STATS ═══ */}
        {bedrifter.length > 0 && (
          <section className="bg-secondary-900 text-white"><div className="container-site py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">{bedrifter.length}</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">I {bydel.navn}</div></div>
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">543</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Totalt i Oslo</div></div>
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">15</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Bydeler</div></div>
            </div>
          </div></section>
        )}

        {/* ═══ INNHOLD ═══ */}
        <section className="section-white py-8 sm:py-12"><div className="container-site max-w-prose">
          <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i {bydel.navn} – hva du trenger å vite</h2>
          <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
            <p>{bydel.beskrivelse}</p>
            <p>Med {bedrifter.length} registrerte elektrikerbedrifter i {bydel.navn} har du gode muligheter til å finne riktig fagperson for ditt oppdrag. I tillegg tar mange av Oslos øvrige 543 bedrifter oppdrag på tvers av bydelsgrensene, så det faktiske tilbudet er enda større.</p>
            <p>De vanligste oppdragene i {bydel.navn} inkluderer oppgradering av sikringsskap, installasjon av elbillader, montering av spotter og belysning, feilsøking av strøm og elkontroll. {bydel.kjennetegn}.</p>
          </div>
        </div></section>

        {/* ═══ BEDRIFTSLISTE ═══ */}
        {bedrifter.length > 0 && (
          <section className="section-subtle py-8 sm:py-12">
            <div className="container-site max-w-4xl">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Elektrikerbedrifter i {bydel.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-6">Bedrifter med forretningsadresse i {bydel.navn} (postnummer {bydel.postRanges.map(([lo,hi]) => `${String(lo).padStart(4,'0')}–${String(hi).padStart(4,'0')}`).join(', ')}). Kilde: Brønnøysundregistrene.</p>
              <BedriftOversikt bedrifter={bedrifter} kommune={bydel.navn} />
            </div>
          </section>
        )}

        {/* ═══ FAQ ═══ */}
        <section className="section-white py-8 sm:py-12">
          <div className="container-site max-w-prose">
            <FAQ items={faqItems} tittel={`Vanlige spørsmål om elektriker i ${bydel.navn}`} showSchema={false} />
          </div>
        </section>

        {/* ═══ ANDRE BYDELER ═══ */}
        <section className="section-subtle py-8 sm:py-10">
          <div className="container-site">
            <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Elektriker i andre bydeler i Oslo</h2>
            <p className="text-body-sm text-secondary-500 mb-5">Se elektrikere i andre bydeler, eller se hele Oslo samlet.</p>
            <div className="flex flex-wrap gap-2">
              {andreBydeler.map((b) => {
                const bAnt = OSLO_BEDRIFTER.filter((bed) => inRange(bed.p, b.postRanges)).length;
                return (
                  <Link key={b.slug} href={`/kommune/oslo/${b.slug}`} className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">
                    {b.navn}{bAnt > 0 && <span className="text-secondary-400 ml-1">({bAnt})</span>}
                  </Link>
                );
              })}
              <Link href="/kommune/oslo" className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">Hele Oslo (543) <ChevronRight className="w-3 h-3" /></Link>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-8 sm:py-10">
          <div className="container-site"><div className="cta-block py-10">
            <h2 className="font-display font-extrabold text-display-lg text-white mb-3 text-balance">Kontakt elektriker i {bydel.navn}</h2>
            <p className="text-body-sm text-white/70 mb-5 max-w-md mx-auto">Gratis og uforpliktende tilbud fra kvalifiserte elektrikere.</p>
            <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-md px-8 py-3.5 rounded-12 hover:bg-primary-50 shadow-card-xl justify-center">Få gratis tilbud</Link>
          </div></div>
        </section>

      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
