"use client";
import { useState } from "react";

/* ═══════════════════════════════════════
   OSLO PROBLEM CARDS
   Common electrical problems with diagnosis
   ═══════════════════════════════════════ */

interface Problem {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  solution: string;
  danger: "low" | "medium" | "high";
}

const PROBLEMS: Problem[] = [
  {
    id: "sikring-gaar",
    title: "Sikringen går hele tiden",
    symptom: "En eller flere sikringer løser ut gjentatte ganger",
    cause: "Vanligste årsak er overbelastning: for mange apparater på samme kurs. Kan også skyldes jordfeil i et apparat eller feil i det faste anlegget.",
    solution: "Fordel belastningen på flere kurser, eller la en elektriker legge nye kurser.",
    danger: "medium",
  },
  {
    id: "stikkontakt",
    title: "Stikkontakt virker ikke",
    symptom: "Ingen strøm i én eller flere stikkontakter",
    cause: "Sikring kan være utløst, kontakten kan være ødelagt, eller koblingen kan være løs. En defekt stikkontakt med varmgang er brannfarlig.",
    solution: "Sjekk sikring først. Hvis ikke utløst: kontakt elektriker. Aldri åpne kontakten selv.",
    danger: "medium",
  },
  {
    id: "delvis-strom",
    title: "Strømmen går i deler av huset",
    symptom: "Noen rom har strøm, andre ikke",
    cause: "En enkelt kurs har feilet. Kan skyldes overbelastning, kortslutning eller løs kobling.",
    solution: "Identifiser hvilken sikring som er utløst. Kontakt elektriker hvis problemet gjentar seg.",
    danger: "low",
  },
  {
    id: "gammelt-skap",
    title: "Gammelt sikringsskap",
    symptom: "Skrusikringer, ingen jordfeilbryter, synlig slitasje",
    cause: "Sikringsskap fra før 1980 mangler moderne sikkerhetsfunksjoner. En av de vanligste brannårsakene i Norge.",
    solution: "Oppgrader til moderne sikringsskap med automatsikringer og jordfeilbrytere. Kost: 25 000–45 000 kr.",
    danger: "high",
  },
  {
    id: "varmgang",
    title: "Varmgang i stikkontakt",
    symptom: "Varm eller misfarget stikkontakt/bryter",
    cause: "Løs kobling, for høy belastning eller feil dimensjonering. Alvorlig brannfare.",
    solution: "Koble fra alt umiddelbart. Kontakt elektriker. IKKE bruk kontakten igjen før den er kontrollert.",
    danger: "high",
  },
];

const DANGER_COLORS = {
  low: { dot: "bg-blue-500", bg: "hover:bg-blue-50", label: "Vanlig" },
  medium: { dot: "bg-amber-500", bg: "hover:bg-amber-50", label: "Obs" },
  high: { dot: "bg-red-500", bg: "hover:bg-red-50", label: "Farlig" },
};

export default function OsloProblemCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="my-6">
      <div className="bg-white border border-neutral-200 rounded-20 overflow-hidden shadow-card-sm divide-y divide-neutral-100">
        {PROBLEMS.map((p) => {
          const d = DANGER_COLORS[p.danger];
          const isOpen = expanded === p.id;

          return (
            <div key={p.id} className={`transition-colors duration-200 ${d.bg}`}>
              <button
                onClick={() => setExpanded(isOpen ? null : p.id)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left"
              >
                {/* Danger indicator */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${d.dot}`} />
                  <span className="text-[0.5rem] text-secondary-400 uppercase tracking-wider">{d.label}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-[0.9rem] text-secondary-900">{p.title}</h4>
                  <p className="text-[0.75rem] text-secondary-500 mt-0.5">{p.symptom}</p>
                </div>

                <svg
                  className={`w-5 h-5 text-secondary-300 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-5 pb-5 pt-0 ml-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-neutral-50 rounded-12 p-3">
                      <div className="text-[0.65rem] font-bold text-secondary-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        Årsak
                      </div>
                      <p className="text-[0.8rem] text-secondary-600 leading-relaxed">{p.cause}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-12 p-3">
                      <div className="text-[0.65rem] font-bold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Løsning
                      </div>
                      <p className="text-[0.8rem] text-secondary-600 leading-relaxed">{p.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
