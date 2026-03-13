import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Shield, Award, Star } from "lucide-react";

const TJENESTE_LINKS = [
  { label: "Installere elbillader",   href: "/tjenester/installere-elbillader" },
  { label: "Bytte sikringsskap",      href: "/tjenester/bytte-sikringsskap" },
  { label: "Smarthus installasjon",   href: "/tjenester/smarthus-installasjon" },
  { label: "Legge varmekabler",       href: "/tjenester/legge-varmekabler" },
  { label: "Belysning og spotter",    href: "/tjenester/installere-belysning-spotter" },
  { label: "Akutt elektriker",        href: "/tjenester/akutt-elektriker" },
  { label: "El kontroll",             href: "/tjenester/elkontroll" },
  { label: "Feilsøking av strøm",    href: "/tjenester/feilsoking-strom" },
];

const REGION_LINKS = [
  { label: "Elektriker Oslo",         href: "/kommune/oslo" },
  { label: "Elektriker Bergen",       href: "/kommune/bergen" },
  { label: "Elektriker Trondheim",    href: "/kommune/trondheim" },
  { label: "Elektriker Stavanger",    href: "/kommune/stavanger" },
  { label: "Elektriker Bærum",        href: "/kommune/baerum" },
  { label: "Elektriker Kristiansand", href: "/kommune/kristiansand" },
  { label: "Alle kommuner",           href: "/elektriker" },
];

const INFO_LINKS = [
  { label: "Om Elspesialisten",       href: "/om-oss" },
  { label: "Priser og kalkulator",    href: "/priser" },
  { label: "Guider og råd",           href: "/guider" },
  { label: "Vanlige spørsmål",        href: "/faq" },
  { label: "Kontakt oss",             href: "/kontakt" },
  { label: "Personvern",              href: "/personvern" },
  { label: "Vilkår",                  href: "/vilkar" },
];

const TRUST_BADGES = [
  { ikkon: Shield, tekst: "Sertifiserte elektrikere" },
  { ikkon: Award,  tekst: "DSB godkjente fagpersoner" },
  { ikkon: Star,   tekst: "Rask respons i hele Norge" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="border-b border-secondary-800">
        <div className="container-site py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {TRUST_BADGES.map(({ ikkon: Icon, tekst }) => (
              <div key={tekst} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-10 bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-primary-400" aria-hidden />
                </div>
                <span className="text-body-sm font-medium text-secondary-200">{tekst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-10 bg-primary-500 flex items-center justify-center shadow-cta group-hover:shadow-cta-hover transition-shadow">
                <Zap className="w-5 h-5 text-white fill-white" aria-hidden />
              </div>
              <span className="font-display font-bold text-heading-md text-white">Elspesialisten</span>
            </Link>
            <p className="text-body-sm text-secondary-400 leading-relaxed mb-6 max-w-[260px]">
              Norges ledende plattform for elektriker og elektrotjenester. Vi kobler deg med sertifiserte fagpersoner i hele landet.
            </p>
            <div className="space-y-3">
              <a href="tel:+4780000000" className="flex items-center gap-2.5 text-body-sm text-secondary-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden />800 00 000
              </a>
              <a href="mailto:kontakt@elspesialisten.no" className="flex items-center gap-2.5 text-body-sm text-secondary-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden />kontakt@elspesialisten.no
              </a>
              <div className="flex items-center gap-2.5 text-body-sm text-secondary-300">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden />Hele Norge
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-heading-sm text-white mb-4">Tjenester</h3>
            <ul className="space-y-2.5">
              {TJENESTE_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-body-sm text-secondary-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-heading-sm text-white mb-4">Populære byer</h3>
            <ul className="space-y-2.5">
              {REGION_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-body-sm text-secondary-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-heading-sm text-white mb-4">Informasjon</h3>
            <ul className="space-y-2.5 mb-8">
              {INFO_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-body-sm text-secondary-400 hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
            <Link href="/kontakt" className="btn-primary inline-flex text-[0.875rem] px-5 py-2.5 animate-pulse-cta">Få gratis tilbud</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-800">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-secondary-500 text-center sm:text-left">&copy; {new Date().getFullYear()} Elspesialisten. Alle rettigheter forbeholdt.</p>
          <div className="flex items-center gap-1 text-caption text-secondary-500">
            <span>Alle elektrikere er</span>
            <Shield className="w-3 h-3 text-success-500 mx-0.5" aria-hidden />
            <span>DSB autoriserte</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
