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
import { OSLO_BYDELER } from "@/data/oslo-bydeler";
import { BERGEN_BYDELER } from "@/data/bergen-bydeler";
import { BERGEN_BEDRIFTER } from "@/data/bedrifter/bergen";
import { TRONDHEIM_BEDRIFTER } from "@/data/bedrifter/trondheim";
import { STAVANGER_BEDRIFTER } from "@/data/bedrifter/stavanger";
import { KRISTIANSAND_BEDRIFTER } from "@/data/bedrifter/kristiansand";
import { DRAMMEN_BEDRIFTER } from "@/data/bedrifter/drammen";
import { FREDRIKSTAD_BEDRIFTER } from "@/data/bedrifter/fredrikstad";
import OsloTableOfContents from "@/components/oslo/OsloTableOfContents";
import CityTjenesterGrid from "@/components/city/CityTjenesterGrid";
import CityMarketChart from "@/components/city/CityMarketChart";
import CityPriceTable from "@/components/city/CityPriceTable";
import OsloEmergencyCards from "@/components/oslo/OsloEmergencyCards";
import OsloProblemCards from "@/components/oslo/OsloProblemCards";
import { AlertBox, FactBox, ChecklistBox } from "@/components/oslo/OsloVisualElements";
import { getCityConfig } from "@/data/city-configs";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() { return getAllKommuneSlugs().filter((s) => s !== "oslo" && s !== "bergen").map((slug) => ({ slug })); }

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

const BERGEN_FAQ = [
  { sporsmal: "Hva koster elektriker i Bergen?", svar: "Timeprisen for elektriker i Bergen ligger mellom 800 og 1 300 kr inkludert moms. Bergen har noe lavere prisnivå enn Oslo, men høyere enn landsgjennomsnittet. Utrykningsgebyr ligger typisk på 500 til 1 400 kr. Innhent alltid minst tre skriftlige tilbud." },
  { sporsmal: "Hvor mange elektrikerbedrifter finnes i Bergen?", svar: "Det er 208 bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Bergen ifølge Brønnøysundregistrene. 137 er aksjeselskap og 61 er enkeltpersonforetak. 58 bedrifter har registrerte ansatte, og bransjen sysselsetter over 1 500 personer i Bergen." },
  { sporsmal: "Hvor raskt kan elektriker komme i Bergen?", svar: "Ved akutte situasjoner som strømbrudd eller jordfeil kan døgnvakt elektriker i Bergen som regel være på plass innen 1 til 3 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager avhengig av sesong og bedrift." },
  { sporsmal: "Er sikringsskap i eldre trehus i Bergen ekstra utsatt?", svar: "Ja. Bergen har en av Norges største samlinger av eldre trehusbebyggelse, spesielt i Sandviken, Nordnes og Nygård. Gamle sikringsskap i trehus er en betydelig brannrisiko. Oppgradering koster mellom 22 000 og 40 000 kr og er en viktig brannforebyggende investering." },
  { sporsmal: "Kan jeg installere elbillader selv i Bergen?", svar: "Nei. All installasjon av ladeboks for elbil må utføres av autorisert elektriker. Elektrikeren melder arbeidet til BKK (netteier i Bergen) og sikrer at anlegget tåler belastningen. Installasjon i Bergen koster typisk mellom 10 000 og 30 000 kr." },
  { sporsmal: "Hva koster det å installere stikkontakt i Bergen?", svar: "Installasjon av en ny stikkontakt i Bergen koster typisk mellom 1 400 og 3 200 kr inkludert materiell. Prisen avhenger av om det finnes eksisterende kurs i nærheten eller om det må trekkes ny kabel." },
  { sporsmal: "Hva koster montering av spotter i Bergen?", svar: "Montering av downlights og spotter koster mellom 750 og 1 400 kr per punkt i Bergen. For et typisk rom med 6 til 8 spotter ligger totalprisen mellom 4 500 og 11 000 kr inkludert materiell og arbeid." },
  { sporsmal: "Når trenger jeg elkontroll i Bergen?", svar: "Elkontroll anbefales hvert 5. år for boliger eldre enn 20 år, ved kjøp og salg av bolig, og ved forsikringskrav. I Bergen er det spesielt viktig for eldre trehus der fukt kan påvirke det elektriske anlegget. En full elkontroll koster mellom 2 800 og 5 500 kr." },
  { sporsmal: "Hva gjør jeg ved strømbrudd i Bergen?", svar: "Sjekk først om problemet er lokalt. Sjekk sikringsskapet for utløste sikringer. Vedvarer problemet, kontakt BKK (netteier i Bergen) på 55 12 73 53 eller ring en døgnvakt elektriker." },
  { sporsmal: "Påvirker Bergensværet det elektriske anlegget?", svar: "Ja. Bergens høye nedbørsmengder og fuktighet kan gi ekstra utfordringer for elektriske anlegg, spesielt i eldre bygg. Fukt kan forårsake jordfeil og korrosjon i koblingsbokser. Regelmessig elkontroll er ekstra viktig i Bergen." },
  { sporsmal: "Hva koster oppgradering av elektrisk anlegg i Bergen?", svar: "En full oppgradering i leilighet i Bergen koster mellom 70 000 og 160 000 kr. For enebolig kan prisen ligge mellom 100 000 og 250 000 kr. Prisen inkluderer nytt sikringsskap, nye kurser og utskifting av eldre kabler." },
  { sporsmal: "Er det lovlig å bytte lyspærer og stikkontaktdeksler selv?", svar: "Du kan bytte lyspærer, sette inn støpsler og bytte deksel på stikkontakter og brytere. Alt annet arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette gjelder i hele Norge, også i Bergen." },
];

