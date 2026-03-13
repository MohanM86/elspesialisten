/* ═══════════════════════════════════════════════════════════
   CITY-SPECIFIC CONFIGURATION DATA
   Used by the shared visual components per city
   ═══════════════════════════════════════════════════════════ */

export interface CityTjeneste {
  id: string;
  tittel: string;
  pris: string;
  beskrivelse: string;
  href: string;
  color: string;
}

export interface CityEmergency {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  shortDesc: string;
  longDesc: string;
  action: string;
}

export interface CityProblem {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  solution: string;
  danger: "low" | "medium" | "high";
}

export interface CityPrisRad {
  tjeneste: string;
  prisMin: number;
  prisMax: number;
  enhet: string;
  popular?: boolean;
}

export interface CityMarketData {
  selskapsform: { label: string; value: number; color: string }[];
  topBedrifter: { label: string; value: number; color: string }[];
  omrader: { label: string; value: number; color: string }[];
  bottomStats: { v: string; l: string }[];
  total: number;
}

export interface CityConfig {
  slug: string;
  navn: string;
  netteier: string;
  tjenester: CityTjeneste[];
  emergencies: CityEmergency[];
  problemer: CityProblem[];
  priser: CityPrisRad[];
  market: CityMarketData;
}

/* ═══ SHARED EMERGENCIES (same for all cities) ═══ */
const SHARED_EMERGENCIES: CityEmergency[] = [
  {
    id: "strombrudd", title: "Strømbrudd", severity: "high",
    shortDesc: "Hele eller deler av boligen er uten strøm",
    longDesc: "Hvis hele eller deler av boligen er uten strøm og problemet ikke skyldes netteier, kan det være intern feil som krever elektriker.",
    action: "Sjekk om hovedsikringen er utløst. Sjekk netteiers feilkart. Kontakt elektriker hvis problemet er internt.",
  },
  {
    id: "kortslutning", title: "Kortslutning", severity: "high",
    shortDesc: "Lysglimt, smell eller sikring løser ut umiddelbart",
    longDesc: "Lysglimt, smell eller sikring som umiddelbart løser ut igjen kan tyde på kortslutning. Ikke forsøk å koble inn igjen gjentatte ganger.",
    action: "Slå av sikringen. Ikke forsøk å koble inn igjen. Kontakt elektriker umiddelbart.",
  },
  {
    id: "jordfeil", title: "Jordfeil", severity: "medium",
    shortDesc: "Jordfeilbryter løser ut gjentatte ganger",
    longDesc: "Jordfeilbryter som løser ut beskytter mot elektrisk støt. Hvis den løser ut gjentatte ganger, trekk ut alle støpsler og koble inn én og én for å finne kilden.",
    action: "Trekk ut alle støpsler. Koble inn én og én. Ring elektriker ved vedvarende problem.",
  },
  {
    id: "brent", title: "Brent sikringsskap", severity: "critical",
    shortDesc: "Lukt av brent plast, misfarging eller varme",
    longDesc: "Lukt av brent plast, misfarging eller varme fra sikringsskapet er alvorlig og kan indikere brannfare. Slå av hovedbryteren og ring elektriker umiddelbart.",
    action: "Slå av hovedbryteren UMIDDELBART. Ved synlig røyk: ring 110 (brannvesenet). Ring elektriker.",
  },
];

