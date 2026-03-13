import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ElladerKalkulator from "@/components/calculators/ElladerKalkulator";
import SikringsskapeKalkulator from "@/components/calculators/SikringsskapeKalkulator";
import PrisKalkulator from "@/components/calculators/PrisKalkulator";

const KALKULATORER: Record<string, { tittel: string; seoTitle: string; seoDesc: string; component: React.ComponentType<{ className?: string }> }> = {
  elbillader: { tittel: "Elbillader kalkulator", seoTitle: "Elbillader kalkulator 2025 – Beregn pris", seoDesc: "Gratis elbillader kalkulator. Beregn pris på installasjon av ladeboks.", component: ElladerKalkulator },
  sikringsskap: { tittel: "Sikringsskap kalkulator", seoTitle: "Sikringsskap kalkulator – Bør du bytte?", seoDesc: "Gratis sikringsskap kalkulator.", component: SikringsskapeKalkulator },
  elektriker: { tittel: "Elektriker priskalkulator", seoTitle: "Elektriker priskalkulator 2025", seoDesc: "Beregn pris på elektrisk arbeid.", component: PrisKalkulator },
};

interface Props { params: Promise<{ slug: string }>; }
export async function generateStaticParams() { return Object.keys(KALKULATORER).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const k = KALKULATORER[slug]; if (!k) return {}; return { title: k.seoTitle, description: k.seoDesc, alternates: { canonical: `https://elspesialisten.no/kalkulator/${slug}` } }; }

export default async function KalkulatorSide({ params }: Props) {
  const { slug } = await params;
  const kalk = KALKULATORER[slug];
  if (!kalk) notFound();
  const Kalkulator = kalk.component;
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Kalkulatorer", href: "/kalkulator" }, { navn: kalk.tittel }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-12">
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">{kalk.tittel}</h1>
      <div className="max-w-xl mt-8"><Kalkulator /></div>
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
