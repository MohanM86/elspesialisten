import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Shield, Clock, Star, ChevronRight, Phone, CheckCircle, ArrowRight, MapPin, Award, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import ElladerKalkulator from "@/components/calculators/ElladerKalkulator";
import FAQ from "@/components/ui/FAQ";
import { TJENESTER } from "@/data/tjenester";
import { KOMMUNER } from "@/data/kommuner";
import { formatPrisIntervall, buildLocalBusinessSchema } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Finn sertifisert elektriker i din kommune – Rask og enkel tilbudsinnhenting",
  description: "Norges ledende plattform for elektriker og elektrotjenester. Elbillader, sikringsskap, smarthus og mer. Gratis og uforpliktende tilbud fra sertifiserte elektrikere i hele Norge.",
  alternates: { canonical: "https://elspesialisten.no" },
};

const STATS = [
  { verdi: "4 800+", label: "Fornøyde kunder", suffix: "" },
  { verdi: "4.9", label: "Snittkarakter", suffix: "/5" },
  { verdi: "340+", label: "Kommuner dekket", suffix: "" },
  { verdi: "98%", label: "Anbefaler oss", suffix: "" },
];

const TRUST_POINTS = [
  { ikkon: Shield, tittel: "100% autoriserte elektrikere", tekst: "Alle elektrikere er DSB godkjente og har gyldig autorisasjon." },
  { ikkon: Clock, tittel: "Svar innen 24 timer", tekst: "Vi matcher deg med rett elektriker og du f\u00e5r tilbud raskt." },
  { ikkon: Star, tittel: "Gratis og uforpliktende", tekst: "Det koster deg ingenting \u00e5 innhente tilbud via Elspesialisten." },
  { ikkon: Award, tittel: "Garantert kvalitet", tekst: "Alle oppdrag utf\u00f8res etter NS 3700 og gjeldende forskrifter." },
];

const TESTIMONIALS = [
  { navn: "Anders H.", sted: "Oslo", tekst: "Fikk tre tilbud p\u00e5 elbillader i l\u00f8pet av noen timer. Valgte den rimeligste, veldig profesjonell jobb!", stjerner: 5, tjeneste: "Elbillader installasjon" },
  { navn: "Kari M.", sted: "Bergen", tekst: "Gammel bolig med skrusikringer. Elektriker rykket ut neste dag og byttet hele skapet. Topp service!", stjerner: 5, tjeneste: "Bytte sikringsskap" },
  { navn: "Petter L.", sted: "Trondheim", tekst: "Smarthus installasjon i ny enebolig. Elektriker hadde god kunnskap om KNX og leverte over forventning.", stjerner: 5, tjeneste: "Smarthus installasjon" },
];

const HOMEPAGE_FAQ = [
  { sporsmal: "Hva koster en elektriker i Norge?", svar: "Timeprisen for elektriker i Norge ligger typisk mellom 650 og 1 200 kr per time inkludert moms, avhengig av region, bedrift og oppdragets kompleksitet. I tillegg kommer materialkostnader og eventuelt utrykningsgebyr. Mange oppdrag faktureres som fastpris." },
  { sporsmal: "Kan jeg gj\u00f8re elektrisk arbeid selv?", svar: "Nei, elektrisk installasjonsarbeid i Norge krever autorisasjon. Det er kun tillatt \u00e5 bytte lysp\u00e6rer, stikkontakter av typen med stikkontaktlokk og lignende. Alt arbeid p\u00e5 fast installasjon, inkludert kursopplegg, sikringer og fast montasje, m\u00e5 utf\u00f8res av autorisert elektriker." },
  { sporsmal: "Hvor raskt kan jeg f\u00e5 tak i elektriker?", svar: "Via Elspesialisten kan du forvente \u00e5 bli kontaktet av en elektriker innen 24 timer. Ved akutte situasjoner (jordfeil, str\u00f8m borte) kan vi ofte formidle raskere hjelp. Meld din foresp\u00f8rsel og opplys at det haster." },
  { sporsmal: "Hva er inkludert i tilbudet fra elektriker?", svar: "Et komplett tilbud fra elektriker skal inkludere arbeidskostnad, materialkostnader, moms, reisekostnad og eventuelt utrykningsgebyr. Be alltid om skriftlig tilbud med spesifisert prisliste f\u00f8r du takker ja." },
  { sporsmal: "Trenger jeg \u00e5 s\u00f8ke om tillatelse for elektrisk arbeid?", svar: "For de fleste enkle installasjoner er det elektriker som melder arbeidet til DSB og netteier, dette er inkludert i oppdraget. For st\u00f8rre prosjekter (nybygg, rehabilitering) kan det kreves bygningstillatelse fra kommunen." },
];

