// ─── GEOGRAPHIC TYPES ──────────────────────────────────────────

export type RegionType = "by" | "bygd" | "kystkommune" | "industrikommune" | "distriktskommune";

export interface Fylke {
  navn:         string;
  slug:         string;
  kortNavn:     string;
  kommuneCount: number;
  beskrivelse:  string;
  seoTitle:     string;
  seoDesc:      string;
}

export interface Kommune {
  navn:          string;
  slug:          string;
  fylke:         string;
  fylkeSlug:     string;
  regionType:    RegionType;
  kommuneNr:     string;
  kortTekst:     string;
  langTekst:     string;
  vanligeTjenester: string[];
  prisnivaa:     "lavt" | "middels" | "høyt";
  lokaleKjentePunkter?: string[];
  seoTitle?:     string;
  seoDesc?:      string;
  relaterteKommuner?: string[];
  relaterteGuider?:   string[];
}

export type ServiceCategory =
  | "lading"
  | "sikring"
  | "belysning"
  | "smarthus"
  | "varme"
  | "kontroll"
  | "akutt"
  | "anlegg"
  | "bedrift";

export interface Tjeneste {
  id:           string;
  slug:         string;
  tittel:       string;
  kortTittel:   string;
  kategori:     ServiceCategory;
  kortBeskrivelse: string;
  ikkon:        string;
  prisMin:      number;
  prisMax:      number;
  prisenhet:    string;
  intro:        string;
  naarTrengerDu: string[];
  hvaErDette:   string;
  prispaavirker: string[];
  faq:          FAQItem[];
  seoTitle:     string;
  seoDesc:      string;
  relaterteSlug: string[];
  kalkulator?:  string;
}

export interface FAQItem {
  sporsmal: string;
  svar:     string;
}

export interface GuideKategori {
  id:    string;
  navn:  string;
  slug:  string;
  ikkon: string;
}

export interface Guide {
  slug:        string;
  tittel:      string;
  kortTekst:   string;
  kategori:    string;
  oppdatert:   string;
  lesetid:     number;
  kortSvar:    string;
  innhold:     string;
  faq:         FAQItem[];
  relaterteTjenester: string[];
  relaterteKommuner:  string[];
  relaterteGuider:    string[];
  seoTitle:    string;
  seoDesc:     string;
}

export type OppdragType =
  | "elbillader"
  | "sikringsskap"
  | "varmekabler"
  | "belysning"
  | "smarthus"
  | "feilsoking"
  | "akutt"
  | "elkontroll"
  | "nytt-anlegg"
  | "annet";

export type Hastegrad = "akutt" | "innen-uken" | "planlagt";

export interface LeadFormData {
  navn:        string;
  telefon:     string;
  epost?:      string;
  postnummer:  string;
  kommune?:    string;
  oppdragType: OppdragType;
  hastegrad:   Hastegrad;
  beskrivelse?: string;
  tidspunkt?:  string;
  samtykke:    boolean;
  kilde?:      string;
}

export interface LeadResponse {
  success: boolean;
  id?:     string;
  error?:  string;
}

export type BoligType = "leilighet" | "enebolig" | "rekkehus" | "hytte" | "bedrift";

export interface ElladerKalkInput {
  boligType:        BoligType;
  eksisterendeKurs: boolean;
  sikringsskapet:   "ok" | "gammelt" | "usikker";
  avstandMeter:     number;
  laderType:        "enkel" | "smart" | "3fase";
  kommune?:         string;
}

export interface ElladerKalkResult {
  prisMin:   number;
  prisMax:   number;
  inkludert: string[];
  notater:   string[];
}

export interface SikringsskapeKalkInput {
  boligAreal:    number;
  boligType:     BoligType;
  alder:         "under10" | "10-30" | "over30";
  kurser:        number;
  heving:        boolean;
}

export interface SikringsskapeKalkResult {
  anbefaling: "skift" | "oppgrader" | "ok";
  prisMin:    number;
  prisMax:    number;
  beskrivelse: string;
}

export interface PrisKalkInput {
  oppdragType: OppdragType;
  boligType:   BoligType;
  areal?:      number;
  antall?:     number;
  hastegrad:   Hastegrad;
  kommune?:    string;
}

export interface PrisKalkResult {
  prisMin:      number;
  prisMax:      number;
  prisTypisk:   number;
  prisenhet:    string;
  inkludert:    string[];
  forutsetninger: string[];
}

export interface StatItem {
  verdi:    string;
  etikett:  string;
  prefix?:  string;
  suffix?:  string;
}

export interface Testimonial {
  navn:      string;
  sted:      string;
  tekst:     string;
  stjerner:  number;
  dato?:     string;
  tjeneste?: string;
}

export interface PageMeta {
  title:         string;
  description:   string;
  canonical?:    string;
  ogImage?:      string;
  noindex?:      boolean;
  publishedTime?: string;
  modifiedTime?:  string;
  type?:         "website" | "article";
}

export interface BreadcrumbItem {
  navn:  string;
  href?: string;
}

export interface NavItem {
  label:     string;
  href:      string;
  children?: NavItem[];
  badge?:    string;
}
