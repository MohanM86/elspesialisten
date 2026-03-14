/* Oslo bydeler – postnummer-mapper for filtrering av bedrifter */

export interface Bydel {
  slug: string;
  navn: string;
  postRanges: [number, number][];
  beskrivelse: string;
  kjennetegn: string;
}

export const OSLO_BYDELER: Bydel[] = [
  { slug: "gamle-oslo", navn: "Gamle Oslo", postRanges: [[150,199]], beskrivelse: "Gamle Oslo omfatter områdene Grønland, Tøyen, Kampen, Vålerenga, Gamlebyen og Bjørvika. Bydelen har en blanding av eldre murgårder og nye leilighetsprosjekter i Bjørvika og Sørenga.", kjennetegn: "Eldre murgårder, nye prosjekter i Bjørvika" },
  { slug: "grunerloekka", navn: "Grünerløkka", postRanges: [[473,498],[550,570]], beskrivelse: "Grünerløkka er kjent for sine eldre murgårder fra sent 1800-tall, mange av dem med originale elektriske anlegg som trenger oppgradering. Bydelen omfatter også Sofienberg, Rodeløkka og Sinsen.", kjennetegn: "Murgårder fra 1800-tallet, mye oppussing" },
  { slug: "sagene", navn: "Sagene", postRanges: [[450,472]], beskrivelse: "Sagene har en blanding av eldre industribebyggelse og nyere boligprosjekter. Mange leiligheter fra tidlig 1900-tall med utdaterte elektriske anlegg.", kjennetegn: "Tidligere industri, eldre leiligheter" },
  { slug: "st-hanshaugen", navn: "St. Hanshaugen", postRanges: [[350,383]], beskrivelse: "St. Hanshaugen og Bislett er preget av murgårder fra rundt 1900 med behov for elektrisk modernisering. Bydelen har også Ullevål sykehus-området.", kjennetegn: "Murgårder, Bislett, Ullevål" },
  { slug: "frogner", navn: "Frogner", postRanges: [[244,289]], beskrivelse: "Frogner er Oslos vestkant med mange eldre villaer og murgårder med høy standard. Stor etterspørsel etter premium elektrotjenester, smarthus og sikringsskapsoppgradering.", kjennetegn: "Villaer, premium boliger, høy standard" },
  { slug: "ullern", navn: "Ullern", postRanges: [[340,349],[360,369]], beskrivelse: "Ullern og Smestad er villaområder med høy boligstandard og stor etterspørsel etter elbilladere, smarthus og moderne belysning.", kjennetegn: "Villaområde, Smestad, Bestum" },
  { slug: "vestre-aker", navn: "Vestre Aker", postRanges: [[753,790]], beskrivelse: "Vestre Aker med Røa, Vinderen og Holmenkollen er et etablert villaområde der mange boliger fra 1950 og 60 tallet trenger elektrisk oppgradering.", kjennetegn: "Holmenkollen, Røa, villaer fra etterkrigstiden" },
  { slug: "nordre-aker", navn: "Nordre Aker", postRanges: [[850,890]], beskrivelse: "Nordre Aker omfatter Nydalen, Tåsen, Nordberg og Kjelsås. Nydalen har mange nye leilighetsprosjekter, mens boligområdene har eldre eneboliger.", kjennetegn: "Nydalen, Tåsen, nye og eldre boliger" },
  { slug: "bjerke", navn: "Bjerke", postRanges: [[575,598]], beskrivelse: "Bjerke med Økern, Aker sykehus-området og Risløkka har et aktivt næringsmiljø med mange elektrikerbedrifter. Stor byggeaktivitet på Økern.", kjennetegn: "Økern, næringspark, mye nybygg" },
  { slug: "grorud", navn: "Grorud", postRanges: [[950,979]], beskrivelse: "Grorud og Ammerud har mange drabantbyboliger fra 1960 og 70 tallet som trenger elektrisk oppgradering. Groruddalen har flere næringsparker.", kjennetegn: "Drabantby, næringsparker, Groruddalen" },
  { slug: "stovner", navn: "Stovner", postRanges: [[980,989]], beskrivelse: "Stovner og Vestli har boliger fra 1970 og 80 tallet. Mange blokkleiligheter og rekkehus der sikringsskap og elbilladere er aktuelle oppdrag.", kjennetegn: "Blokker fra 70-80-tallet, rekkehus" },
  { slug: "alna", navn: "Alna", postRanges: [[650,699]], beskrivelse: "Alna er Oslos desidert største næringsområde for elektrikerbedrifter med over 140 registrerte firmaer. Furuset, Alnabru og Helsfyr har store næringsparker.", kjennetegn: "Flest bedrifter i Oslo, Alnabru næringspark" },
  { slug: "ostensjo", navn: "Østensjø", postRanges: [[1061,1090]], beskrivelse: "Østensjø med Bøler, Manglerud og Skullerud har en blanding av blokkleiligheter og eneboliger fra etterkrigstiden.", kjennetegn: "Bøler, Manglerud, etterkrigsboliger" },
  { slug: "nordstrand", navn: "Nordstrand", postRanges: [[1150,1199]], beskrivelse: "Nordstrand, Lambertseter og Bekkelaget er etablerte boligområder med mange eneboliger og rekkehus fra 1950 og 60 tallet.", kjennetegn: "Lambertseter, villaer, etablerte boligstrøk" },
  { slug: "sondre-nordstrand", navn: "Søndre Nordstrand", postRanges: [[1251,1299]], beskrivelse: "Søndre Nordstrand med Holmlia, Mortensrud og Bjørndal har boliger fra 1970 og 80 tallet. Mange borettslag med fellesprosjekter for elbilladere.", kjennetegn: "Holmlia, Mortensrud, borettslag" },
];

export function getBydel(slug: string): Bydel | undefined {
  return OSLO_BYDELER.find((b) => b.slug === slug);
}

export function getAllBydelSlugs(): string[] {
  return OSLO_BYDELER.map((b) => b.slug);
}
