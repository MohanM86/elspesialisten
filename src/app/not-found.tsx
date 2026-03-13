import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="section-subtle min-h-[80vh] flex items-center">
        <div className="container-site py-20 text-center">
          <div className="w-16 h-16 rounded-20 bg-primary-500 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white fill-white" aria-hidden />
          </div>
          <h1 className="font-display font-extrabold text-display-xl text-secondary-950 mb-4">404 – Siden finnes ikke</h1>
          <p className="text-body-lg text-secondary-600 max-w-md mx-auto mb-8">Beklager, vi finner ikke siden du leter etter. Den kan ha blitt flyttet eller slettet.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="btn-primary">Gå til forsiden <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/kontakt" className="btn-secondary">Kontakt oss</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
