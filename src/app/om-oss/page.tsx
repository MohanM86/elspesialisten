import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, MapPin, Award, CheckCircle, ArrowRight, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Om Elspesialisten – Norges ledende elektrikerplattform", description: "Elspesialisten er Norges ledende plattform for å finne sertifiserte elektrikere.", alternates: { canonical: "https://elspesialisten.no/om-oss" } };

export default function OmOss() {
  return (<><Header /><main id="main-content">
    <div className="container-site pt-5 pb-2"><Breadcrumb items={[{ navn: "Om oss" }]} /></div>
    <section className="section-primary-gradient section-py-sm"><div className="container-site text-center">
      <h1 className="font-display font-extrabold text-display-xl text-white mb-4 text-balance">Norges ledende plattform for elektriker</h1>
      <p className="text-body-lg text-primary-100 max-w-2xl mx-auto">Elspesialisten kobler privatpersoner, borettslag og bedrifter med sertifiserte elektrikere i hele Norge, raskt, trygt og gratis.</p>
    </div></section>
    <section className="section-white section-py-sm"><div className="container-site py-10"><div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-neutral-200">
      {[{ verdi: "4 800+", label: "Fornøyde kunder" },{ verdi: "340+", label: "Kommuner dekket" },{ verdi: "4.9/5", label: "Snittkarakter" },{ verdi: "98%", label: "Anbefaler oss" }].map(({ verdi, label }) => (<div key={label} className="text-center lg:px-8"><div className="font-display font-extrabold text-display-xl text-primary-600 mb-1">{verdi}</div><div className="text-body-sm text-secondary-500">{label}</div></div>))}
    </div></div></section>
    <section className="section-subtle section-py-sm"><div className="container-site max-w-prose">
      <h2 className="font-display font-bold text-display-lg text-secondary-950 mb-5">Hvem er Elspesialisten?</h2>
      <div className="space-y-4 text-body-md text-secondary-600 leading-relaxed">
        <p>Elspesialisten er Norges ledende digitale plattform for å finne og bestille sertifiserte elektrikere. Vi ble etablert med ett mål: å gjøre det enkelt, trygt og raskt å finne riktig elektriker, uansett hvor i landet du bor.</p>
        <p>Gjennom vår plattform kan privatpersoner, borettslag, sameier og bedrifter enkelt innhente gratis og uforpliktende tilbud fra DSB godkjente elektrikere i sin kommune.</p>
      </div>
    </div></section>
    <section className="section-white section-py-sm"><div className="container-site"><div className="cta-block">
      <h2 className="font-display font-extrabold text-display-lg text-white mb-4 text-balance">Klar til å finne riktig elektriker?</h2>
      <Link href="/kontakt" className="btn bg-white text-primary-600 text-cta-lg px-8 py-4 rounded-12 hover:bg-primary-50 shadow-card-xl">Bestill gratis tilbud <ArrowRight className="w-5 h-5" /></Link>
    </div></div></section>
  </main><Footer /><StickyMobileCTA /></>);
}