/* ═══ SHARED PROBLEMS (same for all cities) ═══ */
const SHARED_PROBLEMS: CityProblem[] = [
  { id: "sikring-gaar", title: "Sikringen går hele tiden", symptom: "En eller flere sikringer løser ut gjentatte ganger", cause: "Vanligste årsak er overbelastning: for mange apparater på samme kurs. Kan også skyldes jordfeil i et apparat eller feil i det faste anlegget.", solution: "Fordel belastningen på flere kurser, eller la en elektriker legge nye kurser.", danger: "medium" },
  { id: "stikkontakt", title: "Stikkontakt virker ikke", symptom: "Ingen strøm i én eller flere stikkontakter", cause: "Sikring kan være utløst, kontakten kan være ødelagt, eller koblingen kan være løs. En defekt stikkontakt med varmgang er brannfarlig.", solution: "Sjekk sikring først. Hvis ikke utløst: kontakt elektriker. Aldri åpne kontakten selv.", danger: "medium" },
  { id: "delvis-strom", title: "Strømmen går i deler av huset", symptom: "Noen rom har strøm, andre ikke", cause: "En enkelt kurs har feilet. Kan skyldes overbelastning, kortslutning eller løs kobling.", solution: "Identifiser hvilken sikring som er utløst. Kontakt elektriker hvis problemet gjentar seg.", danger: "low" },
  { id: "gammelt-skap", title: "Gammelt sikringsskap", symptom: "Skrusikringer, ingen jordfeilbryter, synlig slitasje", cause: "Sikringsskap fra før 1980 mangler moderne sikkerhetsfunksjoner. En av de vanligste brannårsakene i Norge.", solution: "Oppgrader til moderne sikringsskap med automatsikringer og jordfeilbrytere.", danger: "high" },
  { id: "varmgang", title: "Varmgang i stikkontakt", symptom: "Varm eller misfarget stikkontakt/bryter", cause: "Løs kobling, for høy belastning eller feil dimensjonering. Alvorlig brannfare.", solution: "Koble fra alt umiddelbart. Kontakt elektriker. IKKE bruk kontakten igjen før den er kontrollert.", danger: "high" },
];

/* ═══════════════════════════════════════
   OSLO CONFIG
   ═══════════════════════════════════════ */
