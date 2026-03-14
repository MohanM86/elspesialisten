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

/* ═══════════════════════════════════════
   TRONDHEIM CONFIG
   ═══════════════════════════════════════ */
export const TRONDHEIM_CONFIG: CityConfig = {
  slug: "trondheim",
  navn: "Trondheim",
  netteier: "Tensio",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 300 – 3 000", beskrivelse: "Eldre murgårder i Midtbyen og Bakklandet har ofte begrenset antall stikkontakter og utdatert kabling.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "20 000 – 38 000", beskrivelse: "Mange boliger fra Lerkendal til Ila har sikringsskap fra 1960–80-tallet som bør oppgraderes for brannsikkerhet.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 500 – 5 000", beskrivelse: "Systematisk gjennomgang av hele anlegget. Spesielt viktig i studentbyen Trondheim med mange utleieboliger.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "700 – 1 300 / punkt", beskrivelse: "Med mørketid fra oktober til mars er god innendørsbelysning ekstra viktig i Trondheim.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "65 000 – 230 000", beskrivelse: "Full oppgradering med nytt skap, nye kurser og kabling. Leilighet fra 65 000, enebolig fra 95 000.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 600 – 4 000", beskrivelse: "Kulde og temperatursvingninger i Trondheim kan gi ekstra belastning på eldre anlegg og forårsake feil.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "10 000 – 100 000", beskrivelse: "Teknologibyen Trondheim har høy etterspørsel etter smarthus. NTNU-miljøet driver innovasjon innen energistyring.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Ved oppussing av bad eller kjøkken må el-anlegget oppdateres. Aktuelt i eldre trehus og murgårder i sentrum.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 750, prisMax: 1200, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 450, prisMax: 1300, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1300, prisMax: 3000, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 700, prisMax: 1300, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 20000, prisMax: 38000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 9000, prisMax: 28000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2500, prisMax: 5000, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1600, prisMax: 4000, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 10000, prisMax: 40000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 65000, prisMax: 150000, enhet: "per prosjekt" },
  ],
  market: {
    total: 139,
    selskapsform: [
      { label: "Aksjeselskap", value: 88, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 46, color: "#fbbf24" },
      { label: "NUF", value: 1, color: "#94a3b8" },
      { label: "Øvrige", value: 4, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "Vintervoll", value: 221, color: "#f97316" },
      { label: "Fjeldseth", value: 142, color: "#fb923c" },
      { label: "Elteam", value: 102, color: "#fdba74" },
      { label: "Energipartner", value: 98, color: "#fed7aa" },
      { label: "ON Energi", value: 85, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Trondheim sentrum (70xx)", value: 134, color: "#f97316" },
      { label: "Byneset / Klæbu (75xx)", value: 5, color: "#fb923c" },
    ],
    bottomStats: [
      { v: "139", l: "Registrerte bedrifter" },
      { v: "1 261", l: "Sysselsatte i bransjen" },
      { v: "12", l: "Nye bedrifter i 2025" },
      { v: "1960", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══ LOOKUP ═══ */
export function getCityConfig(slug: string): CityConfig | null {
  switch (slug) {
    case "oslo": return OSLO_CONFIG;
    case "bergen": return BERGEN_CONFIG;
    case "trondheim": return TRONDHEIM_CONFIG;
    case "stavanger": return STAVANGER_CONFIG;
    case "kristiansand": return KRISTIANSAND_CONFIG;
    case "drammen": return DRAMMEN_CONFIG;
    case "fredrikstad": return FREDRIKSTAD_CONFIG;
    default: return null;
  }
}

/* ═══════════════════════════════════════
   STAVANGER CONFIG
   ═══════════════════════════════════════ */
export const STAVANGER_CONFIG: CityConfig = {
  slug: "stavanger",
  navn: "Stavanger",
  netteier: "Lnett",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 400 – 3 300", beskrivelse: "Eldre trehusbyen i Stavanger sentrum og Storhaug har ofte begrenset antall stikkontakter.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "22 000 – 42 000", beskrivelse: "Gamle Stavanger og Storhaug har mange boliger med utdaterte sikringsskap. Viktig for brannsikkerhet i trehus.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 800 – 5 500", beskrivelse: "Systematisk gjennomgang. Spesielt viktig i oljebyen der mange boliger har høyt strømforbruk.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "750 – 1 400 / punkt", beskrivelse: "LED-spotter og moderne belysning er populært i Stavangers mange oppgraderingsprosjekter.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "70 000 – 260 000", beskrivelse: "Komplett oppgradering. Leilighet fra 70 000, enebolig fra 100 000 kr. Høy kjøpekraft gir etterspørsel.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 800 – 4 500", beskrivelse: "Kystklima med salt og fukt gir ekstra belastning på eldre anlegg langs Stavangers kystlinje.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "12 000 – 120 000", beskrivelse: "Høy kjøpekraft i Stavanger-regionen driver etterspørselen etter premium smarthusløsninger.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Bad, kjøkken og hele boliger. Stavanger har mye oppussingsaktivitet i etablerte boligområder.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 800, prisMax: 1300, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 500, prisMax: 1400, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1400, prisMax: 3300, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 750, prisMax: 1400, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 22000, prisMax: 42000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 10000, prisMax: 30000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2800, prisMax: 5500, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1800, prisMax: 4500, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 12000, prisMax: 45000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 70000, prisMax: 160000, enhet: "per prosjekt" },
  ],
  market: {
    total: 101,
    selskapsform: [
      { label: "Aksjeselskap", value: 62, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 37, color: "#fbbf24" },
      { label: "Øvrige", value: 2, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "Rønning Elektro", value: 233, color: "#f97316" },
      { label: "Blu Electro", value: 224, color: "#fb923c" },
      { label: "Rogaland Elektro", value: 118, color: "#fdba74" },
      { label: "Stavanger Install.", value: 59, color: "#fed7aa" },
      { label: "Lyse Energi", value: 52, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Stavanger sentrum (40xx)", value: 90, color: "#f97316" },
      { label: "Randaberg / Rennesøy (41xx)", value: 11, color: "#fb923c" },
    ],
    bottomStats: [
      { v: "101", l: "Registrerte bedrifter" },
      { v: "1 066", l: "Sysselsatte i bransjen" },
      { v: "6", l: "Nye bedrifter i 2025" },
      { v: "1967", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══════════════════════════════════════
   KRISTIANSAND CONFIG
   ═══════════════════════════════════════ */
export const KRISTIANSAND_CONFIG: CityConfig = {
  slug: "kristiansand",
  navn: "Kristiansand",
  netteier: "Agder Energi Nett",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 300 – 3 000", beskrivelse: "Eldre boliger i Posebyen og Lund har ofte behov for flere stikkontakter og oppgradering.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "20 000 – 38 000", beskrivelse: "Kristiansands eldre trehusbebyggelse i Posebyen og sentrum trenger moderne sikringsskap.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 500 – 5 000", beskrivelse: "Systematisk gjennomgang av hele anlegget. Viktig i sommerbyen der mange fritidsboliger brukes sesongvis.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "700 – 1 300 / punkt", beskrivelse: "God belysning øker trivsel og boligverdi. Populært ved oppussing i Kristiansands boligområder.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "65 000 – 230 000", beskrivelse: "Full oppgradering med nytt skap, kurser og kabling. Leilighet fra 65 000, enebolig fra 90 000.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 600 – 4 000", beskrivelse: "Kystklima med salt og fukt kan påvirke eldre anlegg. Feilsøking krever erfaring med lokale forhold.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "10 000 – 100 000", beskrivelse: "Voksende etterspørsel i nye prosjekter på Bjørndalen, Justvik og Søm.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Oppussing av eldre boliger i Posebyen og Lund krever oppdatering av el-anlegget til NEK 400.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 750, prisMax: 1200, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 450, prisMax: 1300, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1300, prisMax: 3000, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 700, prisMax: 1300, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 20000, prisMax: 38000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 9000, prisMax: 28000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2500, prisMax: 5000, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1600, prisMax: 4000, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 10000, prisMax: 40000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 65000, prisMax: 140000, enhet: "per prosjekt" },
  ],
  market: {
    total: 101,
    selskapsform: [
      { label: "Aksjeselskap", value: 68, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 28, color: "#fbbf24" },
      { label: "Øvrige", value: 5, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "On & Offshore Serv.", value: 158, color: "#f97316" },
      { label: "Elektroxperten", value: 111, color: "#fb923c" },
      { label: "Avitell", value: 110, color: "#fdba74" },
      { label: "EK Elektro", value: 28, color: "#fed7aa" },
      { label: "Fiber Line", value: 25, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Kristiansand (46xx)", value: 101, color: "#f97316" },
    ],
    bottomStats: [
      { v: "101", l: "Registrerte bedrifter" },
      { v: "694", l: "Sysselsatte i bransjen" },
      { v: "7", l: "Nye bedrifter i 2025" },
      { v: "1978", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══════════════════════════════════════
   DRAMMEN CONFIG
   ═══════════════════════════════════════ */
export const DRAMMEN_CONFIG: CityConfig = {
  slug: "drammen",
  navn: "Drammen",
  netteier: "Glitre Nett",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 300 – 3 100", beskrivelse: "Mange eldre boliger langs Drammenselva og på Bragernes har behov for flere stikkontakter.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "20 000 – 38 000", beskrivelse: "Eldre boligmasse fra etterkrigstiden på Konnerud og Åssiden trenger moderne sikringsskap.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 500 – 5 000", beskrivelse: "Systematisk gjennomgang. Drammen har mye boligbygging og oppussing som krever kontroll.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "700 – 1 300 / punkt", beskrivelse: "LED-spotter og moderne belysning er populært i Drammens mange oppgraderingsprosjekter.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "65 000 – 230 000", beskrivelse: "Full oppgradering. Drammen er i sterk vekst med byfornyelse langs elvebredden.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 600 – 4 000", beskrivelse: "Feilsøking med spesialisert måleutstyr. Viktig i eldre anlegg som ikke tåler dagens belastning.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "10 000 – 100 000", beskrivelse: "Voksende etterspørsel i nye leilighetsprosjekter langs Drammenselva og på Gulskogen.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Byfornyelsen i Drammen driver massiv oppussingsaktivitet med behov for elektrisk oppgradering.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 750, prisMax: 1200, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 450, prisMax: 1300, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1300, prisMax: 3100, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 700, prisMax: 1300, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 20000, prisMax: 38000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 9000, prisMax: 28000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2500, prisMax: 5000, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1600, prisMax: 4000, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 10000, prisMax: 40000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 65000, prisMax: 145000, enhet: "per prosjekt" },
  ],
  market: {
    total: 104,
    selskapsform: [
      { label: "Aksjeselskap", value: 78, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 24, color: "#fbbf24" },
      { label: "Øvrige", value: 2, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "Powertech", value: 266, color: "#f97316" },
      { label: "Ing. Ivar Pettersen", value: 236, color: "#fb923c" },
      { label: "Abicon Elektro", value: 76, color: "#fdba74" },
      { label: "Powertech Eng.", value: 69, color: "#fed7aa" },
      { label: "Norsk Brannvern", value: 54, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Drammen (30xx)", value: 104, color: "#f97316" },
    ],
    bottomStats: [
      { v: "104", l: "Registrerte bedrifter" },
      { v: "1 042", l: "Sysselsatte i bransjen" },
      { v: "10", l: "Nye bedrifter i 2025" },
      { v: "1967", l: "Eldste aktivt firma" },
    ],
  },
};

/* ═══════════════════════════════════════
   FREDRIKSTAD CONFIG
   ═══════════════════════════════════════ */
export const FREDRIKSTAD_CONFIG: CityConfig = {
  slug: "fredrikstad",
  navn: "Fredrikstad",
  netteier: "Elvia",
  tjenester: [
    { id: "stikkontakt", tittel: "Stikkontakter og brytere", pris: "1 200 – 2 800", beskrivelse: "Gamlebyen og eldre boligområder i Fredrikstad har ofte behov for flere stikkontakter.", color: "from-blue-500/10 to-blue-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "sikringsskap", tittel: "Oppgradering sikringsskap", pris: "18 000 – 35 000", beskrivelse: "Mange etterkrigsboliger på Selbak, Lisleby og Gressvik har utdaterte sikringsskap.", color: "from-orange-500/10 to-orange-600/5", href: "/tjenester/bytte-sikringsskap" },
    { id: "elkontroll", tittel: "Elkontroll bolig", pris: "2 300 – 4 500", beskrivelse: "Systematisk gjennomgang. Viktig ved boligkjøp og salg i Fredrikstads aktive boligmarked.", color: "from-green-500/10 to-green-600/5", href: "/tjenester/elkontroll" },
    { id: "spotter", tittel: "Spotter og belysning", pris: "650 – 1 200 / punkt", beskrivelse: "Moderne belysning er populært ved oppussing. Fredrikstad har noe lavere priser enn storbyen.", color: "from-yellow-500/10 to-yellow-600/5", href: "/tjenester/installere-belysning-spotter" },
    { id: "oppgradering", tittel: "Oppgradering anlegg", pris: "60 000 – 200 000", beskrivelse: "Full oppgradering med nytt skap, kurser og kabling. Leilighet fra 60 000, enebolig fra 85 000.", color: "from-purple-500/10 to-purple-600/5", href: "/guider/hva-koster-elektriker" },
    { id: "feilsoking", tittel: "Feilsøking strøm", pris: "1 500 – 3 800", beskrivelse: "Feilsøking av strømproblemer. Mange eldre anlegg i Fredrikstad er ikke dimensjonert for dagens bruk.", color: "from-red-500/10 to-red-600/5", href: "/tjenester/feilsoking-strom" },
    { id: "smarthus", tittel: "Smarthus installasjon", pris: "10 000 – 90 000", beskrivelse: "Voksende etterspørsel etter smarthus, spesielt i nye prosjekter langs elva og på Værste.", color: "from-cyan-500/10 to-cyan-600/5", href: "/tjenester/smarthus-installasjon" },
    { id: "renovering", tittel: "Renovering anlegg", pris: "Varierer", beskrivelse: "Fredrikstad har mye oppussingsaktivitet i etablerte boligområder fra 1950–1980-tallet.", color: "from-amber-500/10 to-amber-600/5", href: "/guider/hva-koster-elektriker" },
  ],
  emergencies: SHARED_EMERGENCIES,
  problemer: SHARED_PROBLEMS,
  priser: [
    { tjeneste: "Elektriker timepris", prisMin: 700, prisMax: 1100, enhet: "per time" },
    { tjeneste: "Utrykningsgebyr", prisMin: 400, prisMax: 1200, enhet: "per oppdrag" },
    { tjeneste: "Installasjon stikkontakt", prisMin: 1200, prisMax: 2800, enhet: "per punkt" },
    { tjeneste: "Montering spotter", prisMin: 650, prisMax: 1200, enhet: "per punkt" },
    { tjeneste: "Oppgradering sikringsskap", prisMin: 18000, prisMax: 35000, enhet: "per prosjekt", popular: true },
    { tjeneste: "Installasjon elbillader", prisMin: 8000, prisMax: 25000, enhet: "per installasjon", popular: true },
    { tjeneste: "Elkontroll bolig", prisMin: 2300, prisMax: 4500, enhet: "per kontroll" },
    { tjeneste: "Feilsøking strøm", prisMin: 1500, prisMax: 3800, enhet: "per oppdrag" },
    { tjeneste: "Smarthus grunnpakke", prisMin: 10000, prisMax: 35000, enhet: "per prosjekt" },
    { tjeneste: "Komplett oppgradering (leilighet)", prisMin: 60000, prisMax: 130000, enhet: "per prosjekt" },
  ],
  market: {
    total: 79,
    selskapsform: [
      { label: "Aksjeselskap", value: 45, color: "#f97316" },
      { label: "Enkeltpersonfirma", value: 30, color: "#fbbf24" },
      { label: "Øvrige", value: 4, color: "#cbd5e1" },
    ],
    topBedrifter: [
      { label: "Installatøren Frstad", value: 134, color: "#f97316" },
      { label: "Storm Elektro", value: 107, color: "#fb923c" },
      { label: "ZK Elektro", value: 34, color: "#fdba74" },
      { label: "Slevik Elektriske", value: 26, color: "#fed7aa" },
      { label: "Elektrikertjen. S-F", value: 17, color: "#ffedd5" },
    ],
    omrader: [
      { label: "Fredrikstad (16xx)", value: 79, color: "#f97316" },
    ],
    bottomStats: [
      { v: "79", l: "Registrerte bedrifter" },
      { v: "378", l: "Sysselsatte i bransjen" },
      { v: "2", l: "Nye bedrifter i 2025" },
      { v: "1991", l: "Eldste aktivt firma" },
    ],
  },
};
