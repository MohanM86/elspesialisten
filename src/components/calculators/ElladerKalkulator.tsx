"use client";

import { useState } from "react";
import { Zap, ChevronRight, Info } from "lucide-react";
import { cn, formatPrisIntervall } from "@/lib/utils";
import Link from "next/link";

type Step = "boligtype" | "sikring" | "avstand" | "lader" | "resultat";

/* Inline SVG icons replacing emoji */
function IconEnebolig() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
}
function IconRekkehus() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="2" y="7" width="8" height="14" rx="1"/><rect x="10" y="4" width="8" height="17" rx="1"/><path d="M6 14v3M14 10v3"/></svg>;
}
function IconLeilighet() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6"/></svg>;
}
function IconHytte() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M22 19L12 3 2 19h20z"/><path d="M9 19v-4h6v4"/></svg>;
}
function IconBedrift() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v2"/></svg>;
}

const BOLIG_OPTIONS = [
  { value: "enebolig",   label: "Enebolig",   icon: <IconEnebolig /> },
  { value: "rekkehus",   label: "Rekkehus",   icon: <IconRekkehus /> },
  { value: "leilighet",  label: "Leilighet",  icon: <IconLeilighet /> },
  { value: "hytte",      label: "Hytte",      icon: <IconHytte /> },
  { value: "bedrift",    label: "Bedrift/næring", icon: <IconBedrift /> },
];

const LADER_OPTIONS = [
  { value: "enkel", label: "Enkel 1 fase",  desc: "7.4 kW, god for de fleste",  prisAdd: 0,    ampere: "32A" },
  { value: "smart", label: "Smart 1 fase",  desc: "7.4 kW + appstyring",        prisAdd: 1500, ampere: "32A" },
  { value: "3fase", label: "3 fase 22 kW",  desc: "Raskest lading",             prisAdd: 4000, ampere: "32A 3F" },
];

function beregnPris(state: { boligtype: string; sikring: string; avstand: number; lader: string }) {
  let baseMin = 4000;
  let baseMax = 7000;
  if (state.sikring === "gammelt") { baseMin += 5000; baseMax += 12000; }
  else if (state.sikring === "usikker") { baseMin += 2000; baseMax += 6000; }
  const kabelMin = Math.max(0, state.avstand - 5) * 150;
  const kabelMax = Math.max(0, state.avstand - 5) * 280;
  baseMin += kabelMin;
  baseMax += kabelMax;
  const lader = LADER_OPTIONS.find((l) => l.value === state.lader);
  if (lader) { baseMin += lader.prisAdd; baseMax += lader.prisAdd + 500; }
  if (state.boligtype === "leilighet") { baseMin += 2000; baseMax += 5000; }
  if (state.boligtype === "bedrift")   { baseMin += 3000; baseMax += 8000; }
  return { min: Math.round(baseMin / 100) * 100, max: Math.round(baseMax / 100) * 100 };
}

