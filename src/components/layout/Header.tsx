"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Tjenester",
    href: "/tjenester",
    children: [
      { label: "Installere elbillader",    href: "/tjenester/installere-elbillader" },
      { label: "Bytte sikringsskap",       href: "/tjenester/bytte-sikringsskap" },
      { label: "Smarthus installasjon",    href: "/tjenester/smarthus-installasjon" },
      { label: "Legge varmekabler",        href: "/tjenester/legge-varmekabler" },
      { label: "Belysning og spotter",     href: "/tjenester/installere-belysning-spotter" },
      { label: "Akutt elektriker",         href: "/tjenester/akutt-elektriker" },
      { label: "El kontroll",              href: "/tjenester/elkontroll" },
      { label: "Feilsøking av strøm",     href: "/tjenester/feilsoking-strom" },
    ],
  },
  {
    label: "Priser",
    href: "/priser",
    children: [
      { label: "Elektriker timepris",      href: "/guider/hva-koster-elektriker" },
      { label: "Elbillader pris",          href: "/guider/elbillader-pris" },
      { label: "Sikringsskap pris",        href: "/guider/sikringsskap-pris" },
    ],
  },
  {
    label: "Kalkulatorer",
    href: "/kalkulator",
    children: [
      { label: "Elektriker priskalkulator", href: "/kalkulator/elektriker" },
      { label: "Elbillader kalkulator",     href: "/kalkulator/elbillader" },
      { label: "Sikringsskap kalkulator",   href: "/kalkulator/sikringsskap" },
    ],
  },
  { label: "Guider",    href: "/guider" },
  { label: "Kommuner",  href: "/elektriker" },
  { label: "Om oss",    href: "/om-oss" },
];

interface DropdownProps {
  items: { label: string; href: string }[];
  isOpen: boolean;
}

function Dropdown({ items, isOpen }: DropdownProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-16",
        "border border-neutral-200 shadow-card-lg py-2 z-50",
        "transition-all duration-200 ease-out origin-top",
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center px-4 py-2.5 text-body-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-8 mx-1"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [openDropdown, setOpenDropdown]   = useState<string | null>(null);
  const dropdownTimerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  function handleMouseEnter(label: string) {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-card-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Elspesialisten – til forsiden"
            >
              <div className="w-9 h-9 rounded-10 bg-primary-500 flex items-center justify-center shadow-cta group-hover:shadow-cta-hover transition-shadow duration-200">
                <Zap className="w-5 h-5 text-white fill-white" aria-hidden />
              </div>
              <span className="font-display font-bold text-heading-md text-secondary-950 hidden sm:block">
                Elspesialisten
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Hovednavigasjon">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-8 text-body-sm font-medium",
                      "text-secondary-700 hover:text-primary-600 hover:bg-primary-50",
                      "transition-colors duration-150"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                        aria-hidden
                      />
                    )}
                  </Link>
                  {item.children && (
                    <Dropdown items={item.children} isOpen={openDropdown === item.label} />
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+4780000000"
                className="flex items-center gap-2 text-body-sm font-semibold text-secondary-700 hover:text-primary-600 transition-colors px-3 py-2"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Ring oss
              </a>
              <Link href="/kontakt" className="btn-primary text-[0.875rem] px-5 py-2.5">
                Få gratis tilbud
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden btn-icon ml-2"
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-secondary-950/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-80 max-w-[calc(100vw-3rem)] bg-white shadow-card-xl",
            "transition-transform duration-300 ease-out overflow-y-auto",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-8 bg-primary-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" aria-hidden />
              </div>
              <span className="font-display font-bold text-heading-sm">Elspesialisten</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="btn-icon w-9 h-9"
              aria-label="Lukk meny"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="px-4 py-4 space-y-1" aria-label="Mobilnavigasjon">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-3 py-3 rounded-10 text-body-md font-medium text-secondary-800 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1 mb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 rounded-8 text-body-sm text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-neutral-200 space-y-3 mt-auto">
            <Link
              href="/kontakt"
              className="btn-primary w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Få gratis tilbud
            </Link>
            <a
              href="tel:+4780000000"
              className="btn-secondary w-full justify-center"
            >
              <Phone className="w-4 h-4" aria-hidden />
              Ring oss nå
            </a>
          </div>
        </div>
      </div>

      <div className="h-16 lg:h-[72px]" aria-hidden />
    </>
  );
}
