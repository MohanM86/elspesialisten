"use client";

import { useState } from "react";
import { LayoutGrid, ChevronRight, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn, formatPrisIntervall } from "@/lib/utils";
import Link from "next/link";

type Step = "alder" | "type" | "kurser" | "resultat";

interface CalcState {
  alder: "under10" | "10-30" | "over30" | "";
  boligType: "leilighet" | "enebolig" | "rekkehus" | "bedrift" | "";
  kurser: number;
  heving: boolean;
}

type Anbefaling = "skift" | "oppgrader" | "ok";

function beregnSikring(state: CalcState): { anbefaling: Anbefaling; prisMin: number; prisMax: number; beskrivelse: string } {
  if (state.alder === "over30") {
    return { anbefaling: "skift", prisMin: 12000, prisMax: 35000, beskrivelse: "Anlegg eldre enn 30 år bør skiftes ut. Gammel installasjon er den vanligste brannårsaken i norske boliger." };
  }
  if (state.alder === "10-30") {
    const prisMin = 8000 + (state.kurser > 12 ? 3000 : 0);
    const prisMax = 20000 + (state.kurser > 12 ? 8000 : 0);
    return { anbefaling: "oppgrader", prisMin, prisMax, beskrivelse: "Anlegget kan oppgraderes med jordfeilbrytere og automatsikringer uten full utskifting." };
  }
  return { anbefaling: "ok", prisMin: 0, prisMax: 0, beskrivelse: "Anlegget ser ut til å være i god stand. El kontroll anbefales likevel hvert 10. år." };
}

/* SVG icons for age selection */
function IconOk() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconWarn() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><path d="M12 3L2 21h20L12 3z" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 10v4M12 17h.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function IconDanger() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>;
}

/* Bolig SVG icons */
function IconEnebolig() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
}
function IconRekkehus() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="2" y="7" width="8" height="14" rx="1"/><rect x="10" y="4" width="8" height="17" rx="1"/><path d="M6 14v3M14 10v3"/></svg>;
}
function IconLeilighet() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6"/></svg>;
}
function IconBedrift() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v2"/></svg>;
}

const ALDER_OPTIONS = [
  { value: "under10" as const, label: "Under 10 år",  icon: <IconOk />,     desc: "Sannsynligvis moderne" },
  { value: "10-30" as const,   label: "10–30 år",     icon: <IconWarn />,   desc: "Bør sjekkes" },
  { value: "over30" as const,  label: "Over 30 år",   icon: <IconDanger />, desc: "Bør byttes" },
];

const BOLIG_OPTIONS = [
  { value: "enebolig"  as const, label: "Enebolig",   icon: <IconEnebolig /> },
  { value: "rekkehus"  as const, label: "Rekkehus",   icon: <IconRekkehus /> },
  { value: "leilighet" as const, label: "Leilighet",  icon: <IconLeilighet /> },
  { value: "bedrift"   as const, label: "Bedrift",    icon: <IconBedrift /> },
];

