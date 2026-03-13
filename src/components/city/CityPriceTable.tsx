"use client";
import { useState } from "react";
import type { CityPrisRad } from "@/data/city-configs";

const ICON_MAP: Record<string, React.ReactNode> = {
  "Elektriker timepris": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  "Utrykningsgebyr": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  "Installasjon stikkontakt": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/></svg>,
  "Montering spotter": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="18" x2="15" y2="18"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5"/></svg>,
  "Oppgradering sikringsskap": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  "Installasjon elbillader": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  "Elkontroll bolig": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  "Feilsøking strøm": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  "Smarthus grunnpakke": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  "Komplett oppgradering (leilighet)": <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
};

const defaultIcon = <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;

function fmt(n: number) { return n.toLocaleString("nb-NO"); }

export default function CityPriceTable({ priser, cityName }: { priser: CityPrisRad[]; cityName: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxPrice = Math.max(...priser.map(p => p.prisMax));

  return (
    <div className="my-8">
      <div className="bg-white border border-neutral-200 rounded-20 overflow-hidden shadow-card-sm">
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 px-5 py-4 sm:px-6 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-[1rem] text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              Prisguide {cityName} 2026
            </h3>
            <p className="text-[0.7rem] text-secondary-400 mt-0.5">Veiledende priser inkl. mva</p>
          </div>
        </div>
        <div className="divide-y divide-neutral-100">
          {priser.map((p, i) => {
            const barW = (p.prisMax / maxPrice) * 100;
            const minW = (p.prisMin / maxPrice) * 100;
            const isH = hovered === i;
            return (
              <div key={p.tjeneste} className={`px-5 sm:px-6 py-3.5 transition-colors duration-200 cursor-default ${isH ? "bg-primary-50/50" : i % 2 === 0 ? "bg-white" : "bg-neutral-50/30"}`} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex-shrink-0 transition-colors ${isH ? "text-primary-500" : "text-secondary-400"}`}>{ICON_MAP[p.tjeneste] || defaultIcon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.85rem] font-medium text-secondary-900 truncate">{p.tjeneste}</span>
                      {p.popular && <span className="text-[0.55rem] font-bold uppercase tracking-wider bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full flex-shrink-0">Populær</span>}
                    </div>
                    <span className="text-[0.65rem] text-secondary-400">{p.enhet}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-[0.8rem] font-bold text-secondary-900">{fmt(p.prisMin)} – {fmt(p.prisMax)}</div>
                    <div className="text-[0.6rem] text-secondary-400">kr</div>
                  </div>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden ml-7">
                  <div className="h-full rounded-full relative" style={{ width: `${barW}%` }}>
                    <div className="absolute inset-y-0 left-0 bg-primary-200 rounded-full" style={{ width: `${(minW / barW) * 100}%` }} />
                    <div className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all duration-300" style={{ width: isH ? "100%" : `${(minW / barW) * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-neutral-50 px-5 sm:px-6 py-3 border-t border-neutral-100">
          <p className="text-[0.7rem] text-secondary-400">Veiledende priser for {cityName}. Faktisk pris avhenger av bedrift, oppdrag og tidspunkt. Alle priser inkluderer moms.</p>
        </div>
      </div>
    </div>
  );
}
