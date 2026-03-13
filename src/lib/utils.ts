import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPris(kr: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(kr);
}

export function formatPrisIntervall(min: number, max: number): string {
  return `${formatPris(min)} – ${formatPris(max)}`;
}

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "\u2026";
}

export function leseTid(tekst: string): number {
  const ord = tekst.trim().split(/\s+/).length;
  return Math.ceil(ord / 200);
}

export function buildFAQSchema(faq: { sporsmal: string; svar: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.sporsmal,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.svar,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { navn: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.navn,
      ...(item.href ? { item: `https://elspesialisten.no${item.href}` } : {}),
    })),
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Elspesialisten",
    url: "https://elspesialisten.no",
    logo: "https://elspesialisten.no/logo.png",
    telephone: "+47-800-00-000",
    email: "kontakt@elspesialisten.no",
    description:
      "Norges ledende plattform for elektriker og elektrotjenester. Vi kobler deg med sertifiserte elektrikere i din kommune.",
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
    serviceType: [
      "Elektriker",
      "Elbillader installasjon",
      "Sikringsskap",
      "Smarthus",
      "Varmekabler",
      "Elkontroll",
    ],
    priceRange: "kr kr",
    "@id": "https://elspesialisten.no/#organization",
  };
}

export function buildServiceSchema({
  navn,
  slug,
  beskrivelse,
  prisMin,
  prisMax,
}: {
  navn:        string;
  slug:        string;
  beskrivelse: string;
  prisMin:     number;
  prisMax:     number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: navn,
    url: `https://elspesialisten.no/tjenester/${slug}`,
    description: beskrivelse,
    provider: {
      "@type": "ProfessionalService",
      name: "Elspesialisten",
      url: "https://elspesialisten.no",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: prisMin,
      highPrice: prisMax,
      priceCurrency: "NOK",
    },
    areaServed: { "@type": "Country", name: "Norway" },
  };
}

export function formatDato(iso: string): string {
  return new Date(iso).toLocaleDateString("nb-NO", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export function animateCounter(
  element: HTMLElement,
  target: number,
  duration = 2000
) {
  const start = performance.now();
  const update = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(eased * target).toLocaleString("nb-NO");
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export function prisnivaaMultiplier(prisnivaa: string): number {
  switch (prisnivaa) {
    case "lavt":   return 0.9;
    case "høyt":   return 1.15;
    default:       return 1.0;
  }
}

export function hasteMultiplier(hastegrad: string): number {
  switch (hastegrad) {
    case "akutt":        return 1.4;
    case "innen-uken":   return 1.15;
    default:             return 1.0;
  }
}
