import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Shield, Clock, Star, ChevronRight, Zap, AlertTriangle, BatteryCharging, LayoutGrid, Lightbulb, Wifi, Thermometer, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LeadForm from "@/components/forms/LeadForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQ from "@/components/ui/FAQ";
import { getKommune, getAllKommuneSlugs, getKommunerByFylke, KOMMUNER } from "@/data/kommuner";
import { TJENESTER } from "@/data/tjenester";
import { ELEKTRIKER_PER_KOMMUNE, TOTALT_ELEKTRIKERE } from "@/data/elektrikere-stats";
import { buildFAQSchema, buildLocalBusinessSchema } from "@/lib/utils";
import BedriftOversikt from "@/components/ui/BedriftOversikt";
import { OSLO_BEDRIFTER } from "@/data/bedrifter/oslo";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() { return getAllKommuneSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kommune = getKommune(slug);
  if (!kommune) return {};
  const ant = ELEKTRIKER_PER_KOMMUNE[slug] || 0;
  const title = `Elektriker ${kommune.navn} | ${ant > 0 ? ant + " bedrifter" : "Døgnvakt"} | Elspesialisten`;
  const desc = `Elektriker i ${kommune.navn}. ${ant > 0 ? ant + " registrerte bedrifter. " : ""}Få hjelp med sikringsskap, elbillader, feilsøking og akutt strømproblemer. Send forespørsel og få tilbud raskt.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `https://elspesialisten.no/kommune/${slug}` },
    openGraph: { title, description: desc, url: `https://elspesialisten.no/kommune/${slug}`, type: "website", siteName: "Elspesialisten", locale: "nb_NO" },
  };
}

/* ═══════════════════════════════════════════════════════════════
   OSLO FAQ – 10+ spørsmål, datadrevet, AEO-optimalisert
   ═══════════════════════════════════════════════════════════════ */
const OSLO_FAQ = [
  { sporsmal: "Hva koster elektriker i Oslo?", svar: "Timeprisen for elektriker i Oslo ligger mellom 850 og 1 400 kr inkludert moms. Oslo har Norges høyeste prisnivå for elektrotjenester. Utrykningsgebyr kommer i tillegg og ligger typisk på 500 til 1 500 kr. Kveldstillegg og helgearbeid kan øke prisen med 30 til 50 prosent. Innhent alltid minst tre skriftlige tilbud." },
  { sporsmal: "Hvor mange elektrikerbedrifter finnes i Oslo?", svar: "Det er 543 bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Oslo ifølge Brønnøysundregistrene. 395 er aksjeselskap, 106 er enkeltpersonforetak og 21 er NUF. 184 bedrifter har registrerte ansatte, og bransjen sysselsetter over 17 000 personer i hovedstaden." },
  { sporsmal: "Hvor raskt kan elektriker komme i Oslo?", svar: "Ved akutte situasjoner som strømbrudd, jordfeil eller brent sikringsskap kan døgnvakt elektriker i Oslo som regel være på plass innen 1 til 3 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager avhengig av sesong og bedrift." },
  { sporsmal: "Må jeg oppgradere sikringsskapet i Oslo?", svar: "Har du et sikringsskap med skrusikringer fra før 1980 bør det byttes. Moderne skap har automatsikringer og jordfeilbrytere som gir langt bedre sikkerhet. Spesielt i Oslos eldre bygårder på Grünerløkka, Frogner og St. Hanshaugen er dette aktuelt. Bytte koster mellom 25 000 og 45 000 kr." },
  { sporsmal: "Kan jeg installere elbillader selv?", svar: "Nei. All installasjon av ladeboks for elbil må utføres av autorisert elektriker. Dette gjelder også i borettslag og sameier. Elektrikeren melder arbeidet til netteier og sikrer at anlegget tåler belastningen. Installasjon i Oslo koster typisk mellom 12 000 og 35 000 kr." },
  { sporsmal: "Hva koster det å installere stikkontakt i Oslo?", svar: "Installasjon av en ny stikkontakt i Oslo koster typisk mellom 1 500 og 3 500 kr inkludert materiell, avhengig av om det finnes eksisterende kurs i nærheten eller om det må trekkes ny kabel." },
  { sporsmal: "Hva koster montering av spotter i Oslo?", svar: "Montering av downlights og spotter koster mellom 800 og 1 500 kr per punkt i Oslo. For et typisk rom med 6 til 8 spotter ligger totalprisen mellom 5 000 og 12 000 kr inkludert materiell og arbeid." },
  { sporsmal: "Når trenger man elkontroll?", svar: "Elkontroll anbefales hvert 5. år for boliger eldre enn 20 år, ved kjøp og salg av bolig, ved forsikringskrav, og hvis du opplever uforklarlige strømproblemer. I Oslo koster en full elkontroll mellom 3 000 og 6 000 kr avhengig av boligens størrelse." },
  { sporsmal: "Hva gjør jeg hvis sikringen går hele tiden?", svar: "Hvis sikringen løser ut gjentatte ganger kan det skyldes overbelastning, kortslutning eller jordfeil. Sjekk om du har for mange apparater på samme kurs. Hvis problemet fortsetter, kontakt autorisert elektriker. Ikke bytt til en sterkere sikring, det kan føre til brann." },
  { sporsmal: "Hva gjør jeg ved strømbrudd i Oslo?", svar: "Sjekk først om problemet er lokalt ved å se om naboene har strøm. Sjekk sikringsskapet for utløste sikringer. Er hovedsikringen utløst kan det tyde på jordfeil. Vedvarer problemet, kontakt Elvia (netteier i Oslo) på 03444 eller ring en døgnvakt elektriker." },
  { sporsmal: "Hva koster oppgradering av elektrisk anlegg i Oslo?", svar: "En full oppgradering av det elektriske anlegget i en leilighet i Oslo koster mellom 80 000 og 180 000 kr. For enebolig kan prisen ligge mellom 120 000 og 300 000 kr avhengig av størrelse og omfang. Prisen inkluderer nytt sikringsskap, nye kurser og utskifting av eldre kabler." },
  { sporsmal: "Er det lovlig å bytte lyspærer og stikkontaktdeksler selv?", svar: "Du kan bytte lyspærer, sette inn støpsler og bytte deksel på stikkontakter og brytere. Alt annet arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette inkluderer å trekke nye kabler, installere nye punkt og arbeide i sikringsskapet." },
];

