import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap, Shield, Clock, Star, ChevronRight, Phone, CheckCircle, ArrowRight,
  MapPin, Award, BatteryCharging, LayoutGrid, Thermometer,
  Lightbulb, Wifi, AlertTriangle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import ElladerKalkulator from "@/components/calculators/ElladerKalkulator";
import FAQ from "@/components/ui/FAQ";
import { TJENESTER } from "@/data/tjenester";
import { KOMMUNER } from "@/data/kommuner";
import { buildLocalBusinessSchema } from "@/lib/utils";
import AnimatedStatsBar from "@/components/ui/AnimatedStatsBar";

export const metadata: Metadata = {
  title: "Finn sertifisert elektriker i din kommune – Rask og enkel tilbudsinnhenting",
  description: "Norges ledende plattform for elektriker og elektrotjenester. Elbillader, sikringsskap, smarthus og mer. Gratis og uforpliktende tilbud fra sertifiserte elektrikere i hele Norge.",
  alternates: { canonical: "https://elspesialisten.no" },
};

const TJENESTE_IKONER: Record<string, React.ElementType> = {
  elbillader: BatteryCharging, sikringsskap: LayoutGrid, varmekabler: Thermometer,
  belysning: Lightbulb, smarthus: Wifi, akutt: AlertTriangle, elkontroll: Shield, feilsoking: Zap,
};

const TRUST_POINTS = [
  { ikkon: Shield, tittel: "Kun autoriserte", tekst: "DSB godkjente elektrikere" },
  { ikkon: Clock, tittel: "Svar innen 24t", tekst: "Rask kontakt med lokal elektriker" },
  { ikkon: Star, tittel: "Helt gratis", tekst: "Uforpliktende tilbud" },
  { ikkon: Award, tittel: "Kvalitetssikret", tekst: "Etter gjeldende forskrifter" },
];

const PROSESS_STEG = [
  { steg: "1", tittel: "Send forespørsel", tekst: "Fyll ut skjema med oppdragstype og postnummer." },
  { steg: "2", tittel: "Vi finner elektriker", tekst: "Vi matcher deg med autorisert elektriker i ditt område." },
  { steg: "3", tittel: "Motta tilbud", tekst: "Elektriker kontakter deg innen 24 timer med tilbud." },
];

