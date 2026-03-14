/* Trondheim bydeler – postnummer-mapper for filtrering av bedrifter */

export interface TrondheimBydel {
  slug: string;
  navn: string;
  postRanges: [number, number][];
  beskrivelse: string;
  kjennetegn: string;
}

export const TRONDHEIM_BYDELER: TrondheimBydel[] = [
  { slug: "midtbyen", navn: "Midtbyen", postRanges: [[7001,7019]], beskrivelse: "Midtbyen er Trondheims historiske sentrum med Nidarosdomen, Bakklandet og Solsiden. Bydelen har mange eldre murgårder og trehus med behov for elektrisk modernisering, samt nye leilighetsprosjekter langs Nidelva.", kjennetegn: "Nidarosdomen, Bakklandet, Solsiden, murgårder" },
  { slug: "mollenberg", navn: "Møllenberg og Nedre Elvehavn", postRanges: [[7020,7029]], beskrivelse: "Møllenberg og Nedre Elvehavn er populære boligområder med fargerike trehus fra 1800 tallet og moderne leiligheter på Nedre Elvehavn. Mange av de eldre boligene trenger oppgradering av elektrisk anlegg.", kjennetegn: "Fargerike trehus, Nedre Elvehavn, studentboliger" },
  { slug: "lade", navn: "Lade og Strindheim", postRanges: [[7030,7039]], beskrivelse: "Lade og Strindheim øst for sentrum har en blanding av eneboliger, rekkehus og næringsbygg. Lade Gård-området har sett mye nybygging. Mange bedrifter med kontor og verksted i området.", kjennetegn: "Lade Gård, Strindheim, næringsområde" },
  { slug: "ranheim", navn: "Ranheim og Charlottenlund", postRanges: [[7040,7049]], beskrivelse: "Ranheim og Charlottenlund er Trondheims største næringsområde for elektrikerbedrifter. Ranheim har store næringsparker med verksted og lager, pluss boligområder med eneboliger og rekkehus.", kjennetegn: "Flest bedrifter, næringsparker, Charlottenlund" },
  { slug: "lerkendal", navn: "Lerkendal og Nardo", postRanges: [[7050,7059]], beskrivelse: "Lerkendal og Nardo er preget av NTNU-campus på Gløshaugen og Dragvoll. Bydelen har mange studentboliger og eldre eneboliger fra etterkrigstiden. Nærhet til universitetet driver etterspørsel etter smarthus.", kjennetegn: "NTNU Gløshaugen, studentboliger, smarthus" },
  { slug: "byasen", navn: "Byåsen", postRanges: [[7060,7069]], beskrivelse: "Byåsen vest for sentrum er et etablert villaområde med mange eneboliger fra 1960 og 70 tallet. Husene trenger ofte oppgradering av sikringsskap og installasjon av elbillader i garasje.", kjennetegn: "Villaområde, eneboliger, utsikt over fjorden" },
  { slug: "heimdal", navn: "Heimdal og Byneset", postRanges: [[7070,7079],[7540,7549]], beskrivelse: "Heimdal sør for sentrum er et stort boligområde med Heimdal storsenter. Byneset (tidligere Klæbu) ble del av Trondheim i 2020. Mange eneboliger og rekkehus fra 1970 og 80 tallet.", kjennetegn: "Heimdal storsenter, Byneset, boligområde" },
  { slug: "tiller", navn: "Tiller og Kattem", postRanges: [[7080,7099]], beskrivelse: "Tiller er Trondheims store handels og næringsområde med City Syd og mange næringsparker. Kattem og Flatåsen har borettslag og rekkehus fra 1970 og 80 tallet med behov for elektrisk oppgradering.", kjennetegn: "City Syd, næringspark, Flatåsen borettslag" },
];

export function getTrondheimBydel(slug: string): TrondheimBydel | undefined {
  return TRONDHEIM_BYDELER.find((b) => b.slug === slug);
}

export function getAllTrondheimBydelSlugs(): string[] {
  return TRONDHEIM_BYDELER.map((b) => b.slug);
}
