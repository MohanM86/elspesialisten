"use client";

import { useState } from "react";
import { Calculator, ChevronRight, Info } from "lucide-react";
import { cn, formatPrisIntervall, hasteMultiplier } from "@/lib/utils";
import Link from "next/link";
import type { OppdragType, Hastegrad } from "@/types";

const OPPDRAG_PRISER: Record<string, { min: number; max: number; enhet: string }> = {
  elbillader:   { min: 3500,  max: 18000, enhet: "per installasjon" },
  sikringsskap: { min: 8000,  max: 35000, enhet: "per prosjekt" },
  varmekabler:  { min: 3000,  max: 20000, enhet: "per rom" },
  belysning:    { min: 1500,  max: 15000, enhet: "per oppdrag" },
  smarthus:     { min: 5000,  max: 80000, enhet: "per prosjekt" },
  feilsoking:   { min: 1500,  max: 8000,  enhet: "per oppdrag" },
  akutt:        { min: 2500,  max: 12000, enhet: "per utrykning" },
  elkontroll:   { min: 2500,  max: 8000,  enhet: "per kontroll" },
  "nytt-anlegg":{ min: 15000, max: 80000, enhet: "per prosjekt" },
  annet:        { min: 1200,  max: 5000,  enhet: "per time" },
};

const OPPDRAG_LABELS: Record<string, string> = {
  elbillader:   "Elbillader / ladeboks",
  sikringsskap: "Bytte sikringsskap",
  varmekabler:  "Varmekabler",
  belysning:    "Belysning og spotter",
  smarthus:     "Smarthus installasjon",
  feilsoking:   "Feilsøking",
  akutt:        "Akutt utrykning",
  elkontroll:   "El kontroll",
  "nytt-anlegg":"Nytt elektrisk anlegg",
  annet:        "Annet",
};

const HASTEGRAD_LABELS: Record<string, string> = {
  planlagt:    "Planlagt (normal pris)",
  "innen-uken":"Innen uken (+15%)",
  akutt:       "Akutt / haster (+40%)",
};

export default function PrisKalkulator({ className }: { className?: string }) {
  const [oppdrag, setOppdrag]     = useState<OppdragType | "">("");
  const [hastegrad, setHastegrad] = useState<Hastegrad>("planlagt");
  const [showResult, setShowResult] = useState(false);

  const basePrice = oppdrag ? OPPDRAG_PRISER[oppdrag] : null;
  const multiplier = hasteMultiplier(hastegrad);
  const result = basePrice
    ? { min: Math.round((basePrice.min * multiplier) / 100) * 100, max: Math.round((basePrice.max * multiplier) / 100) * 100, enhet: basePrice.enhet }
    : null;

  return (
    <div className={cn("calc-surface p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-12 bg-accent-500 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" aria-hidden />
        </div>
        <div>
          <h3 className="font-display font-bold text-heading-md text-secondary-950">Elektriker priskalkulator</h3>
          <p className="text-caption text-secondary-500">Estimert pris på ditt oppdrag</p>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label className="label label-required" htmlFor="kalk-oppdrag">Type oppdrag</label>
          <select id="kalk-oppdrag" className="select" value={oppdrag} onChange={(e) => { setOppdrag(e.target.value as OppdragType); setShowResult(false); }}>
            <option value="" disabled>Velg type oppdrag</option>
            {Object.entries(OPPDRAG_LABELS).map(([val, label]) => (<option key={val} value={val}>{label}</option>))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="kalk-hastegrad">Hastegrad</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(Object.entries(HASTEGRAD_LABELS) as [Hastegrad, string][]).map(([val, label]) => (
              <button key={val} type="button" onClick={() => { setHastegrad(val); setShowResult(false); }}
                className={cn("rounded-10 border-2 px-3 py-2.5 text-left text-label transition-all", hastegrad === val ? "border-accent-500 bg-accent-50 text-accent-700" : "border-neutral-200 text-secondary-600 hover:border-neutral-300")}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" disabled={!oppdrag} onClick={() => setShowResult(true)} className={cn("btn-accent w-full justify-center", !oppdrag && "opacity-50 cursor-not-allowed shadow-none")}>
          <Calculator className="w-4 h-4" />Beregn estimat
        </button>
        {showResult && result && (
          <div className="animate-fade-in">
            <div className="calc-result"><p className="text-label text-primary-600 mb-1">Estimert kostnad</p><div className="calc-price">{formatPrisIntervall(result.min, result.max)}</div><p className="text-caption text-secondary-500 mt-1">{result.enhet} inkl. arbeid</p></div>
            {hastegrad !== "planlagt" && (
              <div className="flex items-start gap-2 bg-accent-50 border border-accent-200 rounded-10 p-3 mt-3">
                <Info className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" aria-hidden />
                <p className="text-caption text-accent-800">Hasteoppdrag koster mer. Planlegg i god tid for å spare penger.</p>
              </div>
            )}
            <Link href={`/kontakt?type=${oppdrag}`} className="btn-primary w-full justify-center mt-4">Få gratis tilbud <ChevronRight className="w-4 h-4" /></Link>
          </div>
        )}
        <p className="text-caption text-secondary-400 text-center">* Priser er veiledende. Faktisk pris avhenger av din situasjon.</p>
      </div>
    </div>
  );
}
