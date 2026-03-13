import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, Phone, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Forespørsel mottatt – Takk!", description: "Din forespørsel er mottatt. En elektriker tar kontakt innen 24 timer.", robots: { index: false } };

export default function TakkSide() {
  return (<><Header /><main id="main-content" className="section-subtle min-h-[80vh] flex items-center">
    <div className="container-site py-16"><div className="max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-success-50 border-4 border-success-500 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-success-600" /></div>
      <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4">Forespørselen er mottatt!</h1>
      <p className="text-body-lg text-secondary-600 mb-10">En sertifisert elektriker i ditt område vil kontakte deg med et uforpliktende tilbud innen <strong>24 timer</strong>.</p>
      <Link href="/" className="btn-primary">Tilbake til forsiden</Link>
    </div></div>
  </main><Footer /></>);
}