export default function SikringsskapeKalkulator({ className }: { className?: string }) {
  const [step, setStep] = useState<Step>("alder");
  const [state, setState] = useState<CalcState>({ alder: "", boligType: "", kurser: 10, heving: false });

  const STEPS: Step[] = ["alder", "type", "kurser", "resultat"];
  const stepIdx = STEPS.indexOf(step);
  const result = step === "resultat" && state.alder ? beregnSikring(state) : null;

  return (
    <div className={cn("calc-surface p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-12 bg-secondary-900 flex items-center justify-center">
          <LayoutGrid className="w-5 h-5 text-white" aria-hidden />
        </div>
        <div>
          <h3 className="font-display font-bold text-heading-md text-secondary-950">Sikringsskap kalkulator</h3>
          <p className="text-caption text-secondary-500">Bør du bytte eller oppgradere?</p>
        </div>
      </div>
      <div className="mb-7">
        <div className="flex justify-between text-caption text-secondary-400 mb-1.5"><span>Steg {Math.min(stepIdx + 1, 3)} av 3</span><span>{Math.round((Math.min(stepIdx, 3) / 3) * 100)}%</span></div>
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full bg-secondary-800 rounded-full transition-all duration-500" style={{ width: `${(Math.min(stepIdx, 3) / 3) * 100}%` }} /></div>
      </div>

      {step === "alder" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Hvor gammelt er sikringsskapet?</p>
          <div className="space-y-3">
            {ALDER_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { setState((s) => ({ ...s, alder: opt.value })); setStep("type"); }}
                className={cn("w-full rounded-12 border-2 p-4 text-left flex items-center gap-4 transition-all hover:border-primary-400", state.alder === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                {opt.icon}
                <div><div className="font-semibold text-secondary-900">{opt.label}</div><div className="text-caption text-secondary-500">{opt.desc}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "type" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Hva slags bolig/bygg er det?</p>
          <div className="grid grid-cols-2 gap-3">
            {BOLIG_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { setState((s) => ({ ...s, boligType: opt.value })); setStep("kurser"); }}
                className={cn("rounded-12 border-2 p-4 text-center transition-all hover:border-primary-400", state.boligType === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                <div className="flex justify-center mb-1">{opt.icon}</div>
                <div className="text-label text-secondary-800">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "kurser" && (
        <div className="animate-fade-in space-y-5">
          <div>
            <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Omtrent hvor mange kurser (sikringer) har du?</p>
            <div className="flex items-center justify-between mb-2"><span className="text-body-sm text-secondary-600">Antall kurser</span><span className="font-mono font-bold text-price-lg text-secondary-900">{state.kurser}</span></div>
            <input type="range" min={4} max={30} value={state.kurser} onChange={(e) => setState((s) => ({ ...s, kurser: Number(e.target.value) }))} className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary-800" />
            <div className="flex justify-between text-caption text-secondary-400 mt-1"><span>4 kurser</span><span>30 kurser</span></div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={state.heving} onChange={(e) => setState((s) => ({ ...s, heving: e.target.checked }))} />
              <div className={cn("w-5 h-5 rounded-6 border-2 flex items-center justify-center transition-all", state.heving ? "bg-secondary-800 border-secondary-800" : "border-neutral-300")}>{state.heving && <CheckCircle className="w-3 h-3 text-white" />}</div>
            </div>
            <div><div className="text-body-sm font-medium text-secondary-800">Ønsker å heve kapasiteten</div><div className="text-caption text-secondary-500">For eksempel for elbillader eller varmepumpe</div></div>
          </label>
          <div className="flex items-start gap-2 bg-accent-50 border border-accent-200 rounded-10 p-3">
            <Info className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" aria-hidden />
            <p className="text-caption text-accent-800">Vet du ikke? En elektriker teller alltid opp og vurderer kapasiteten under befaring.</p>
          </div>
          <button type="button" onClick={() => setStep("resultat")} className="btn-primary w-full justify-center">Se estimat <ChevronRight className="w-4 h-4" /></button>
        </div>
      )}

      {step === "resultat" && result && (
        <div className="animate-fade-in">
          <div className={cn("rounded-16 p-5 mb-5 flex items-start gap-3", result.anbefaling === "skift" && "bg-error-50 border border-error-100", result.anbefaling === "oppgrader" && "bg-accent-50 border border-accent-200", result.anbefaling === "ok" && "bg-success-50 border border-success-100")}>
            {result.anbefaling === "skift" && <AlertTriangle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" aria-hidden />}
            {result.anbefaling === "oppgrader" && <Info className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" aria-hidden />}
            {result.anbefaling === "ok" && <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" aria-hidden />}
            <div>
              <div className={cn("font-display font-bold text-heading-sm mb-1", result.anbefaling === "skift" && "text-error-700", result.anbefaling === "oppgrader" && "text-accent-700", result.anbefaling === "ok" && "text-success-700")}>
                {result.anbefaling === "skift" && "Anbefaling: Bytt sikringsskapet"}
                {result.anbefaling === "oppgrader" && "Anbefaling: Oppgrader sikringsskapet"}
                {result.anbefaling === "ok" && "Sikringsskapet ser OK ut"}
              </div>
              <p className="text-body-sm text-secondary-700">{result.beskrivelse}</p>
            </div>
          </div>
          {result.prisMin > 0 && (
            <div className="calc-result mb-5"><p className="text-label text-primary-600 mb-1">Estimert kostnad</p><div className="calc-price">{formatPrisIntervall(result.prisMin, result.prisMax)}</div><p className="text-caption text-secondary-500 mt-1">Veiledende, avhenger av størrelse og materiell</p></div>
          )}
          <Link href="/kontakt?type=sikringsskap" className="btn-primary w-full justify-center mb-3">Få gratis tilbud på utskifting <ChevronRight className="w-4 h-4" /></Link>
          <button type="button" onClick={() => { setStep("alder"); setState({ alder: "", boligType: "", kurser: 10, heving: false }); }} className="btn-ghost w-full justify-center">Start på nytt</button>
        </div>
      )}
    </div>
  );
}
