"use client";
import { useState } from "react";
import Link from "next/link";
import type { CityTjeneste } from "@/data/city-configs";

/* SVG icon map by service id */
const ICON_MAP: Record<string, React.ReactNode> = {
  stikkontakt: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="11" r="1.5"/><circle cx="15" cy="11" r="1.5"/><path d="M9 16h6"/></svg>,
  sikringsskap: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>,
  elkontroll: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  spotter: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  oppgradering: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  feilsoking: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  smarthus: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  renovering: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
};

export default function CityTjenesterGrid({ tjenester }: { tjenester: CityTjeneste[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tjenester.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          className="group relative overflow-hidden rounded-16 border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-primary-300 hover:shadow-card-lg hover:-translate-y-0.5"
          onMouseEnter={() => setHoveredId(t.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <div className="relative">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-11 h-11 rounded-12 bg-neutral-50 group-hover:bg-white flex items-center justify-center text-secondary-400 group-hover:text-primary-500 transition-colors duration-300 flex-shrink-0">
                {ICON_MAP[t.id] || ICON_MAP.feilsoking}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-[0.75rem] font-bold text-primary-600">{t.pris}</div>
                <div className="text-[0.6rem] text-secondary-400">kr inkl. mva</div>
              </div>
            </div>
            <h3 className="font-display font-semibold text-[0.95rem] text-secondary-900 group-hover:text-primary-700 transition-colors mb-1.5">{t.tittel}</h3>
            <p className="text-[0.8rem] text-secondary-500 leading-relaxed">{t.beskrivelse}</p>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