const TRONDHEIM_FAQ = [
  { sporsmal: "Hva koster elektriker i Trondheim?", svar: "Timeprisen for elektriker i Trondheim ligger mellom 750 og 1 200 kr inkludert moms. Trondheim har noe lavere prisnivå enn Oslo og Bergen. Utrykningsgebyr ligger typisk på 450 til 1 300 kr. Innhent alltid minst tre skriftlige tilbud." },
  { sporsmal: "Hvor mange elektrikerbedrifter finnes i Trondheim?", svar: "Det er 139 bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Trondheim ifølge Brønnøysundregistrene. 88 er aksjeselskap og 46 er enkeltpersonforetak. 35 bedrifter har registrerte ansatte, og bransjen sysselsetter over 1 200 personer i Trondheim." },
  { sporsmal: "Hvor raskt kan elektriker komme i Trondheim?", svar: "Ved akutte situasjoner som strømbrudd eller jordfeil kan døgnvakt elektriker i Trondheim som regel være på plass innen 1 til 3 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager." },
  { sporsmal: "Er smarthus populært i Trondheim?", svar: "Ja. Trondheim er Norges teknologihovedstad med NTNU og SINTEF som drivkrefter. Etterspørselen etter smarthusinstallasjon er høy, spesielt KNX og Matter baserte systemer. Grunnpakke fra 10 000 kr, komplett system 40 000 til 100 000 kr." },
  { sporsmal: "Kan jeg installere elbillader selv i Trondheim?", svar: "Nei. All installasjon av ladeboks for elbil må utføres av autorisert elektriker. Elektrikeren melder arbeidet til Tensio (netteier i Trondheim) og sikrer at anlegget tåler belastningen. Installasjon i Trondheim koster typisk mellom 9 000 og 28 000 kr." },
  { sporsmal: "Hva koster det å bytte sikringsskap i Trondheim?", svar: "Oppgradering av sikringsskap i Trondheim koster mellom 20 000 og 38 000 kr avhengig av antall kurser og boligens størrelse. Mange boliger på Lerkendal, Ila og i Midtbyen har eldre skap som bør byttes." },
  { sporsmal: "Hva koster montering av spotter i Trondheim?", svar: "Montering av downlights og spotter koster mellom 700 og 1 300 kr per punkt i Trondheim. Med lang mørketid er god belysning ekstra viktig. For et typisk rom med 6 til 8 spotter: 4 200 til 10 400 kr totalt." },
  { sporsmal: "Når trenger jeg elkontroll i Trondheim?", svar: "Elkontroll anbefales hvert 5. år for boliger eldre enn 20 år, ved boligkjøp og salg, og etter forsikringskrav. I Trondheim koster en full elkontroll mellom 2 500 og 5 000 kr. Spesielt viktig i eldre murgårder og trehus i sentrum." },
  { sporsmal: "Hva gjør jeg ved strømbrudd i Trondheim?", svar: "Sjekk først om problemet er lokalt. Sjekk sikringsskapet for utløste sikringer. Vedvarer problemet, kontakt Tensio (netteier i Trondheim) på 815 44 111 eller ring en døgnvakt elektriker." },
  { sporsmal: "Påvirker kulde det elektriske anlegget?", svar: "Ja. Trondheims kalde vintre med temperatursvingninger kan belaste eldre elektriske anlegg. Kulde kan forårsake sprøhet i eldre kabler og gi dårligere kontakt i koblingspunkter. Regelmessig elkontroll er viktig." },
  { sporsmal: "Hva koster oppgradering av elektrisk anlegg i Trondheim?", svar: "En full oppgradering i leilighet i Trondheim koster mellom 65 000 og 150 000 kr. For enebolig kan prisen ligge mellom 95 000 og 230 000 kr. Prisen inkluderer nytt sikringsskap, nye kurser og utskifting av eldre kabler." },
  { sporsmal: "Er det lovlig å bytte lyspærer og stikkontaktdeksler selv?", svar: "Du kan bytte lyspærer, sette inn støpsler og bytte deksel på stikkontakter og brytere. Alt annet arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette gjelder i hele Norge, også i Trondheim." },
];