const HOMEPAGE_FAQ = [
  { sporsmal: "Hva koster en elektriker i Norge?", svar: "Timeprisen for elektriker i Norge ligger typisk mellom 650 og 1 200 kr per time inkludert moms, avhengig av region, bedrift og oppdragets kompleksitet. I tillegg kommer materialkostnader og eventuelt utrykningsgebyr. Mange oppdrag faktureres som fastpris." },
  { sporsmal: "Kan jeg gjøre elektrisk arbeid selv?", svar: "Nei, elektrisk installasjonsarbeid i Norge krever autorisasjon. Det er kun tillatt å bytte lyspærer, stikkontakter av typen med stikkontaktlokk og lignende. Alt arbeid på fast installasjon, inkludert kursopplegg, sikringer og fast montasje, må utføres av autorisert elektriker." },
  { sporsmal: "Hvor raskt kan jeg få tak i elektriker?", svar: "Via Elspesialisten kan du forvente å bli kontaktet av en elektriker innen 24 timer. Ved akutte situasjoner (jordfeil, strøm borte) kan vi ofte formidle raskere hjelp. Meld din forespørsel og opplys at det haster." },
  { sporsmal: "Hva er inkludert i tilbudet fra elektriker?", svar: "Et komplett tilbud fra elektriker skal inkludere arbeidskostnad, materialkostnader, moms, reisekostnad og eventuelt utrykningsgebyr. Be alltid om skriftlig tilbud med spesifisert prisliste før du takker ja." },
  { sporsmal: "Trenger jeg å søke om tillatelse for elektrisk arbeid?", svar: "For de fleste enkle installasjoner er det elektriker som melder arbeidet til DSB og netteier, dette er inkludert i oppdraget. For større prosjekter (nybygg, rehabilitering) kan det kreves bygningstillatelse fra kommunen." },
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

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden section-gradient hero-pattern" aria-labelledby="hero-heading">
          <div className="container-site py-8 sm:py-16 lg:py-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <div className="badge-primary mb-3"><Zap className="w-3 h-3" aria-hidden />Norges ledende elektrikerplattform</div>
                <h1 id="hero-heading" className="font-display font-extrabold text-display-2xl text-secondary-950 mb-3 text-balance">
                  Finn sertifisert <span className="text-gradient-primary">elektriker</span> i din kommune
                </h1>
                <p className="text-body-md text-secondary-600 mb-5">
                  Gratis og uforpliktende tilbud fra DSB godkjente elektrikere i hele Norge.
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
                  {["Svar innen 24 timer", "Autoriserte fagfolk", "Gratis tilbud", "Hele Norge"].map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-body-sm text-secondary-700">
                      <CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" aria-hidden />{p}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mb-2">
                  <Link href="#tilbud" className="btn-primary flex-1 sm:flex-none justify-center text-cta-md sm:text-cta-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-12 animate-pulse-cta">Få gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
                  <a href="tel:+4780000000" className="btn-phone px-5 py-3.5 rounded-12 hidden sm:inline-flex"><Phone className="w-4 h-4" aria-hidden />Ring oss</a>
                </div>
              </div>
              <div id="tilbud">
                <LeadForm kilde="forside-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS (animert) ═══ */}
        <AnimatedStatsBar />

        {/* ═══ TJENESTER (2 kolonne mobil) ═══ */}
        <section className="section-white py-8 sm:py-14" aria-labelledby="tjenester-heading">
          <div className="container-site">
            <h2 id="tjenester-heading" className="font-display font-bold text-heading-xl sm:text-display-lg text-secondary-950 mb-1 text-center">Elektriske tjenester</h2>
            <p className="text-body-sm text-secondary-500 mb-6 text-center">Alt fra elbillader til akutt hjelp</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 mb-6">
              {populareTjenester.map((t) => {
                const Ikon = TJENESTE_IKONER[t.id] || Zap;
                return (
                  <Link key={t.slug} href={`/tjenester/${t.slug}`} className="card p-3.5 sm:p-5 group">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-10 bg-primary-50 flex items-center justify-center mb-2.5 group-hover:bg-primary-100 transition-colors">
                      <Ikon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" aria-hidden />
                    </div>
                    <h3 className="font-display font-semibold text-[0.8rem] sm:text-heading-sm text-secondary-900 group-hover:text-primary-600 transition-colors leading-snug">{t.kortTittel}</h3>
                    <div className="flex items-center gap-0.5 text-[0.7rem] text-primary-500 mt-1.5">Se priser <ChevronRight className="w-3 h-3" aria-hidden /></div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center"><Link href="/tjenester" className="btn-secondary text-body-sm">Alle tjenester <ChevronRight className="w-4 h-4" /></Link></div>
          </div>
        </section>

        {/* ═══ SLIK FUNGERER DET (mørk) ═══ */}
        <section className="bg-secondary-900 py-8 sm:py-14" aria-labelledby="prosess-heading">
          <div className="container-site">
            <h2 id="prosess-heading" className="font-display font-bold text-heading-xl sm:text-display-lg text-white mb-6 text-center">Slik fungerer det</h2>
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              {PROSESS_STEG.map((s) => (
                <div key={s.steg} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-0 sm:text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-display font-bold text-heading-md sm:text-heading-lg flex-shrink-0 sm:mb-3">{s.steg}</div>
                  <div>
                    <h3 className="font-display font-semibold text-body-sm sm:text-heading-sm text-white">{s.tittel}</h3>
                    <p className="text-caption sm:text-body-sm text-secondary-400 mt-0.5">{s.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <Link href="#tilbud" className="btn bg-primary-500 text-white text-cta-md px-7 py-3 rounded-12 hover:bg-primary-600 shadow-cta">Kom i gang <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* ═══ KALKULATOR ═══ */}
        <section className="section-subtle py-8 sm:py-14" aria-labelledby="kalk-heading">
          <div className="container-site">
            <h2 id="kalk-heading" className="font-display font-bold text-heading-xl sm:text-display-lg text-secondary-950 mb-1 text-center lg:hidden">Beregn pris på elbillader</h2>
            <p className="text-body-sm text-secondary-500 mb-5 text-center lg:hidden">Gratis kalkulator, svar på sekunder</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="hidden lg:block">
                <div className="badge-primary mb-3"><Zap className="w-3 h-3" aria-hidden />Priskalkulator</div>
                <h2 className="font-display font-bold text-display-xl text-secondary-950 mb-3">Hva koster elbillader?</h2>
                <p className="text-body-md text-secondary-600 mb-5">Bruk vår gratis kalkulator og få prisestimat på sekunder.</p>
                <ul className="space-y-2">
                  {["Tilpasset din boligtype","Basert på avstand til sikringsskap","Helt gratis å bruke"].map((p) => (
                    <li key={p} className="flex items-center gap-2 text-body-sm text-secondary-700"><CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" aria-hidden />{p}</li>
                  ))}
                </ul>
              </div>
              <ElladerKalkulator />
            </div>
          </div>
        </section>

        {/* ═══ TILLIT (kompakt 2x2 grid) ═══ */}
        <section className="section-white py-8 sm:py-14" aria-labelledby="trust-heading">
          <div className="container-site">
            <h2 id="trust-heading" className="font-display font-bold text-heading-xl sm:text-display-lg text-secondary-950 mb-6 text-center">Hvorfor Elspesialisten?</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {TRUST_POINTS.map(({ ikkon: Icon, tittel, tekst }) => (
                <div key={tittel} className="bg-neutral-50 rounded-16 p-3.5 sm:p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-primary-500" aria-hidden />
                  </div>
                  <h3 className="font-display font-semibold text-[0.8rem] sm:text-heading-sm text-secondary-900 mb-0.5">{tittel}</h3>
                  <p className="text-[0.7rem] sm:text-caption text-secondary-500">{tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ KOMMUNER (3 kolonner mobil) ═══ */}
        <section className="section-subtle py-8 sm:py-14" aria-labelledby="kommuner-heading">
          <div className="container-site">
            <h2 id="kommuner-heading" className="font-display font-bold text-heading-xl sm:text-display-lg text-secondary-950 mb-1 text-center">Finn elektriker lokalt</h2>
            <p className="text-body-sm text-secondary-500 mb-5 text-center">Vi dekker hele Norge</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2.5 mb-5">
              {populareKommuner.map((k) => (
                <Link key={k.slug} href={`/kommune/${k.slug}`} className="bg-white rounded-10 border border-neutral-200 px-2 py-2 text-center hover:border-primary-300 hover:bg-primary-50 transition-all group">
                  <div className="text-[0.75rem] font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors">{k.navn}</div>
                </Link>
              ))}
            </div>
            <div className="text-center"><Link href="/elektriker" className="btn-primary text-body-sm"><MapPin className="w-4 h-4" aria-hidden />Alle kommuner</Link></div>
          </div>
        </section>

        {/* ═══ FAQ (full bredde, kompakt) ═══ */}
        <section className="section-white py-8 sm:py-14" aria-labelledby="faq-main">
          <div className="container-site max-w-3xl">
            <h2 id="faq-main" className="font-display font-bold text-heading-xl sm:text-display-lg text-secondary-950 mb-5 text-center">Vanlige spørsmål</h2>
            <FAQ items={HOMEPAGE_FAQ} tittel="" showSchema />
            <div className="text-center mt-5"><Link href="/faq" className="btn-secondary text-body-sm">Se alle spørsmål <ChevronRight className="w-4 h-4" /></Link></div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-6 sm:py-10">
          <div className="container-site">
            <div className="cta-block py-8 sm:py-12 px-6">
              <h2 className="font-display font-extrabold text-heading-xl sm:text-display-lg text-white mb-2 text-balance">Klar til å finne elektriker?</h2>
              <p className="text-body-sm sm:text-body-md text-white/70 mb-5 max-w-md mx-auto">Gratis tilbud fra sertifiserte elektrikere, innen 24 timer.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-md px-6 py-3.5 rounded-12 hover:bg-primary-50 shadow-card-xl justify-center">Få gratis tilbud <ArrowRight className="w-4 h-4" /></Link>
                <a href="tel:+4780000000" className="btn border-2 border-white/40 text-white text-cta-md px-6 py-3.5 rounded-12 hover:bg-white/10 justify-center"><Phone className="w-4 h-4" aria-hidden />Ring oss</a>
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
