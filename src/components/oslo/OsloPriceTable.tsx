"use client";
import { useState } from "react";

/* ═══════════════════════════════════
   OSLO PRICE TABLE
   Interactive visual price comparison
   ═══════════════════════════════════ */

interface PrisRad {
  tjeneste: string;
  prisMin: number;
  prisMax: number;
  enhet: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const PRISER: PrisRad[] = [
  {
    tjeneste: "Elektriker timepris", prisMin: 850, prisMax: 1400, enhet: "per time",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    tjeneste: "Utrykningsgebyr", prisMin: 500, prisMax: 1500, enhet: "per oppdrag",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  {
    tjeneste: "Installasjon stikkontakt", prisMin: 1500, prisMax: 3500, enhet: "per punkt",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/></svg>,
  },
  {
    tjeneste: "Montering spotter", prisMin: 800, prisMax: 1500, enhet: "per punkt",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="18" x2="15" y2="18"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5"/></svg>,
  },
  {
    tjeneste: "Oppgradering sikringsskap", prisMin: 25000, prisMax: 45000, enhet: "per prosjekt", popular: true,
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  },
  {
    tjeneste: "Installasjon elbillader", prisMin: 12000, prisMax: 35000, enhet: "per installasjon", popular: true,
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    tjeneste: "Elkontroll bolig", prisMin: 3000, prisMax: 6000, enhet: "per kontroll",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
  {
    tjeneste: "Feilsøking strøm", prisMin: 2000, prisMax: 5000, enhet: "per oppdrag",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    tjeneste: "Smarthus grunnpakke", prisMin: 15000, prisMax: 50000, enhet: "per prosjekt",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  },
  {
    tjeneste: "Komplett oppgradering (leilighet)", prisMin: 80000, prisMax: 180000, enhet: "per prosjekt",
    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
  },
];

function formatKr(n: number) {
  return n.toLocaleString("nb-NO");
}

export default function OsloPriceTable() {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxPrice = Math.max(...PRISER.map((p) => p.prisMax));

  return (
    <div className="my-8">
      <div className="bg-white border border-neutral-200 rounded-20 overflow-hidden shadow-card-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 px-5 py-4 sm:px-6 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-[1rem] text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Prisguide Oslo 2026
            </h3>
            <p className="text-[0.7rem] text-secondary-400 mt-0.5">Veiledende priser inkl. mva</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[0.65rem] text-secondary-500">Basert på markedsdata</div>
          </div>
        </div>

        {/* Table body */}
        <div className="divide-y divide-neutral-100">
          {PRISER.map((p, i) => {
            const barWidth = (p.prisMax / maxPrice) * 100;
            const minWidth = (p.prisMin / maxPrice) * 100;
            const isHovered = hovered === i;

            return (
              <div
                key={p.tjeneste}
                className={`px-5 sm:px-6 py-3.5 transition-colors duration-200 cursor-default ${isHovered ? "bg-primary-50/50" : i % 2 === 0 ? "bg-white" : "bg-neutral-50/30"}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex-shrink-0 transition-colors ${isHovered ? "text-primary-500" : "text-secondary-400"}`}>
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.85rem] font-medium text-secondary-900 truncate">{p.tjeneste}</span>
                      {p.popular && (
                        <span className="text-[0.55rem] font-bold uppercase tracking-wider bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full flex-shrink-0">Populær</span>
                      )}
                    </div>
                    <span className="text-[0.65rem] text-secondary-400">{p.enhet}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-[0.8rem] font-bold text-secondary-900">{formatKr(p.prisMin)} – {formatKr(p.prisMax)}</div>
                    <div className="text-[0.6rem] text-secondary-400">kr</div>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden ml-7">
                  <div className="h-full rounded-full relative" style={{ width: `${barWidth}%` }}>
                    {/* Min range */}
                    <div className="absolute inset-y-0 left-0 bg-primary-200 rounded-full" style={{ width: `${(minWidth / barWidth) * 100}%` }} />
                    {/* Max range */}
                    <div className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all duration-300" style={{ width: isHovered ? "100%" : `${(minWidth / barWidth) * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-5 sm:px-6 py-3 border-t border-neutral-100">
          <p className="text-[0.7rem] text-secondary-400">
            Prisene er basert på markedsdata for Oslo og gjelder som veiledende. Faktisk pris avhenger av bedrift, oppdragets omfang og tidspunkt. Alle priser inkluderer moms. Innhent alltid skriftlige tilbud.
          </p>
        </div>
      </div>
    </div>
  );
}