export default function ElladerKalkulator({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState<Step>("boligtype");
  const [state, setState] = useState({ boligtype: "", sikring: "ok", avstand: 5, lader: "enkel" });

  const STEPS: Step[] = ["boligtype", "sikring", "avstand", "lader", "resultat"];
  const stepIdx = STEPS.indexOf(currentStep);
  const prisResult = currentStep === "resultat" ? beregnPris(state) : null;

  function next(nextStep: Step) { setCurrentStep(nextStep); }

  return (
    <div className={cn("calc-surface p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-12 bg-primary-500 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white fill-white" aria-hidden />
        </div>
        <div>
          <h3 className="font-display font-bold text-heading-md text-secondary-950">Elbillader kalkulator</h3>
          <p className="text-caption text-secondary-500">Få prisestimat på 30 sekunder</p>
        </div>
      </div>
      <div className="mb-7">
        <div className="flex justify-between text-caption text-secondary-400 mb-1.5">
          <span>Steg {Math.min(stepIdx + 1, 4)} av 4</span>
          <span>{Math.round((Math.min(stepIdx, 4) / 4) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${(Math.min(stepIdx, 4) / 4) * 100}%` }} />
        </div>
      </div>

      {currentStep === "boligtype" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Hva er boligtypen din?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BOLIG_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { setState((s) => ({ ...s, boligtype: opt.value })); next("sikring"); }}
                className={cn("rounded-12 border-2 p-4 text-center transition-all duration-150 hover:border-primary-400", state.boligtype === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                <div className="flex justify-center mb-1">{opt.icon}</div>
                <div className="text-label text-secondary-800">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "sikring" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Hvordan er sikringsskapet?</p>
          <div className="space-y-3">
            {[
              { value: "ok",      label: "Moderne automatsikringer", desc: "Under 15–20 år gammelt" },
              { value: "gammelt", label: "Gammelt, skrusikringer",   desc: "Må byttes eller oppgraderes" },
              { value: "usikker", label: "Vet ikke",                 desc: "Elektriker sjekker" },
            ].map((opt) => (
              <button key={opt.value} type="button" onClick={() => { setState((s) => ({ ...s, sikring: opt.value })); next("avstand"); }}
                className={cn("w-full rounded-12 border-2 p-4 text-left transition-all duration-150 hover:border-primary-400", state.sikring === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                <div className="font-semibold text-secondary-900">{opt.label}</div>
                <div className="text-caption text-secondary-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "avstand" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Omtrentlig avstand fra sikringsskap til ladepunkt?</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-secondary-600">Avstand</span>
              <span className="font-mono font-bold text-primary-600 text-price-lg">{state.avstand} m</span>
            </div>
            <input type="range" min={1} max={50} value={state.avstand} onChange={(e) => setState((s) => ({ ...s, avstand: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:shadow-cta" />
            <div className="flex justify-between text-caption text-secondary-400"><span>1 m</span><span>50 m</span></div>
            <div className="flex items-start gap-2 bg-accent-50 border border-accent-200 rounded-10 p-3">
              <Info className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" aria-hidden />
              <p className="text-caption text-accent-800">Lang kabelføring øker prisen. Under 5 m er inkludert i basisprisen.</p>
            </div>
            <button type="button" onClick={() => next("lader")} className="btn-primary w-full justify-center">Neste <ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {currentStep === "lader" && (
        <div className="animate-fade-in">
          <p className="text-heading-sm font-display font-semibold text-secondary-900 mb-4">Hvilken type lader ønsker du?</p>
          <div className="space-y-3">
            {LADER_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { setState((s) => ({ ...s, lader: opt.value })); next("resultat"); }}
                className={cn("w-full rounded-12 border-2 p-4 text-left transition-all duration-150 hover:border-primary-400 flex items-center justify-between gap-4", state.lader === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200")}>
                <div>
                  <div className="font-semibold text-secondary-900">{opt.label}</div>
                  <div className="text-caption text-secondary-500 mt-0.5">{opt.desc}</div>
                </div>
                <div className="badge-primary text-[0.7rem] flex-shrink-0">{opt.ampere}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "resultat" && prisResult && (
        <div className="animate-fade-in">
          <div className="calc-result mb-6">
            <p className="text-label text-primary-600 mb-1">Estimert totalpriser inkl. arbeid</p>
            <div className="price-value text-primary-700">{formatPrisIntervall(prisResult.min, prisResult.max)}</div>
            <p className="text-caption text-secondary-500 mt-1">* Prisene er veiledende og kan variere basert på lokale forhold.</p>
          </div>
          <div className="space-y-2 mb-6">
            {["Profesjonell installasjon av autorisert elektriker", "Alle nødvendige kabler og materiell", state.sikring === "gammelt" ? "Oppgradering av sikringsskap inkludert" : null, "Melding til DSB og netteier inkludert", "Garanti på arbeid"].filter(Boolean).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-body-sm text-secondary-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="10" fill="#ecfdf5"/><path d="M6 10l3 3 5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {item}
              </div>
            ))}
          </div>
          <Link href="/kontakt?type=elbillader" className="btn-primary w-full justify-center mb-3">Få gratis tilbud <ChevronRight className="w-4 h-4" /></Link>
          <button type="button" onClick={() => setCurrentStep("boligtype")} className="btn-ghost w-full justify-center text-[0.875rem]">Start på nytt</button>
        </div>
      )}
    </div>
  );
}
