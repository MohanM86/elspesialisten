import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { GUIDER } from "@/data/guider";

interface Props { params: Promise<{ slug: string }>; }
export async function generateStaticParams() { return GUIDER.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const guide = GUIDER.find((g) => g.slug === slug); if (!guide) return {}; return { title: `${guide.tittel} – Elspesialisten`, description: `${guide.tittel}: Komplett guide med priser, tips og ekspertråd.`, alternates: { canonical: `https://elspesialisten.no/guider/${slug}` } }; }

export default async function GuideSide({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDER.find((g) => g.slug === slug);
  if (!guide) notFound();
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Guider", href: "/guider" }, { navn: guide.tittel }]} /></div>
    <section className="section-gradient hero-pattern"><div className="container-site py-10 sm:py-14"><div className="max-w-3xl">
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4 text-balance">{guide.tittel}</h1>
      <p className="text-body-lg text-secondary-600">Denne guiden gir deg alt du trenger å vite. Kontakt oss for gratis tilbud.</p>
    </div></div></section>
    <section className="section-white section-py"><div className="container-site max-w-prose">
      <p className="text-body-md text-secondary-600 leading-relaxed mb-8">Innholdet til denne guiden er under utarbeidelse. Ta kontakt med oss for spørsmål, eller bestill gratis tilbud fra sertifiserte elektrikere.</p>
      <Link href="/kontakt" className="btn-primary">Bestill gratis tilbud <ArrowRight className="w-4 h-4" /></Link>
    </div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
