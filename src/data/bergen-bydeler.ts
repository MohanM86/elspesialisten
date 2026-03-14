/* Bergen bydeler – postnummer-mapper for filtrering av bedrifter */

export interface BergenBydel {
  slug: string;
  navn: string;
  postRanges: [number, number][];
  beskrivelse: string;
  kjennetegn: string;
}

export const BERGEN_BYDELER: BergenBydel[] = [
  { slug: "bergenhus", navn: "Bergenhus", postRanges: [[5003,5020]], beskrivelse: "Bergenhus er Bergens sentrale bydel og omfatter Bryggen, Nordnes, Nygårdshøyden og Sandviken. Bydelen har Norges høyeste konsentrasjon av verneverdige trehus, noe som stiller spesielle krav til brannsikkerhet og elektriske anlegg.", kjennetegn: "Bryggen, Nordnes, trehusbebyggelse, sentrum" },
  { slug: "arstad", navn: "Årstad", postRanges: [[5021,5041]], beskrivelse: "Årstad ligger sør for sentrum og omfatter Haukeland, Kronstad, Solheimsviken og Minde. Bydelen har en blanding av eldre arbeiderboliger og nye leilighetsprosjekter ved Kronstad og Mindemyren.", kjennetegn: "Haukeland, Kronstad, ny byutvikling" },
  { slug: "fana", navn: "Fana", postRanges: [[5221,5250]], beskrivelse: "Fana sør i Bergen har mange eneboliger og rekkehus fra 1960 til 1990 tallet i Nesttun, Paradis og Rå. Stor etterspørsel etter elbilladere og oppgradering av sikringsskap i etablerte boligområder.", kjennetegn: "Nesttun, Paradis, villaområder, elbilladere" },
  { slug: "ytrebygda", navn: "Ytrebygda", postRanges: [[5251,5259],[5072,5078]], beskrivelse: "Ytrebygda er Bergens næringssentrum med Flesland flyplass, Kokstad og Sandsli. Mange elektrikerbedrifter har base her. Bydelen har også boligområder med behov for elektrisk oppgradering.", kjennetegn: "Flesland, Kokstad, Sandsli, næringsområde" },
  { slug: "laksevag", navn: "Laksevåg", postRanges: [[5042,5071],[5079,5099]], beskrivelse: "Laksevåg vest for sentrum har en blanding av eldre trehusbebyggelse og nyere boligfelt. Damsgård og Laksevåg sentrum har mange boliger fra tidlig 1900 tall som trenger elektrisk modernisering.", kjennetegn: "Damsgård, eldre trehus, nye prosjekter" },
  { slug: "fyllingsdalen", navn: "Fyllingsdalen", postRanges: [[5141,5159]], beskrivelse: "Fyllingsdalen er en drabantbydel fra 1960 og 70 tallet med mange blokkleiligheter og rekkehus. Sikringsskap og elektriske anlegg fra byggetiden trenger oppgradering. Oasen kjøpesenter er bydelssentrum.", kjennetegn: "Drabantby fra 60-70-tallet, Oasen, blokkbebyggelse" },
  { slug: "aasane", navn: "Åsane", postRanges: [[5100,5140],[5160,5184]], beskrivelse: "Åsane nord for Bergen er byens mest folkerike bydel med Åsane senter som handelssentrum. Bydelen har mange eneboliger fra 1970 og 80 tallet, og flest registrerte elektrikerbedrifter i Bergen.", kjennetegn: "Bergens største bydel, Åsane senter, mange bedrifter" },
  { slug: "arna", navn: "Arna", postRanges: [[5260,5269]], beskrivelse: "Arna øst for Bergen er en mer landlig bydel med eneboliger og småhusbebyggelse. Indre Arna og Ytre Arna har boliger fra ulike tiår, og mange trenger oppgradering av elektrisk anlegg.", kjennetegn: "Indre Arna, Ytre Arna, småhusbebyggelse" },
];

export function getBergenBydel(slug: string): BergenBydel | undefined {
  return BERGEN_BYDELER.find((b) => b.slug === slug);
}

export function getAllBergenBydelSlugs(): string[] {
  return BERGEN_BYDELER.map((b) => b.slug);
}