/* ═══ GENERERER FAQ FOR KONFIG-BYER (Stavanger, Kristiansand, Drammen, Fredrikstad) ═══ */
function buildCityFAQ(navn: string, antall: number, cfg: { netteier: string; priser: { tjeneste: string; prisMin: number; prisMax: number }[] }) {
  const p = (t: string) => cfg.priser.find((x) => x.tjeneste.includes(t));
  const tim = p("timepris"); const sik = p("sikringsskap"); const lad = p("elbillader"); const elk = p("Elkontroll"); const spo = p("spotter"); const opp = p("oppgradering");
  return [
    { sporsmal: `Hva koster elektriker i ${navn}?`, svar: `Timeprisen for elektriker i ${navn} ligger mellom ${tim?.prisMin || 700} og ${tim?.prisMax || 1200} kr inkludert moms. Utrykningsgebyr kommer i tillegg. Innhent alltid minst tre skriftlige tilbud.` },
    { sporsmal: `Hvor mange elektrikerbedrifter finnes i ${navn}?`, svar: `Det er ${antall} bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i ${navn} ifølge Brønnøysundregistrene.` },
    { sporsmal: `Hvor raskt kan elektriker komme i ${navn}?`, svar: `Ved akutte situasjoner kan døgnvakt elektriker i ${navn} som regel være på plass innen 1 til 3 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager.` },
    { sporsmal: `Hva koster det å bytte sikringsskap i ${navn}?`, svar: `Oppgradering av sikringsskap i ${navn} koster mellom ${sik?.prisMin || 20000} og ${sik?.prisMax || 38000} kr avhengig av antall kurser og boligens størrelse.` },
    { sporsmal: `Kan jeg installere elbillader selv i ${navn}?`, svar: `Nei. All installasjon av ladeboks for elbil må utføres av autorisert elektriker. Elektrikeren melder arbeidet til ${cfg.netteier} (netteier i ${navn}). Installasjon koster typisk mellom ${lad?.prisMin || 9000} og ${lad?.prisMax || 28000} kr.` },
    { sporsmal: `Hva koster montering av spotter i ${navn}?`, svar: `Montering koster mellom ${spo?.prisMin || 700} og ${spo?.prisMax || 1300} kr per punkt. For et rom med 6 til 8 spotter ligger totalprisen mellom ${(spo?.prisMin || 700) * 6} og ${(spo?.prisMax || 1300) * 8} kr.` },
    { sporsmal: `Når trenger jeg elkontroll i ${navn}?`, svar: `Elkontroll anbefales hvert 5. år for boliger eldre enn 20 år, ved kjøp og salg, og ved forsikringskrav. I ${navn} koster en full elkontroll mellom ${elk?.prisMin || 2500} og ${elk?.prisMax || 5000} kr.` },
    { sporsmal: `Hva gjør jeg ved strømbrudd i ${navn}?`, svar: `Sjekk først om problemet er lokalt. Sjekk sikringsskapet for utløste sikringer. Vedvarer problemet, kontakt ${cfg.netteier} (netteier i ${navn}) eller ring en døgnvakt elektriker.` },
    { sporsmal: `Hva koster oppgradering av elektrisk anlegg i ${navn}?`, svar: `En full oppgradering i leilighet i ${navn} koster mellom ${opp?.prisMin || 65000} og ${opp?.prisMax || 145000} kr. For enebolig kan prisen bli høyere. Prisen inkluderer nytt sikringsskap, nye kurser og utskifting av eldre kabler.` },
    { sporsmal: `Hvordan finner jeg en god elektriker i ${navn}?`, svar: `Sjekk at elektrikeren er registrert i DSBs Elvirksomhetsregister. Be om referanser og sammenlign alltid flere tilbud. En seriøs elektriker gir deg skriftlig tilbud med spesifisert materiell og arbeidskostnad.` },
    { sporsmal: `Kan jeg gjøre elektrisk arbeid selv?`, svar: `Du kan bytte lyspærer og sette inn støpsler. Alt arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette gjelder i hele Norge, også i ${navn}.` },
  ];
}