export default function HomePage() {
  const orgSchema = buildLocalBusinessSchema();
  const populareTjenester = TJENESTER.slice(0, 6);
  const populareKommuner = KOMMUNER.slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden section-gradient hero-pattern" aria-labelledby="hero-heading">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden />
          <div className="container-site py-16 sm:py-20 lg:py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="max-w-2xl">
                <div className="badge-primary mb-5 animate-fade-in"><Zap className="w-3 h-3" aria-hidden />Norges ledende elektrikerplattform</div>
                <h1 id="hero-heading" className="font-display font-extrabold text-display-2xl text-secondary-950 mb-5 text-balance animate-fade-up">
                  Finn sertifisert <span className="text-gradient-primary">elektriker</span> i din kommune
                </h1>
                <p className="text-body-lg text-secondary-600 mb-8 text-pretty animate-fade-up" style={{ animationDelay: "100ms" }}>
                  Gratis og uforpliktende tilbud fra DSB godkjente elektrikere i hele Norge. Elbillader, sikringsskap, smarthus og alle elektriske tjenester.
                </p>
                <ul className="space-y-3 mb-8 animate-fade-up" style={{ animationDelay: "150ms" }}>
                  {["Svar innen 24 timer", "100% autoriserte fagpersoner", "Gratis og uforpliktende", "Dekker 340+ kommuner"].map((punkt) => (
                    <li key={punkt} className="flex items-center gap-2.5 text-body-md text-secondary-700"><CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" aria-hidden />{punkt}</li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <Link href="#tilbud" className="btn-primary-lg animate-pulse-cta">F\u00e5 gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
                  <a href="tel:+4780000000" className="btn-phone text-cta-lg px-8 py-4 rounded-12"><Phone className="w-5 h-5" aria-hidden />Ring oss n\u00e5</a>
                </div>
                <div className="flex items-center gap-3 mt-7 animate-fade-up" style={{ animationDelay: "250ms" }}>
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map((i) => (<div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-caption font-bold">{String.fromCharCode(64 + i)}</div>))}
                  </div>
                  <div className="flex items-center gap-1">{[1,2,3,4,5].map((i) => (<Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" aria-hidden />))}</div>
                  <span className="text-body-sm text-secondary-600"><strong className="text-secondary-900">4.9/5</strong> fra 4 800+ kunder</span>
                </div>
              </div>
              <div id="tilbud" className="animate-slide-in-right" style={{ animationDelay: "100ms" }}>
                <div className="mb-4">
                  <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-1">Bestill gratis tilbud</h2>
                  <p className="text-body-sm text-secondary-500">Fyll ut skjemaet, vi kobler deg med rett elektriker</p>
                </div>
                <LeadForm kilde="forside-hero" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-white border-y border-neutral-200" aria-label="N\u00f8kkeltall">
          <div className="container-site py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-neutral-200">
              {STATS.map(({ verdi, label, suffix }) => (
                <div key={label} className="text-center lg:px-8">
                  <div className="font-display font-extrabold text-display-xl text-primary-600 mb-1">{verdi}{suffix && <span className="text-display-lg text-secondary-400">{suffix}</span>}</div>
                  <div className="text-body-sm text-secondary-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-subtle section-py" aria-labelledby="tjenester-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <div className="badge-accent mb-4 mx-auto"><Zap className="w-3 h-3" aria-hidden />Elektriske tjenester</div>
              <h2 id="tjenester-heading" className="font-display font-bold text-display-xl text-secondary-950 mb-4">Alle elektriske tjenester</h2>
              <p className="text-body-lg text-secondary-600 max-w-prose mx-auto">Fra elbillader og sikringsskap til smarthus og akutt utrykning, vi dekker alle behov.</p>
            </div>
            <div className="grid grid-auto-fill-280 gap-5 mb-10">
              {populareTjenester.map((tjeneste) => (
                <Link key={tjeneste.slug} href={`/tjenester/${tjeneste.slug}`} className="card p-6 group">
                  <div className="w-11 h-11 rounded-12 bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors"><Zap className="w-5 h-5 text-primary-500" aria-hidden /></div>
                  <h3 className="font-display font-semibold text-heading-sm text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">{tjeneste.tittel}</h3>
                  <p className="text-body-sm text-secondary-500 clamp-2 mb-4">{tjeneste.kortBeskrivelse}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-secondary-400">fra {formatPrisIntervall(tjeneste.prisMin, tjeneste.prisMin + 2000)}</span>
                    <span className="flex items-center gap-1 text-label text-primary-600 group-hover:gap-2 transition-all">Les mer <ChevronRight className="w-3.5 h-3.5" aria-hidden /></span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center"><Link href="/tjenester" className="btn-secondary">Se alle tjenester <ChevronRight className="w-4 h-4" /></Link></div>
          </div>
        </section>

        <section className="section-white section-py" aria-labelledby="kalk-heading">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="badge-primary mb-4"><Zap className="w-3 h-3" aria-hidden />Priskalkulator</div>
                <h2 id="kalk-heading" className="font-display font-bold text-display-xl text-secondary-950 mb-5">Hva koster elbillader installasjon?</h2>
                <p className="text-body-lg text-secondary-600 mb-6">Bruk v\u00e5r gratis kalkulator og f\u00e5 et prisestimat p\u00e5 sekunder. Deretter kan du bestille gratis og uforpliktende tilbud fra elektrikere i ditt omr\u00e5de.</p>
                <ul className="space-y-3">
                  {["Estimert pris for din situasjon","Basert p\u00e5 boligtype og avstand","Justert for type lader","Helt gratis \u00e5 bruke"].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-body-sm text-secondary-700"><CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" aria-hidden />{p}</li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-3"><Link href="/kalkulator" className="btn-secondary">Se alle kalkulatorer <ChevronRight className="w-4 h-4" /></Link></div>
              </div>
              <div><ElladerKalkulator /></div>
            </div>
          </div>
        </section>

        <section className="section-subtle section-py" aria-labelledby="trust-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <h2 id="trust-heading" className="font-display font-bold text-display-xl text-secondary-950 mb-4">Hvorfor velge Elspesialisten?</h2>
              <p className="text-body-lg text-secondary-600 max-w-prose mx-auto">Vi gj\u00f8r det enkelt \u00e5 finne riktig elektriker, trygt, raskt og kostnadsfritt.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_POINTS.map(({ ikkon: Icon, tittel, tekst }) => (
                <div key={tittel} className="trust-box rounded-16 hover:shadow-card-lg transition-shadow">
                  <div className="trust-icon-wrap flex-shrink-0"><Icon className="w-5 h-5 text-primary-500" aria-hidden /></div>
                  <div>
                    <h3 className="font-display font-semibold text-heading-sm text-secondary-900 mb-1">{tittel}</h3>
                    <p className="text-body-sm text-secondary-500">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-white section-py" aria-labelledby="anmeldelser-heading">
          <div className="container-site">
            <div className="text-center mb-12">
              <h2 id="anmeldelser-heading" className="font-display font-bold text-display-xl text-secondary-950 mb-4">Hva sier kundene?</h2>
              <div className="flex items-center justify-center gap-2 mb-2">{[1,2,3,4,5].map((i) => (<Star key={i} className="w-5 h-5 text-accent-500 fill-accent-500" aria-hidden />))}<span className="font-display font-bold text-heading-md text-secondary-900 ml-2">4.9</span></div>
              <p className="text-body-sm text-secondary-500">Basert p\u00e5 4 800+ vurderinger</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.navn} className="card p-6">
                  <div className="flex items-center gap-1 mb-3">{Array.from({ length: t.stjerner }).map((_, i) => (<Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" aria-hidden />))}</div>
                  <p className="text-body-md text-secondary-700 mb-5 italic leading-relaxed">\u00ab{t.tekst}\u00bb</p>
                  <div className="flex items-center justify-between">
                    <div><div className="text-label font-bold text-secondary-900">{t.navn}</div><div className="flex items-center gap-1 text-caption text-secondary-400"><MapPin className="w-3 h-3" aria-hidden />{t.sted}</div></div>
                    <div className="badge-primary text-[0.7rem]">{t.tjeneste}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-subtle section-py" aria-labelledby="kommuner-heading">
          <div className="container-site">
            <div className="text-center mb-10">
              <div className="badge-neutral mb-4 mx-auto"><MapPin className="w-3 h-3" aria-hidden />Lokal dekning</div>
              <h2 id="kommuner-heading" className="font-display font-bold text-display-xl text-secondary-950 mb-4">Elektriker i din kommune</h2>
              <p className="text-body-lg text-secondary-600 max-w-prose mx-auto">Vi har sertifiserte elektrikere i 340+ norske kommuner. Finn din kommune og se lokale priser og tilbud.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {populareKommuner.map((k) => (
                <Link key={k.slug} href={`/kommune/${k.slug}`} className="card-flat px-4 py-3 text-center hover:border-primary-300 hover:bg-primary-50 transition-all group">
                  <div className="text-label font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors">{k.navn}</div>
                  <div className="text-caption text-secondary-400 mt-0.5">{k.fylke}</div>
                </Link>
              ))}
            </div>
            <div className="text-center"><Link href="/elektriker" className="btn-primary"><MapPin className="w-4 h-4" aria-hidden />Se alle kommuner <ChevronRight className="w-4 h-4" /></Link></div>
          </div>
        </section>

        <section className="section-white section-py" aria-labelledby="faq-main">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="badge-primary mb-4">Vanlige sp\u00f8rsm\u00e5l</div>
                <h2 id="faq-main" className="font-display font-bold text-display-xl text-secondary-950 mb-5">Sp\u00f8rsm\u00e5l om elektriker og priser</h2>
                <p className="text-body-lg text-secondary-600 mb-6">Her svarer vi p\u00e5 de vanligste sp\u00f8rsm\u00e5lene om elektriker, priser og prosessen.</p>
                <Link href="/faq" className="btn-secondary">Se alle sp\u00f8rsm\u00e5l <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <FAQ items={HOMEPAGE_FAQ} tittel="" showSchema />
            </div>
          </div>
        </section>

        <section className="section-subtle section-py-sm" aria-labelledby="cta-main">
          <div className="container-site">
            <div className="cta-block">
              <div className="badge mx-auto mb-5 bg-white/20 text-white border-white/30"><Users className="w-3 h-3" aria-hidden />4 800+ forn\u00f8yde kunder</div>
              <h2 id="cta-main" className="font-display font-extrabold text-display-xl text-white mb-4 text-balance">Klar til \u00e5 finne rett elektriker?</h2>
              <p className="text-body-lg text-primary-100 mb-8 max-w-lg mx-auto">Fyll ut skjemaet og motta gratis tilbud fra sertifiserte elektrikere i ditt omr\u00e5de, innen 24 timer.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">F\u00e5 gratis tilbud n\u00e5 <ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+4780000000" className="btn border-2 border-white/50 text-white text-cta-lg px-8 py-4 rounded-12 hover:bg-white/10"><Phone className="w-5 h-5" aria-hidden />Ring 800 00 000</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