export const OSLO_CONFIG: CityConfig = {
  slug: "oslo",
  navn: "Oslo",
  netteier: "Elvia",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 500 – 3 500", beskrivelse: "Mange eldre leiligheter på Frogner, Majorstuen og Grünerløkka har for få stikkontakter.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "25 000 – 45 000", beskrivelse: "Tusenvis av boliger fra 1920–1970 mangler jordfeilbrytere. Frogner og St. Hanshaugen mest utsatt.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "3 000 – 6 000", beskrivelse: "Systematisk gjennomgang av hele anlegget. Anbefales hvert 5. år for boliger eldre enn 20 år.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "800 – 1 500 / punkt", beskrivelse: "LED-spotter gir moderne belysning. For et rom med 6–8 spotter: 5 000–12 000 kr totalt.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "80 000 – 300 000", beskrivelse: "Komplett: nytt skap, nye kurser, utskifting av kabler. Leilighet fra 80 000, enebolig fra 120 000.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "2 000 – 5 000", beskrivelse: "Overbelastning, jordfeil, kortslutning? Elektriker bruker spesialisert måleutstyr.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "15 000 – 150 000", beskrivelse: "Stor etterspørsel i Bjørvika, Nydalen og Løren. Fra enkel lysstyring til komplett system.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Bad, kjøkken, hel bolig – anlegget må oppdateres til NEK 400. Aktuelt i bygårder fra tidlig 1900-tall.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 850, prisMax: 1400, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 500, prisMax: 1500, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1500, prisMax: 3500, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 800, prisMax: 1500, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 25000, prisMax: 45000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 12000, prisMax: 35000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 3000, prisMax: 6000, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 2000, prisMax: 5000, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 15000, prisMax: 50000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 80000, prisMax: 180000, enhet: "per prosjekt" },
  ],
  market: {
    total: 543,
    selskapsform: [
      { label: "Aksjeselskap", value: 395, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 106, color: "#fbbf24" },
      { label: "NUF", value: 21, color: "#94a3b8" },
      { label: "Øvrige", value: 21, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "Bravida", value: 3355, color: "#f97316" },
      { label: "GK Norge", value: 1877, color: "#fb923c" },
      { label: "Caverion", value: 1860, color: "#fdba74" },
      { label: "Mesta", value: 1609, color: "#fed7aa" },
      { label: "Assemblin", value: 746, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Alna / Grorud", value: 145, color: "#f97316" },
      { label: "Sentrum / Grünerløkka", value: 60, color: "#fb923c" },
      { label: "Frogner / Vestkanten", value: 50, color: "#fdba74" },
      { label: "Nordstrand / Søndre", value: 45, color: "#fed7aa" },
      { label: "Øvrige bydeler", value: 243, color: "#e2e8f0" },
    ],
    bottomStats: [
      { v: "543", l: "Registrerte bedrifter" },
      { v: "17 000+", l: "Sysselsatte i bransjen" },
      { v: "47", l: "Nye bedrifter i 2025" },
      { v: "1914", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══════════════════════════════════════
   BERGEN CONFIG
   ═══════════════════════════════════════ */
export const BERGEN_CONFIG: CityConfig = {
  slug: "bergen",
  navn: "Bergen",
  netteier: "BKK",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 400 – 3 200", beskrivelse: "Eldre trehusbebyggelse i Sandviken og Nordnes trenger ofte flere stikkontakter.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "22 000 – 40 000", beskrivelse: "Mange eldre trehus i Bergen sentrum har utdaterte sikringsskap. Brannforebygging er ekstra viktig.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 800 – 5 500", beskrivelse: "Systematisk gjennomgang av hele anlegget. Spesielt viktig i eldre trehus med fuktbelastning.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "750 – 1 400 / punkt", beskrivelse: "I Bergen der dagslyset varierer mye gjennom året, er god innendørsbelysning ekstra verdifullt.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "70 000 – 250 000", beskrivelse: "Full oppgradering med nytt skap, nye kurser og kabling. Leilighet fra 70 000, enebolig fra 100 000.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 800 – 4 500", beskrivelse: "Fukt og vind i Bergen gir ekstra utfordringer for elektriske anlegg. Feilsøking krever erfaring.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "12 000 – 120 000", beskrivelse: "Voksende etterspørsel i nye prosjekter på Damsgård, Kronstad og Laksevåg.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Ved oppussing av bad eller kjøkken må el-anlegget oppdateres. Viktig i Bergens eldre trehusbebyggelse.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 800, prisMax: 1300, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 500, prisMax: 1400, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1400, prisMax: 3200, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 750, prisMax: 1400, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 22000, prisMax: 40000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 10000, prisMax: 30000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2800, prisMax: 5500, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1800, prisMax: 4500, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 12000, prisMax: 45000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 70000, prisMax: 160000, enhet: "per prosjekt" },
  ],
  market: {
    total: 208,
    selskapsform: [
      { label: "Aksjeselskap", value: 137, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 61, color: "#fbbf24" },
      { label: "NUF", value: 1, color: "#94a3b8" },
      { label: "Øvrige", value: 9, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "AF Elkraft", value: 233, color: "#f97316" },
      { label: "BMO Elektro", value: 149, color: "#fb923c" },
      { label: "Bergen Elektrokomp.", value: 90, color: "#fdba74" },
      { label: "FLM Elektro", value: 87, color: "#fed7aa" },
      { label: "BI Elektro", value: 57, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Åsane / Arna (52xx)", value: 82, color: "#f97316" },
      { label: "Fyllingsdalen / Laksevåg (51xx)", value: 74, color: "#fb923c" },
      { label: "Sentrum / Nordnes (50xx)", value: 52, color: "#fdba74" },
    ],
    bottomStats: [
      { v: "208", l: "Registrerte bedrifter" },
      { v: "1 569", l: "Sysselsatte i bransjen" },
      { v: "25", l: "Nye bedrifter i 2025" },
      { v: "1985", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══ LOOKUP ═══ */
export function getCityConfig(slug: string): CityConfig | null {
  switch (slug) {
    case "oslo": return OSLO_CONFIG;
    case "bergen": return BERGEN_CONFIG;
    default: return null;
  }
}