export default async function KommuneSide({ params }: Props) {
  const { slug } = await params;
  const kommune = getKommune(slug);
  if (!kommune) notFound();
  const naboKommuner = getKommunerByFylke(kommune.fylkeSlug).filter((k) => k.slug !== slug);
  const relatertKommuner = naboKommuner.length > 0 ? naboKommuner.slice(0, 8) : getKommunerByFylke("akershus").slice(0, 8);
  const antallBedrifter = ELEKTRIKER_PER_KOMMUNE[slug] || 0;
  const isOslo = slug === "oslo";
  const isBergen = slug === "bergen";
  const isTrondheim = slug === "trondheim";
  const isStavanger = slug === "stavanger";
  const isKristiansand = slug === "kristiansand";
  const isDrammen = slug === "drammen";
  const isFredrikstad = slug === "fredrikstad";
  const isRichCity = !!(getCityConfig(slug));
  const cityConfig = getCityConfig(slug);
  const BEDRIFTER_MAP: Record<string, any[]> = { oslo: OSLO_BEDRIFTER, bergen: BERGEN_BEDRIFTER, trondheim: TRONDHEIM_BEDRIFTER, stavanger: STAVANGER_BEDRIFTER, kristiansand: KRISTIANSAND_BEDRIFTER, drammen: DRAMMEN_BEDRIFTER, fredrikstad: FREDRIKSTAD_BEDRIFTER };
  const bedrifterData = BEDRIFTER_MAP[slug] || [];

  /* ─── Generic FAQ for non-Oslo ─── */
  const genericFAQ = [
    { sporsmal: `Hva koster elektriker i ${kommune.navn}?`, svar: `Timeprisen for elektriker i ${kommune.navn} ligger typisk mellom 750 og 1 200 kr inkludert moms. Prisen avhenger av oppdragstype, tidspunkt og kompleksitet. Innhent minst tre skriftlige tilbud for å sammenligne.` },
    { sporsmal: `Hvor mange elektrikerbedrifter finnes i ${kommune.navn}?`, svar: `I ${kommune.navn} er det ${antallBedrifter > 0 ? antallBedrifter : "flere"} bedrifter registrert under næringskode 43.210 (elektrisk installasjonsarbeid) i Brønnøysundregistrene.` },
    { sporsmal: `Hvor raskt kan elektriker komme i ${kommune.navn}?`, svar: `Ved akutte situasjoner kan døgnvakt elektriker i ${kommune.navn} som regel komme innen 1 til 4 timer. For planlagte oppdrag bør du regne med 1 til 5 virkedager.` },
    { sporsmal: `Hvordan finner jeg en god elektriker i ${kommune.navn}?`, svar: `Sjekk at elektrikeren er registrert i DSBs Elvirksomhetsregister. Be om referanser og sammenlign alltid flere tilbud. En seriøs elektriker gir deg skriftlig tilbud med spesifisert materiell og arbeidskostnad.` },
    { sporsmal: `Kan jeg gjøre elektrisk arbeid selv?`, svar: `Du kan bytte lyspærer og sette inn støpsler. Alt arbeid på fast elektrisk installasjon krever autorisert elektriker. Dette gjelder i hele Norge, også i ${kommune.navn}.` },
  ];

  const faqItems = isOslo ? OSLO_FAQ : isBergen ? BERGEN_FAQ : isTrondheim ? TRONDHEIM_FAQ : (isRichCity && cityConfig) ? buildCityFAQ(kommune.navn, antallBedrifter, cityConfig) : genericFAQ;

  /* ─── City-specific content strings ─── */
  const CITY_CONTENT: Record<string, { hero: string; intro2: string; factExtra: string; laderIntro: string; laderPris: string; marketIntro: string; marketGrowth: string; factBottom: string; factEmoji: string }> = {
    oslo: {
      hero: "Trenger du elektriker i Oslo? Vi hjelper deg å finne riktig fagperson til jobben. Enten det gjelder installasjon av elbillader, oppgradering av sikringsskap, feilsøking av strøm eller akutt hjelp med strømbrudd, så finnes det over 500 elektrikerbedrifter i hovedstaden.",
      intro2: "Du trenger elektriker når du skal installere elbillader, bytte sikringsskap, montere nye lyspunkt eller spotter, oppgradere det elektriske anlegget, installere smarthussystem, utføre elkontroll, eller når du opplever strømproblemer som jordfeil, kortslutning eller strømbrudd.",
      factExtra: "Med over 17 000 sysselsatte er konkurransen høy, noe som gir deg som forbruker gode muligheter til å sammenligne pris og kvalitet.",
      laderIntro: "Elbillading hjemme er den enkleste og billigste måten å lade bilen. I Oslo der elbiltettheten er blant Europas høyeste, er etterspørselen etter ladeboksinstallasjon enorm. En autorisert elektriker sørger for at installasjonen er trygg og at anlegget tåler belastningen.",
      laderPris: "Priser i Oslo: enkel installasjon i enebolig med kort avstand til sikringsskap koster fra 12 000 kr. Installasjon i borettslag med lang kabelføring og lastbalansering kan koste mellom 20 000 og 35 000 kr per enhet.",
      marketIntro: "Oslo er Norges suverent største marked for elektrikertjenester. Bransjen spenner fra store nasjonale entreprenører som Bravida, GK Norge og Caverion med hovedkontor i Oslo, til lokale spesialister i hver bydel.",
      marketGrowth: "Bransjen er i sterk vekst. 160 bedrifter er stiftet de siste fem årene, og bare i 2025 ble det registrert 47 nye elektrikerbedrifter. Samtidig har 144 bedrifter over 20 års erfaring, inkludert bedrifter med røtter tilbake til 1914.",
      factBottom: "Flest bedrifter holder til i Alna og Grorud (145 bedrifter), der næringsparker gir plass til verksted og lager. Sentrum og Grünerløkka har 60 bedrifter, Frogner og vestkanten rundt 50.",
      factEmoji: "📈",
    },
    bergen: {
      hero: "Trenger du elektriker i Bergen? Fra trehusbebyggelsen i Sandviken til nye prosjekter på Damsgård – vi kobler deg med autoriserte elektrikere i hele Bergen. 208 registrerte bedrifter gir deg gode muligheter til å sammenligne pris og kvalitet.",
      intro2: "Bergen har spesielle utfordringer knyttet til eldre trehusbebyggelse, høy nedbør og fuktbelastning som stiller ekstra krav til elektriske anlegg. Riktig vedlikehold og oppgradering er avgjørende for brannsikkerhet og trygg strømforsyning.",
      factExtra: "Med over 1 500 sysselsatte er Bergen Vestlandets klart største marked for elektrotjenester.",
      laderIntro: "Bergen har en raskt voksende elbilpark, og hjemmelading er den mest praktiske løsningen. Med bratt terreng og mange borettslag har Bergen spesielle utfordringer knyttet til kabelføring og lastbalansering. En autorisert elektriker sørger for trygg installasjon.",
      laderPris: "Priser i Bergen: enkel installasjon i enebolig koster fra 10 000 kr. Installasjon i borettslag med lang kabelføring koster mellom 18 000 og 30 000 kr per enhet. Mange eldre borettslag i Bergen trenger oppgradering av hovedsikring i tillegg.",
      marketIntro: "Bergen er Vestlandets desidert største marked for elektrikertjenester og Norges nest største totalt sett. Bransjen spenner fra store regionale aktører som AF Elkraft og BMO Elektro til spesialiserte lokale firmaer i hver bydel.",
      marketGrowth: "Bransjen i Bergen vokser raskt. 91 bedrifter er stiftet de siste fem årene, og 25 nye ble registrert i 2025 alene. Samtidig har 51 bedrifter over 20 års erfaring, med Bergen Elektroservice (grunnlagt 1985) som en av de eldste aktive.",
      factBottom: "Bergens klima med høy nedbør og fuktighet gir ekstra utfordringer for elektriske anlegg. Regelmessig elkontroll er viktigere her enn i mange andre norske byer. Flest bedrifter holder til i Åsane og Arna (82 bedrifter).",
      factEmoji: "🌧️",
    },
    trondheim: {
      hero: "Trenger du elektriker i Trondheim? Fra murgårdene i Midtbyen til studentboligene på Moholt – vi kobler deg med autoriserte elektrikere i hele Trondheim. 139 registrerte bedrifter og over 1 200 ansatte i bransjen.",
      intro2: "Trondheim er Norges teknologihovedstad med NTNU og SINTEF som drivkrefter for innovasjon. Byen har en blanding av eldre murgårder i Midtbyen, trehusbebyggelse på Bakklandet og moderne boligprosjekter på Brøset og Lade. Kulde og temperatursvingninger stiller ekstra krav til elektriske anlegg.",
      factExtra: "Med over 1 200 sysselsatte er Trondheim Trøndelags klart største marked. NTNU-miljøet driver innovasjon innen smarthus og energistyring.",
      laderIntro: "Trondheim har en av Norges høyeste elbiltettheter utenfor Oslo-regionen, og hjemmelading er den mest praktiske løsningen. Mange av byens borettslag på Flatåsen, Saupstad og Byåsen trenger fellesløsninger med lastbalansering. En autorisert elektriker sørger for trygg installasjon.",
      laderPris: "Priser i Trondheim: enkel installasjon i enebolig koster fra 9 000 kr. Installasjon i borettslag med lang kabelføring koster mellom 16 000 og 28 000 kr per enhet. Arbeidet meldes til Tensio som er netteier i Trondheim.",
      marketIntro: "Trondheim er Trøndelags desidert største marked for elektrikertjenester og Norges tredje største. Bransjen ledes av Vintervoll (221 ansatte), Fjeldseth (142 ansatte) og Elteam (102 ansatte), med en god blanding av store entreprenører og lokale spesialister.",
      marketGrowth: "Bransjen i Trondheim vokser jevnt. 43 bedrifter er stiftet de siste fem årene, og 12 nye ble registrert i 2025. Samtidig har 33 bedrifter over 20 års erfaring, med Argon Elektro (grunnlagt 1960) som den eldste aktive elektrikerbedriften i byen.",
      factBottom: "Trondheims teknologimiljø med NTNU og SINTEF gjør byen til et foregangsområde for smarthus og energieffektivisering. Nesten alle 139 bedrifter holder til i sentrale Trondheim (postnummer 70xx), med Heimdal og Tiller som populære næringsområder.",
      factEmoji: "🎓",
    },
    stavanger: {
      hero: "Trenger du elektriker i Stavanger? Fra Gamle Stavanger til Forus næringspark – vi kobler deg med autoriserte elektrikere i hele Stavanger. 101 registrerte bedrifter og over 1 000 ansatte i bransjen.",
      intro2: "Stavanger er oljebyen med høy kjøpekraft og et aktivt boligmarked. Byen har en unik blanding av verneverdig trehusbebyggelse i sentrum og moderne næringsbygg på Forus. Kystklima med salt og fukt stiller ekstra krav til elektriske anlegg.",
      factExtra: "Med over 1 000 sysselsatte er Stavanger Rogalands største marked. Høy kjøpekraft driver etterspørselen etter premium elektrotjenester.",
      laderIntro: "Stavanger-regionen har høy elbiltetthet drevet av god økonomi og bevisste forbrukere. Mange eneboliger i Madla, Tasta og Hinna har garasje som egner seg godt for hjemmelading. En autorisert elektriker sørger for trygg installasjon.",
      laderPris: "Priser i Stavanger: enkel installasjon i enebolig koster fra 10 000 kr. Installasjon i borettslag koster mellom 18 000 og 30 000 kr per enhet. Arbeidet meldes til Lnett som er netteier i Stavanger.",
      marketIntro: "Stavanger er Rogalands klart største marked for elektrikertjenester. Bransjen ledes av Rønning Elektro (233 ansatte, grunnlagt 1967), Blu Electro (224 ansatte) og Rogaland Elektro (118 ansatte).",
      marketGrowth: "Bransjen i Stavanger vokser jevnt. 36 bedrifter er stiftet de siste fem årene, og 6 nye ble registrert i 2025. 26 bedrifter har over 20 års erfaring, med Rønning Elektro (grunnlagt 1967) som den eldste aktive.",
      factBottom: "De fleste bedrifter holder til i sentrale Stavanger (postnummer 40xx). Forus og Gausel er populære næringsområder. Oljenæringen skaper stabil etterspørsel etter elektrisk kompetanse.",
      factEmoji: "🛢️",
    },
    kristiansand: {
      hero: "Trenger du elektriker i Kristiansand? Fra Posebyen til Vågsbygd – vi kobler deg med autoriserte elektrikere i hele Kristiansand. 101 registrerte bedrifter dekker alle typer elektriske oppdrag.",
      intro2: "Kristiansand er Sørlandets hovedstad med et aktivt boligmarked og mange fritidsboliger i nærområdet. Byen har eldre trehusbebyggelse i Posebyen og sentrum, og kystklima med salt og fukt som kan påvirke elektriske anlegg.",
      factExtra: "Med nesten 700 sysselsatte er Kristiansand Agders klart største marked for elektrotjenester.",
      laderIntro: "Kristiansand har en voksende elbilpark, og hjemmelading er den mest praktiske løsningen. Mange eneboliger i Vågsbygd, Sødal og Gimlekollen har gode forutsetninger for hjemmelader.",
      laderPris: "Priser i Kristiansand: enkel installasjon i enebolig koster fra 9 000 kr. Installasjon i borettslag koster mellom 16 000 og 28 000 kr per enhet. Arbeidet meldes til Agder Energi Nett.",
      marketIntro: "Kristiansand er Agders største marked for elektrikertjenester. Bransjen ledes av On & Offshore Services (158 ansatte), Elektroxperten (111 ansatte) og Avitell (110 ansatte, grunnlagt 1978).",
      marketGrowth: "34 bedrifter er stiftet de siste fem årene, og 7 nye ble registrert i 2025. 26 bedrifter har over 20 års erfaring. Sommerbyen har også høy sesongetterspørsel knyttet til fritidsboliger.",
      factBottom: "Alle 101 bedrifter holder til innenfor postnummerområde 46xx. Posebyen og Lund er populære områder for oppussingsprosjekter som krever elektriker.",
      factEmoji: "☀️",
    },
    drammen: {
      hero: "Trenger du elektriker i Drammen? Fra Bragernes til Konnerud – vi kobler deg med autoriserte elektrikere i hele Drammen. 104 registrerte bedrifter og over 1 000 ansatte i bransjen.",
      intro2: "Drammen er en by i sterk vekst med massiv byfornyelse langs Drammenselva. Mange nye leilighetsprosjekter kombinert med eldre boligmasse fra etterkrigstiden på Konnerud og Åssiden skaper stor etterspørsel etter elektrikertjenester.",
      factExtra: "Med over 1 000 sysselsatte er Drammen Buskeruds klart største marked. Byfornyelsen driver etterspørselen.",
      laderIntro: "Drammen har en stor og voksende elbilpark drevet av nærhet til Oslo og gode pendlermuligheter. Mange eneboliger på Konnerud, Åssiden og Gulskogen har garasje for hjemmelading.",
      laderPris: "Priser i Drammen: enkel installasjon i enebolig koster fra 9 000 kr. Installasjon i borettslag koster mellom 16 000 og 28 000 kr per enhet. Arbeidet meldes til Glitre Nett.",
      marketIntro: "Drammen er Buskeruds klart største marked for elektrikertjenester. Bransjen ledes av Powertech (266 ansatte), Ingeniør Ivar Pettersen (236 ansatte) og Abicon Elektro (76 ansatte).",
      marketGrowth: "34 bedrifter er stiftet de siste fem årene, og 10 nye ble registrert i 2025. 30 bedrifter har over 20 års erfaring, med AS Mjøndalen Installasjon (grunnlagt 1967) som den eldste aktive.",
      factBottom: "Alle 104 bedrifter holder til innenfor postnummerområde 30xx. Byfornyelsen langs Drammenselva og nye prosjekter på Gulskogen og Brakerøya driver sterk vekst i bransjen.",
      factEmoji: "🏗️",
    },
    fredrikstad: {
      hero: "Trenger du elektriker i Fredrikstad? Fra Gamlebyen til Selbak – vi kobler deg med autoriserte elektrikere i hele Fredrikstad. 79 registrerte bedrifter dekker alle typer oppdrag.",
      intro2: "Fredrikstad er Østfolds største by med en blanding av eldre industribebyggelse, etterkrigsboliger og nye prosjekter langs Glomma. Mange boliger fra 1950 til 1980 tallet har elektriske anlegg som trenger oppgradering.",
      factExtra: "Med nesten 400 sysselsatte er Fredrikstad Østfolds største marked for elektrotjenester.",
      laderIntro: "Fredrikstad har en voksende elbilpark, og mange eneboliger på Selbak, Lisleby og Gressvik har gode forutsetninger for hjemmelader med garasje eller carport.",
      laderPris: "Priser i Fredrikstad: enkel installasjon i enebolig koster fra 8 000 kr. Installasjon i borettslag koster mellom 15 000 og 25 000 kr per enhet. Arbeidet meldes til Elvia som er netteier.",
      marketIntro: "Fredrikstad er Østfolds største marked for elektrikertjenester. Bransjen ledes av Installatøren Fredrikstad (134 ansatte), Storm Elektro (107 ansatte) og ZK Elektro (34 ansatte).",
      marketGrowth: "31 bedrifter er stiftet de siste fem årene, men bare 2 nye i 2025. 15 bedrifter har over 20 års erfaring, med Slevik Elektriske (grunnlagt 1991) som en av de mest etablerte.",
      factBottom: "Alle 79 bedrifter holder til innenfor postnummerområde 16xx. Gamlebyen og Værste-området har mye oppussingsaktivitet som krever elektrikerkompetanse.",
      factEmoji: "🏭",
    },
  };
  const cc = CITY_CONTENT[slug];

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
              <p className="text-body-md text-secondary-600 mb-4">{cc?.hero || kommune.kortTekst}</p>
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

        {/* ═══ STICKY TOC (rich cities, desktop) ═══ */}
        {isRichCity && <OsloTableOfContents />}

        {/* ═══ HOVEDINNHOLD ═══ */}
        <section className="section-white py-8 sm:py-12"><div className="container-site max-w-4xl">

          {isRichCity && cityConfig ? (<>
            {/* ═══════════════════════════════════════════
                RICH CITY ARTICLE (Oslo, Bergen, ...)
                2500+ ord med visuelle elementer
            ═══════════════════════════════════════════ */}

            <div className="max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i {kommune.navn} – komplett oversikt</h2>
              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
                <p>En elektriker utfører alt arbeid knyttet til elektriske installasjoner i boliger, næringsbygg og industri. I Norge er det lovpålagt at alt arbeid på fast elektrisk anlegg utføres av autorisert elektriker registrert hos Direktoratet for samfunnssikkerhet og beredskap (DSB). Dette gjelder alt fra installasjon av en ny stikkontakt til komplett oppgradering av et helt elektrisk anlegg.</p>
                {cc && <p>{cc.intro2}</p>}
              </div>

              <FactBox>{kommune.navn} har {antallBedrifter} registrerte elektrikerbedrifter under næringskode 43.210. {cc?.factExtra || ""}</FactBox>
            </div>

            {/* ── TJENESTER: Interactive grid ── */}
            <div id="tjenester" className="scroll-mt-24 mt-12">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2 max-w-prose mx-auto">Elektrikertjenester i {kommune.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-6 max-w-prose mx-auto">Klikk på en tjeneste for å se mer informasjon og bestille tilbud.</p>
              <CityTjenesterGrid tjenester={cityConfig.tjenester} />
            </div>

            {/* ── ELBILLADER ── */}
            <div id="elbillader" className="scroll-mt-24 mt-14 max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Installere ladeboks i {kommune.navn}</h2>
              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
                {cc && <p>{cc.laderIntro}</p>}
              </div>

              <ChecklistBox title="Krav til installasjon" items={[
                "Ladeboksen må monteres av autorisert elektriker",
                "Anlegget må ha tilstrekkelig kapasitet (minimum 32A kurs for 7,4 kW lading)",
                "Det skal installeres egen jordfeilbryter type B",
                `Arbeidet skal meldes til ${cityConfig.netteier} (netteier i ${kommune.navn})`,
                "For borettslag og sameier kreves styremøtevedtak og ofte fellesløsning med lastbalansering",
              ]} />

              <AlertBox type="danger" title="Sikkerhet er avgjørende">
                Feil installasjon kan føre til brann eller overbelastning. Bruk aldri skjøteledning eller vanlig stikkontakt til permanent elbillading. Ladeboksen skal ha egen dedikert kurs fra sikringsskapet.
              </AlertBox>

              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
                {cc && <p>{cc.laderPris}</p>}
              </div>
            </div>

            {/* ── DØGNVAKT: Emergency cards ── */}
            <div id="dognvakt" className="scroll-mt-24 mt-14 max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Døgnvakt elektriker i {kommune.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-4">Noen elektriske problemer kan ikke vente. Klikk for detaljer og handlingsråd.</p>
              <OsloEmergencyCards />
            </div>

            {/* ── VANLIGE PROBLEMER ── */}
            <div id="problemer" className="scroll-mt-24 mt-14 max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Vanlige elektriske problemer i {kommune.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-4">Klikk på et problem for å se årsak og anbefalt løsning.</p>
              <OsloProblemCards />
            </div>

            {/* ── PRISER: Visual interactive table ── */}
            <div id="priser" className="scroll-mt-24 mt-14 max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Pris elektriker i {kommune.navn} – prisguide 2026</h2>
              <p className="text-body-sm text-secondary-500 mb-1">Hold musen over en rad for å se prisintervallet visuelt.</p>
              <CityPriceTable priser={cityConfig.priser} cityName={kommune.navn} />
            </div>

            {/* ── MARKED: Chart + data visualization ── */}
            <div id="marked" className="scroll-mt-24 mt-14 max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Markedet for elektrikertjenester i {kommune.navn}</h2>
              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
                {cc && <p>{cc.marketIntro}</p>}
              </div>
              <CityMarketChart data={cityConfig.market} cityName={kommune.navn} />
              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4 mt-4">
                {cc && <p>{cc.marketGrowth}</p>}
              </div>

              {cc && <FactBox emoji={cc.factEmoji}>{cc.factBottom}</FactBox>}
            </div>

          </>) : (<>
            {/* ── GENERISK KOMMUNE ── */}
            <div className="max-w-prose mx-auto">
              <h2 className="font-display font-bold text-heading-xl text-secondary-950 mb-4">Elektriker i {kommune.navn} – hva du trenger å vite</h2>
              <div className="text-body-md text-secondary-600 leading-relaxed space-y-4">
                <p>{kommune.langTekst}</p>
                {antallBedrifter > 0 && <p>Elektrikerbransjen i {kommune.navn} teller {antallBedrifter} registrerte bedrifter under næringskode 43.210 (elektrisk installasjonsarbeid) ifølge Brønnøysundregistrene. Markedet spenner fra enkeltpersonforetak til etablerte elektroentreprenører.</p>}
              </div>
            </div>
          </>)}
        </div></section>

        {/* ═══ BEDRIFTSOVERSIKT (rich cities) ═══ */}
        {isRichCity && bedrifterData.length > 0 && (
          <section id="bedrifter" className="scroll-mt-24 section-subtle py-8 sm:py-12" aria-labelledby="bedrifter-heading">
            <div className="container-site max-w-4xl">
              <h2 id="bedrifter-heading" className="font-display font-bold text-heading-xl text-secondary-950 mb-2">Elektrikerbedrifter i {kommune.navn} – komplett liste</h2>
              <p className="text-body-sm text-secondary-500 mb-6">Alle {antallBedrifter} bedrifter registrert under næringskode 43.210 i Brønnøysundregistrene. Offentlig tilgjengelig markedsinformasjon. Bedriftene er ikke tilknyttet Elspesialisten.</p>
              <BedriftOversikt bedrifter={bedrifterData} kommune={kommune.navn} />
            </div>
          </section>
        )}

        {/* ═══ FAQ ═══ */}
        <section id="faq" className={`scroll-mt-24 ${isRichCity ? "section-white" : "section-subtle"} py-8 sm:py-12`}>
          <div className="container-site max-w-prose">
            <FAQ items={faqItems} tittel={`Vanlige spørsmål om elektriker i ${kommune.navn}`} showSchema={false} />
          </div>
        </section>

        {/* ═══ OSLO: BYDELER ═══ */}
        {isOslo && (
          <section className="section-subtle py-8 sm:py-10">
            <div className="container-site">
              <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Elektriker i Oslos bydeler</h2>
              <p className="text-body-sm text-secondary-500 mb-5">Se elektrikere og bedrifter i din bydel i Oslo.</p>
              <div className="flex flex-wrap gap-2">
                {OSLO_BYDELER.map((b) => {
                  const bAnt = OSLO_BEDRIFTER.filter((bed) => { const p = parseInt(bed.p, 10); return !isNaN(p) && b.postRanges.some(([lo, hi]) => p >= lo && p <= hi); }).length;
                  return (
                    <Link key={b.slug} href={`/kommune/oslo/${b.slug}`} className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">
                      {b.navn}{bAnt > 0 && <span className="text-secondary-400 ml-1">({bAnt})</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══ BERGEN: BYDELER ═══ */}
        {isBergen && (
          <section className="section-subtle py-8 sm:py-10">
            <div className="container-site">
              <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Elektriker i Bergens bydeler</h2>
              <p className="text-body-sm text-secondary-500 mb-5">Se elektrikere og bedrifter i din bydel i Bergen.</p>
              <div className="flex flex-wrap gap-2">
                {BERGEN_BYDELER.map((b) => {
                  const bAnt = BERGEN_BEDRIFTER.filter((bed) => { const p = parseInt(bed.p, 10); return !isNaN(p) && b.postRanges.some(([lo, hi]) => p >= lo && p <= hi); }).length;
                  return (
                    <Link key={b.slug} href={`/kommune/bergen/${b.slug}`} className="badge-neutral hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors">
                      {b.navn}{bAnt > 0 && <span className="text-secondary-400 ml-1">({bAnt})</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══ ELEKTRIKER I NÆRHETEN (andre byer) ═══ */}
        {!isOslo && !isBergen && relatertKommuner.length > 0 && (
          <section className={`${isRichCity ? "section-subtle" : "section-white"} py-8 sm:py-10`}>
            <div className="container-site">
              <h2 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Elektriker i nærheten av {kommune.navn}</h2>
              <p className="text-body-sm text-secondary-500 mb-5">Finner du ikke det du leter etter? Se elektrikere i nærliggende kommuner{naboKommuner.length > 0 ? ` i ${kommune.fylke}` : ""}.</p>
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