export default async function KommuneSide({ params }: Props) {
  const { slug } = await params;
  const kommune = getKommune(slug);
  if (!kommune) notFound();
  const relatertKommuner = getKommunerByFylke(kommune.fylkeSlug).filter((k) => k.slug !== slug).slice(0, 8);
  const antallBedrifter = ELEKTRIKER_PER_KOMMUNE[slug] || 0;
  const isOslo = slug === "oslo";

  /* ─── Generic FAQ for non-Oslo ─── */
  const genericFAQ = [
    { sporsmal: `Hva koster elektriker i ${kommune.navn}?`, svar: `Timeprisen for elektriker i ${kommune.navn} ligger typisk mellom 750 og 1 200 kr inkludert moms. Prisen avhenger av oppdragstype, tidspunkt og kompleksitet. Innhent minst tre skriftlige tilbud for å sammenligne.` },
    { sporsmal: `Hvor mange elektrikerbedrifter finnes i ${kommune.navn}?`, svar: `I ${kommune.navn} er det ${antallBedrifter > 0 ? antallBedrifter : "flere"} bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Brønnøysundregistrene.` },
    { sporsmal: `Hvor raskt kan elektriker komme i ${kommune.navn}?`, svar: `Ved akutte situasjoner kan døgnvakt elektriker i ${kommune.navn} som regel komme innen 1 til 4 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager.` },
    { sporsmal: `Hvordan finner jeg en god elektriker i ${kommune.navn}?`, svar: `Sjekk at elektrikeren er registrert i DSBs Elvirksomhetsregister. Be om referanser og sammenlign alltid flere tilbud. En seriøs elektriker gir deg skriftlig tilbud med spesifisert materiell og arbeidskostnad.` },
    { sporsmal: `Kan jeg gjøre elektrisk arbeid selv?`, svar: `Du kan bytte lyspærer og sette inn støpsler. Alt arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette gjelder i hele Norge, også i ${kommune.navn}.` },
  ];

  const faqItems = isOslo ? OSLO_FAQ : genericFAQ;

  /* ─── JSON-LD Schemas ─── */
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.sporsmal, acceptedAnswer: { "@type": "Answer", text: f.svar } })) };
  const localSchema = { "@context": "https://schema.org", "@type": "Electrician", name: `Elspesialisten – Elektriker ${kommune.navn}`, url: `https://elspesialisten.no/kommune/${slug}`, telephone: "+4780000000", areaServed: { "@type": "City", name: kommune.navn }, address: { "@type": "PostalAddress", addressLocality: kommune.navn, addressCountry: "NO" }, description: `Finn autorisert elektriker i ${kommune.navn}. ${antallBedrifter} registrerte elektrikerbedrifter i kommunen.`, priceRange: "$$" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <Header />
      <main id="main-content">

        {/* ═══ BREADCRUMB ═══ */}
        <div className="container-site pt-5 pb-2">
          <Breadcrumb items={[{ navn: "Elektriker", href: "/elektriker" }, { navn: kommune.fylke, href: `/fylke/${kommune.fylkeSlug}` }, { navn: `Elektriker ${kommune.navn}` }]} />
        </div>

        {/* ═══ HERO + LEADFORM ═══ */}
        <section className="section-gradient hero-pattern" aria-labelledby="kommune-hero">
          <div className="container-site py-10 sm:py-14"><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="badge-primary mb-3"><MapPin className="w-3 h-3" aria-hidden />{kommune.fylke}</div>
              <h1 id="kommune-hero" className="font-display font-extrabold text-display-xl text-secondary-950 mb-3 text-balance">Elektriker i <span className="text-gradient-primary">{kommune.navn}</span></h1>
              <p className="text-body-md text-secondary-600 mb-4">{isOslo ? "Trenger du elektriker i Oslo? Vi hjelper deg å finne riktig fagperson til jobben. Enten det gjelder installasjon av elbillader, oppgradering av sikringsskap, feilsøking av strøm eller akutt hjelp med strømbrudd, så finnes det over 500 elektrikerbedrifter i hovedstaden." : kommune.kortTekst}</p>
              {antallBedrifter > 0 && (
                <div className="bg-secondary-900 text-white rounded-12 px-4 py-3 mb-5 inline-flex items-center gap-3">
                  <span className="font-display font-extrabold text-heading-lg text-primary-400">{antallBedrifter}</span>
                  <span className="text-body-sm text-secondary-300">elektrikerbedrifter registrert i {kommune.navn}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-5">
                {[{ i: Shield, t: "DSB autoriserte" }, { i: Clock, t: "Svar innen 24t" }, { i: Star, t: "Gratis tilbud" }].map(({ i: Icon, t }) => (<div key={t} className="flex items-center gap-1.5 badge-neutral text-body-sm"><Icon className="w-3.5 h-3.5" aria-hidden />{t}</div>))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#tilbud" className="btn-primary">Få gratis tilbud i {kommune.navn}</Link>
                <a href="tel:+4780000000" className="btn-phone"><Phone className="w-4 h-4" aria-hidden />Ring nå</a>
              </div>
            </div>
            <div id="tilbud"><LeadForm kilde={`kommune-${slug}`} /></div>
          </div></div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        {antallBedrifter > 0 && (
          <section className="bg-secondary-900 text-white"><div className="container-site py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">{antallBedrifter}</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Lokale bedrifter</div></div>
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">{TOTALT_ELEKTRIKERE.toLocaleString("nb-NO")}</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Totalt i Norge</div></div>
              <div><div className="font-display font-extrabold text-heading-lg text-primary-400">43.210</div><div className="text-[0.65rem] text-secondary-400 uppercase tracking-wider">Næringskode</div></div>
            </div>
          </div></section>
        )}

        {/* ═══ HOVEDINNHOLD ═══ */}
        <section className="section-white py-8 sm:py-12"><div className="container-site max-w-prose">

          {isOslo ? (<>
            {/* ── OSLO: Full 2500+ ord artikkel ── */}
            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i Oslo – komplett oversikt</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>En elektriker utfører alt arbeid knyttet til elektriske installasjoner i boliger, næringsbygg og industri. I Norge er det lovpålagt at alt arbeid på fast elektrisk anlegg utføres av autorisert elektriker registrert hos Direktoratet for samfunnssikkerhet og beredskap (DSB). Dette gjelder alt fra installasjon av en ny stikkontakt til komplett oppgradering av et helt elektrisk anlegg.</p>
              <p>Du trenger elektriker når du skal installere elbillader, bytte sikringsskap, montere nye lyspunkt eller spotter, oppgradere det elektriske anlegget, installere smarthussystem, utføre elkontroll, eller når du opplever strømproblemer som jordfeil, kortslutning eller strømbrudd.</p>
              <p>Oslo er Norges klart største marked for elektrikertjenester. Med 543 registrerte bedrifter og over 17 000 sysselsatte i bransjen er tilbudet bredt og konkurransen høy, noe som gir deg som forbruker gode muligheter til å sammenligne pris og kvalitet.</p>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Elektrikertjenester i Oslo</h2>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Installasjon av stikkontakter og brytere</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Installasjon av nye stikkontakter er et av de vanligste oppdragene for elektrikere i Oslo. Mange eldre leiligheter på Frogner, Majorstuen og Grünerløkka har for få stikkontakter etter dagens behov. En ny stikkontakt koster mellom 1 500 og 3 500 kr avhengig av om det kan kobles på eksisterende kurs eller om det må trekkes ny kabel fra sikringsskapet.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Oppgradering av sikringsskap</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Sikringsskapet er hjertet i det elektriske anlegget ditt. I Oslo finnes det tusenvis av boliger med sikringsskap fra 1920 til 1970 tallet som mangler jordfeilbrytere og har gamle skrusikringer. Et moderne sikringsskap med automatsikringer og jordfeilbrytere koster mellom 25 000 og 45 000 kr i Oslo. Prisen avhenger av antall kurser, boligens størrelse og om det elektriske anlegget trenger tilleggsarbeid.</p>
              <p>Bydelene Frogner, St. Hanshaugen, Sagene og Gamle Oslo har flest boliger med eldre sikringsskap som bør oppgraderes. Oppgradering gir bedre sikkerhet mot brann og elektrisk støt, og er ofte et krav fra forsikringsselskaper.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Elkontroll bolig</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>En elkontroll er en systematisk gjennomgang av hele det elektriske anlegget i boligen. Elektrikeren sjekker sikringsskap, jordfeilvern, kabler, stikkontakter og faste installasjoner. I Oslo koster en full elkontroll mellom 3 000 og 6 000 kr avhengig av boligens størrelse. Elkontroll anbefales hvert 5. år for boliger eldre enn 20 år, ved kjøp og salg, og etter forsikringskrav.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Installasjon av spotter og belysning</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Downlights og LED spotter gir moderne belysning og bedre romfølelse. Montering koster mellom 800 og 1 500 kr per punkt i Oslo. For et typisk rom med 6 til 8 spotter ligger totalprisen mellom 5 000 og 12 000 kr. Elektrikeren sørger for riktig plassering, dimming og at den elektriske kapasiteten er tilstrekkelig.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Oppgradering av elektrisk anlegg</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>En komplett oppgradering av det elektriske anlegget innebærer nytt sikringsskap, nye kurser, utskifting av eldre kabler og modernisering av alle punkt. I en leilighet i Oslo koster dette mellom 80 000 og 180 000 kr. For enebolig kan prisen ligge mellom 120 000 og 300 000 kr. Oppgradering er aktuelt i boliger med eldre anlegg der kablene ikke lenger er dimensjonert for dagens strømforbruk.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Feilsøking strøm</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Strømproblemer i Oslo kan skyldes overbelastning, jordfeil, kortslutning eller feil i det faste anlegget. En elektriker bruker spesialisert måleutstyr for å finne feilen. Feilsøking koster typisk mellom 2 000 og 5 000 kr avhengig av kompleksitet. Ikke prøv å løse elektriske feil selv, det kan være livsfarlig og er ulovlig uten autorisasjon.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Smarthus installasjon</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Smarthus gir deg styring av lys, varme, sikkerhet og energiforbruk fra mobilen. I Oslo er etterspørselen spesielt høy i nye leilighetsprosjekter i Bjørvika, Nydalen og Løren, men også i eldre boliger som oppgraderes. En grunnleggende smarthusinstallasjon med styring av lys og varme koster fra 15 000 kr. Komplett system med sikkerhet, lås og energistyring kan koste 50 000 til 150 000 kr.</p>
            </div>

            <h3 className="font-display font-bold text-heading-md text-secondary-950 mt-6 mb-2">Renovering av elektrisk anlegg</h3>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Ved renovering av bad, kjøkken eller hele boligen må det elektriske anlegget oppdateres samtidig. Elektrikeren flytter punkt, installerer nye kurser for våtrom, og sørger for at alt tilfredsstiller NEK 400 og gjeldende forskrifter. I Oslo er dette spesielt aktuelt i bygårder fra tidlig 1900 tall der originale kabler og installasjoner ikke lenger er forsvarlige.</p>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Installere ladeboks i Oslo</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Elbillading hjemme er den enkleste og billigste måten å lade bilen. I Oslo der elbiltettheten er blant Europas høyeste, er etterspørselen etter ladeboksinstallasjon enorm. En autorisert elektriker sørger for at installasjonen er trygg og at anlegget tåler belastningen.</p>
              <p>Krav til installasjon: ladeboksen må monteres av autorisert elektriker, anlegget må ha tilstrekkelig kapasitet (minimum 32A kurs for 7,4 kW lading), det skal installeres egen jordfeilbryter type B, og arbeidet skal meldes til Elvia (netteier i Oslo). For borettslag og sameier kreves styremøtevedtak og ofte fellesløsning med lastbalansering.</p>
              <p>Sikkerhet er avgjørende. Feil installasjon kan føre til brann eller overbelastning. Bruk aldri skjøteledning eller vanlig stikkontakt til permanent elbillading. Ladeboksen skal ha egen dedikert kurs fra sikringsskapet.</p>
              <p>Priser i Oslo: enkel installasjon i enebolig med kort avstand til sikringsskap koster fra 12 000 kr. Installasjon i borettslag med lang kabelføring og lastbalansering kan koste mellom 20 000 og 35 000 kr per enhet. Oppgradering av hovedsikring eller inntak kommer i tillegg.</p>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Døgnvakt elektriker i Oslo</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Noen elektriske problemer kan ikke vente. Døgnvakt elektriker i Oslo er tilgjengelig for akutte situasjoner utenom ordinær arbeidstid. Typiske situasjoner der du trenger akutt elektriker:</p>
              <p><strong className="text-secondary-900">Strømbrudd</strong> – Hvis hele eller deler av boligen er uten strøm og problemet ikke skyldes netteier (sjekk Elvias feilkart), kan det være intern feil som krever elektriker. Sjekk om hovedsikringen er utløst.</p>
              <p><strong className="text-secondary-900">Kortslutning</strong> – Lysglimt, smell eller sikring som umiddelbart løser ut igjen kan tyde på kortslutning. Ikke forsøk å koble inn igjen gjentatte ganger. Kontakt elektriker.</p>
              <p><strong className="text-secondary-900">Jordfeil</strong> – Jordfeilbryter som løser ut beskytter mot elektrisk støt. Hvis den løser ut gjentatte ganger, trekk ut alle støpsler og koble inn én og én for å finne kilden. Ved vedvarende problem, ring elektriker.</p>
              <p><strong className="text-secondary-900">Brent sikringsskap</strong> – Lukt av brent plast, misfarging eller varme fra sikringsskapet er alvorlig og kan indikere brannfare. Slå av hovedbryteren og ring elektriker umiddelbart. Ved synlig røyk, ring brannvesenet på 110.</p>
              <p>Døgnvakt elektriker i Oslo har normalt utrykningsgebyr på 1 500 til 3 000 kr pluss timepris med kveld og helgetillegg. Den totale kostnaden avhenger av feilens art og omfang.</p>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Vanlige elektriske problemer i Oslo</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p><strong className="text-secondary-900">Sikringen går hele tiden</strong> – Vanligste årsak er overbelastning: for mange apparater på samme kurs. Kan også skyldes jordfeil i et apparat eller feil i det faste anlegget. Løsning: fordel belastningen eller la en elektriker legge nye kurser.</p>
              <p><strong className="text-secondary-900">Stikkontakt virker ikke</strong> – Sjekk om sikringen er utløst. Hvis ikke, kan kontakten være ødelagt eller koblingen løs. En defekt stikkontakt med varmgang er brannfarlig og bør byttes umiddelbart av elektriker.</p>
              <p><strong className="text-secondary-900">Strømmen går i deler av huset</strong> – Tyder på at en enkelt kurs har feilet. Sjekk hvilken sikring som er utløst i sikringsskapet. Hvis problemet gjentar seg, kontakt elektriker for feilsøking.</p>
              <p><strong className="text-secondary-900">Sikringsskapet er gammelt</strong> – Har du skrusikringer, ingen jordfeilbryter, eller et skap med synlig slitasje, bør det oppgraderes. Gamle sikringsskap er en av de vanligste årsakene til boligbrann i Norge.</p>
              <p><strong className="text-secondary-900">Varmgang i stikkontakt eller bryter</strong> – Varm eller misfarget stikkontakt er et alvorlig faresignal. Koble fra alt i kontakten umiddelbart og kontakt elektriker. Varmgang kan skyldes løs kobling, for høy belastning eller feil dimensjonering.</p>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Pris elektriker i Oslo – prisguide 2026</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Prisene under er basert på markedsdata og gjelder som veiledende priser for Oslo. Faktisk pris avhenger av bedrift, oppdragets omfang og tidspunkt. Alle priser er inkludert moms.</p>
            </div>
            <div className="overflow-x-auto mt-4 mb-6">
              <table className="w-full text-body-sm border-collapse">
                <thead><tr className="bg-neutral-50">
                  <th className="text-left px-4 py-3 font-display font-semibold text-secondary-900 border-b border-neutral-200">Tjeneste</th>
                  <th className="text-right px-4 py-3 font-display font-semibold text-secondary-900 border-b border-neutral-200">Prisområde (kr)</th>
                </tr></thead>
                <tbody className="text-secondary-600">
                  {[
                    ["Elektriker timepris", "850 – 1 400"],
                    ["Utrykningsgebyr", "500 – 1 500"],
                    ["Installasjon stikkontakt", "1 500 – 3 500"],
                    ["Montering spotter (per punkt)", "800 – 1 500"],
                    ["Oppgradering sikringsskap", "25 000 – 45 000"],
                    ["Installasjon elbillader", "12 000 – 35 000"],
                    ["Elkontroll bolig", "3 000 – 6 000"],
                    ["Feilsøking strøm", "2 000 – 5 000"],
                    ["Smarthus grunnpakke", "15 000 – 50 000"],
                    ["Komplett oppgradering anlegg (leilighet)", "80 000 – 180 000"],
                  ].map(([tjeneste, pris]) => (
                    <tr key={tjeneste} className="border-b border-neutral-100 hover:bg-neutral-50"><td className="px-4 py-2.5">{tjeneste}</td><td className="px-4 py-2.5 text-right font-medium text-secondary-900">{pris}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mt-10 mb-4">Markedet for elektrikertjenester i Oslo</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>Oslo er Norges suverent største marked for elektrikertjenester. Med 543 registrerte bedrifter og over 17 000 ansatte i bransjen er tilbudet bredt. Av disse er 395 aksjeselskap, 106 enkeltpersonforetak og 21 NUF. 373 bedrifter er MVA registrert.</p>
              <p>Bransjen spenner fra store nasjonale entreprenører som Bravida (3 355 ansatte), GK Norge (1 877 ansatte) og Caverion (1 860 ansatte) med hovedkontor i Oslo, til lokale spesialister som Lysteknikk Elektroentreprenør (157 ansatte), Eltera (116 ansatte) og Elektriker Gruppen (96 ansatte).</p>
              <p>Flest bedrifter holder til i Alna og Grorud området (145 bedrifter), der næringsparker gir plass til verksted og lager. Sentrum og Grünerløkka har 60 bedrifter, Frogner og vestkanten rundt 50.</p>
              <p>Bransjen er i sterk vekst. 160 bedrifter er stiftet de siste fem årene, og bare i 2025 ble det registrert 47 nye elektrikerbedrifter. Samtidig har 144 bedrifter over 20 års erfaring, inkludert bedrifter med røtter tilbake til 1914.</p>
            </div>
          </>) : (<>
            {/* ── GENERISK KOMMUNE ── */}
            <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i {kommune.navn} – hva du trenger å vite</h2>
            <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
              <p>{kommune.langTekst}</p>
              {antallBedrifter > 0 && <p>Elektrikerbransjen i {kommune.navn} teller {antallBedrifter} registrerte bedrifter under næringskode 43.210 (elektrisk installasjonsarbeid) ifølge Brønnøysundregistrene. Markedet spenner fra enkeltpersonforetak til etablerte elektroentreprenører.</p>}
            </div>
          </>)}
        </div></section>

        {/* ═══ BEDRIFTSOVERSIKT (kun Oslo) ═══ */}
        {isOslo && (
          <section className="section-subtle py-8 sm:py-12" aria-labelledby="bedrifter-heading">
            <div className="container-site max-w-4xl">
              <h2 id="bedrifter-heading" className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Elektrikerbedrifter i Oslo – komplett liste</h2>
              <p className="text-body-sm text-secondary-500 mb-6">Alle {antallBedrifter} bedrifter registrert under næringskode 43.210 i Brønnøysundregistrene. Offentlig tilgjengelig markedsinformasjon. Bedriftene er ikke tilknyttet Elspesialisten.</p>
              <BedriftOversikt bedrifter={OSLO_BEDRIFTER} kommune="Oslo" />
            </div>
          </section>
        )}

        {/* ═══ FAQ ═══ */}
        <section className={`${isOslo ? "section-white" : "section-subtle"} py-8 sm:py-12`}>
          <div className="container-site max-w-prose">
            <FAQ items={faqItems} tittel={`Vanlige spørsmål om elektriker i ${kommune.navn}`} showSchema={false} />
          </div>
        </section>

        {/* ═══ ELEKTRIKER I NÆRHETEN ═══ */}
        {relatertKommuner.length > 0 && (
          <section className={`${isOslo ? "section-subtle" : "section-white"} py-8 sm:py-10`}>
            <div className="container-site">
              <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Elektriker i nærheten av {kommune.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-5">Finner du ikke det du leter etter? Se elektrikere i nærliggende kommuner i {kommune.fylke}.</p>
              <div className="flex flex-wrap gap-2">
                {relatertKommuner.map((k) => {
                  const kAnt = ELEKTRIKER_PER_KOMMUNE[k.slug] || 0;
                  return (
                    <Link key={k.slug} href={`/kommune/${k.slug}`} className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">
                      Elektriker {k.navn}{kAnt > 0 && <span className="text-secondary-400 ml-1">({kAnt})</span>}
                    </Link>
                  );
                })}
                <Link href="/elektriker" className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">Alle kommuner <ChevronRight className="w-3 h-3" /></Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══ CTA ═══ */}
        <section className="py-8 sm:py-10">
          <div className="container-site"><div className="cta-block py-10">
            <h2 className="font-display font-extrabold text-display-lg text-white mb-3 text-balance">Kontakt elektriker i {kommune.navn}</h2>
            <p className="text-body-sm text-white/70 mb-5 max-w-md mx-auto">Send forespørsel og få tilbud fra kvalifiserte elektrikere i {kommune.navn}. Gratis og uforpliktende.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#tilbud" className="btn bg-white text-primary-600 text-cta-md px-8 py-3.5 rounded-12 hover:bg-primary-50 shadow-card-xl justify-center">Få gratis tilbud</Link>
              <a href="tel:+4780000000" className="btn border-2 border-white/40 text-white text-cta-md px-6 py-3.5 rounded-12 hover:bg-white/10 justify-center"><Phone className="w-4 h-4" aria-hidden />Ring oss nå</a>
            </div>
          </div></div>
        </section>

      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
