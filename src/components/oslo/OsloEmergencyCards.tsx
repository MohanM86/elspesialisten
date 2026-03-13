"use client";
import { useState } from "react";

/* ═══════════════════════════════════════
   OSLO EMERGENCY CARDS
   Expandable cards for døgnvakt scenarios
   ═══════════════════════════════════════ */

interface EmergencyItem {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  action: string;
}

const EMERGENCIES: EmergencyItem[] = [
  {
    id: "strombrudd",
    title: "Strømbrudd",
    severity: "high",
    shortDesc: "Hele eller deler av boligen er uten strøm",
    longDesc: "Hvis hele eller deler av boligen er uten strøm og problemet ikke skyldes netteier (sjekk Elvias feilkart), kan det være intern feil som krever elektriker.",
    action: "Sjekk om hovedsikringen er utløst. Sjekk Elvias feilkart. Kontakt elektriker hvis problemet er internt.",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    id: "kortslutning",
    title: "Kortslutning",
    severity: "high",
    shortDesc: "Lysglimt, smell eller sikring løser ut umiddelbart",
    longDesc: "Lysglimt, smell eller sikring som umiddelbart løser ut igjen kan tyde på kortslutning. Ikke forsøk å koble inn igjen gjentatte ganger.",
    action: "Slå av sikringen. Ikke forsøk å koble inn igjen. Kontakt elektriker umiddelbart.",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  },
  {
    id: "jordfeil",
    title: "Jordfeil",
    severity: "medium",
    shortDesc: "Jordfeilbryter løser ut gjentatte ganger",
    longDesc: "Jordfeilbryter som løser ut beskytter mot elektrisk støt. Hvis den løser ut gjentatte ganger, trekk ut alle støpsler og koble inn én og én for å finne kilden.",
    action: "Trekk ut alle støpsler. Koble inn én og én. Ring elektriker ved vedvarende problem.",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: "brent",
    title: "Brent sikringsskap",
    severity: "critical",
    shortDesc: "Lukt av brent plast, misfarging eller varme",
    longDesc: "Lukt av brent plast, misfarging eller varme fra sikringsskapet er alvorlig og kan indikere brannfare. Slå av hovedbryteren og ring elektriker umiddelbart.",
    action: "Slå av hovedbryteren UMIDDELBART. Ved synlig røyk: ring 110 (brannvesenet). Ring elektriker.",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  },
];

const SEVERITY_STYLES = {
  critical: { bg: "bg-red-50", border: "border-red-200", icon: "bg-red-100 text-red-600", badge: "bg-red-600 text-white", badgeText: "Kritisk" },
  high: { bg: "bg-amber-50", border: "border-amber-200", icon: "bg-amber-100 text-amber-600", badge: "bg-amber-500 text-white", badgeText: "Alvorlig" },
  medium: { bg: "bg-blue-50", border: "border-blue-200", icon: "bg-blue-100 text-blue-600", badge: "bg-blue-500 text-white", badgeText: "Moderat" },
};

export default function OsloEmergencyCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3 my-6">
      {EMERGENCIES.map((e) => {
        const s = SEVERITY_STYLES[e.severity];
        const isOpen = expanded === e.id;

        return (
          <div key={e.id} className={`${s.bg} ${s.border} border rounded-16 overflow-hidden transition-all duration-300`}>
            <button
              onClick={() => setExpanded(isOpen ? null : e.id)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left"
            >
              <div className={`w-10 h-10 rounded-12 ${s.icon} flex items-center justify-center flex-shrink-0`}>
                {e.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-display font-bold text-[0.95rem] text-secondary-900">{e.title}</h4>
                  <span className={`text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.badge}`}>{s.badgeText}</span>
                </div>
                <p className="text-[0.8rem] text-secondary-500">{e.shortDesc}</p>
              </div>
              <svg
                className={`w-5 h-5 text-secondary-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Expandable content */}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-5 pb-5 pt-0">
                <div className="border-t border-neutral-200/50 pt-4 ml-14">
                  <p className="text-[0.85rem] text-secondary-600 leading-relaxed mb-3">{e.longDesc}</p>
                  <div className="bg-white/80 rounded-10 p-3 border border-neutral-200/50">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <div>
                        <div className="text-[0.7rem] font-bold text-secondary-700 uppercase tracking-wider mb-0.5">Hva du bør gjøre</div>
                        <p className="text-[0.8rem] text-secondary-600">{e.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Cost callout */}
      <div className="bg-secondary-900 text-white rounded-16 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-12 bg-primary-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        </div>
        <div>
          <div className="font-display font-bold text-[0.9rem]">Døgnvakt elektriker Oslo</div>
          <div className="text-[0.8rem] text-secondary-300">Utrykningsgebyr: 1 500 – 3 000 kr + timepris med kveld/helgetillegg</div>
        </div>
      </div>
    </div>
  );
}
