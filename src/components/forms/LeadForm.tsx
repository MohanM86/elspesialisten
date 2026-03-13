"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadFormData, OppdragType, Hastegrad } from "@/types";

const OPPDRAG_OPTIONS: { value: OppdragType; label: string }[] = [
  { value: "elbillader",   label: "Installere elbillader / ladeboks" },
  { value: "sikringsskap", label: "Bytte eller oppgradere sikringsskap" },
  { value: "varmekabler",  label: "Legge varmekabler" },
  { value: "belysning",    label: "Belysning og spotter" },
  { value: "smarthus",     label: "Smarthus installasjon" },
  { value: "feilsoking",   label: "Feilsøking av strøm" },
  { value: "akutt",        label: "Akutt / hasteoppdrag" },
  { value: "elkontroll",   label: "El kontroll av bolig" },
  { value: "nytt-anlegg",  label: "Nytt elektrisk anlegg" },
  { value: "annet",        label: "Annet" },
];

const HASTEGRAD_OPTIONS: { value: Hastegrad; label: string; desc: string }[] = [
  { value: "akutt",       label: "Akutt",        desc: "Trenger hjelp i dag / snarest" },
  { value: "innen-uken",  label: "Innen uken",   desc: "Innen 3–7 dager" },
  { value: "planlagt",    label: "Planlagt",      desc: "Kan vente 1–2 uker eller mer" },
];

const STEPS = ["Oppdrag", "Kontakt", "Detaljer"];

interface LeadFormProps {
  kilde?: string;
  compact?: boolean;
  className?: string;
  defaultOppdrag?: OppdragType;
}

export default function LeadForm({ kilde, compact = false, className, defaultOppdrag }: LeadFormProps) {
  const [step, setStep]           = useState(0);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    oppdragType: defaultOppdrag, hastegrad: "planlagt", samtykke: false, kilde: kilde,
  });

  function update(patch: Partial<LeadFormData>) { setFormData((prev) => ({ ...prev, ...patch })); }

  function canAdvance() {
    if (step === 0) return !!formData.oppdragType && !!formData.hastegrad;
    if (step === 1) return !!formData.navn && !!formData.telefon && !!formData.postnummer;
    if (step === 2) return !!formData.samtykke;
    return false;
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch { setError("Noe gikk galt. Prøv igjen eller ring oss direkte."); }
    finally { setLoading(false); }
  }

  if (submitted) return <SuccessState />;

  return (
    <div className={cn("calc-surface p-6 sm:p-8", className)}>
      {!compact && (
        <div className="flex items-center gap-3 mb-7">
          {STEPS.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn("step-circle text-[0.75rem]", idx < step && "step-circle-done", idx === step && "step-circle-active", idx > step && "step-circle-inactive")}>
                {idx < step ? <CheckCircle className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={cn("text-label hidden sm:block", idx === step ? "text-primary-600" : "text-secondary-400")}>{label}</span>
              {idx < STEPS.length - 1 && <div className={cn("flex-1 h-px bg-neutral-200 w-8", idx < step && "bg-success-500")} />}
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="label label-required" htmlFor="oppdragType">Hva trenger du hjelp med?</label>
            <select id="oppdragType" className="select" value={formData.oppdragType ?? ""} onChange={(e) => update({ oppdragType: e.target.value as OppdragType })}>
              <option value="" disabled>Velg type oppdrag</option>
              {OPPDRAG_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>
          <div>
            <span className="label label-required">Hvor raskt trenger du hjelp?</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {HASTEGRAD_OPTIONS.map((opt) => (
                <button key={opt.value} type="button" onClick={() => update({ hastegrad: opt.value })}
                  className={cn("rounded-12 border-2 p-3.5 text-left transition-all duration-150", formData.hastegrad === opt.value ? "border-primary-500 bg-primary-50" : "border-neutral-200 hover:border-neutral-300 bg-white")}>
                  <div className={cn("text-label font-bold", formData.hastegrad === opt.value ? "text-primary-600" : "text-secondary-800")}>{opt.label}</div>
                  <div className="text-caption text-secondary-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div><label className="label label-required" htmlFor="navn">Fullt navn</label><input id="navn" type="text" className="input" placeholder="Ola Nordmann" value={formData.navn ?? ""} onChange={(e) => update({ navn: e.target.value })} autoComplete="name" /></div>
          <div><label className="label label-required" htmlFor="telefon">Telefonnummer</label><input id="telefon" type="tel" className="input" placeholder="900 00 000" value={formData.telefon ?? ""} onChange={(e) => update({ telefon: e.target.value })} autoComplete="tel" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label label-required" htmlFor="postnummer">Postnummer</label><input id="postnummer" type="text" className="input" placeholder="0150" value={formData.postnummer ?? ""} onChange={(e) => update({ postnummer: e.target.value })} maxLength={4} autoComplete="postal-code" /></div>
            <div><label className="label" htmlFor="epost">E post (valgfri)</label><input id="epost" type="email" className="input" placeholder="ola@eksempel.no" value={formData.epost ?? ""} onChange={(e) => update({ epost: e.target.value })} autoComplete="email" /></div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div><label className="label" htmlFor="beskrivelse">Beskriv oppdraget (valgfritt)</label><textarea id="beskrivelse" className="input resize-none" rows={4} placeholder="For eksempel: Trenger elbillader i dobbeltgarasje, sikringsskapet er fra 2010..." value={formData.beskrivelse ?? ""} onChange={(e) => update({ beskrivelse: e.target.value })} /></div>
          <div><label className="label" htmlFor="tidspunkt">Ønsket tidspunkt (valgfritt)</label><input id="tidspunkt" type="text" className="input" placeholder="For eksempel: hverdager etter kl. 16, eller neste uke" value={formData.tidspunkt ?? ""} onChange={(e) => update({ tidspunkt: e.target.value })} /></div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input type="checkbox" className="sr-only peer" checked={formData.samtykke ?? false} onChange={(e) => update({ samtykke: e.target.checked })} />
              <div className={cn("w-5 h-5 rounded-6 border-2 flex items-center justify-center transition-all", formData.samtykke ? "bg-primary-500 border-primary-500" : "border-neutral-300 group-hover:border-primary-400")}>{formData.samtykke && <CheckCircle className="w-3 h-3 text-white" />}</div>
            </div>
            <span className="text-body-sm text-secondary-600">Jeg samtykker til at Elspesialisten behandler mine kontaktopplysninger for å formidle tilbud fra elektrikere. <a href="/personvern" className="text-primary-600 underline hover:no-underline">Les personvernerklæringen</a>.</span>
          </label>
        </div>
      )}

      {error && (<div className="flex items-center gap-2 mt-4 p-3 bg-error-50 border border-error-100 rounded-10 text-body-sm text-error-700"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>)}

      <div className={cn("flex gap-3 mt-6", step > 0 ? "justify-between" : "justify-end")}>
        {step > 0 && (<button type="button" onClick={() => setStep((s) => s - 1)} className="btn-ghost">Tilbake</button>)}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => canAdvance() && setStep((s) => s + 1)} disabled={!canAdvance()} className={cn("btn-primary", !canAdvance() && "opacity-50 cursor-not-allowed shadow-none hover:transform-none")}>Neste steg <ChevronRight className="w-4 h-4" aria-hidden /></button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={!canAdvance() || loading} className={cn("btn-primary", (!canAdvance() || loading) && "opacity-50 cursor-not-allowed shadow-none hover:transform-none")}>
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Sender...</>) : (<>Send forespørsel <ChevronRight className="w-4 h-4" /></>)}
          </button>
        )}
      </div>
      <p className="text-caption text-secondary-400 text-center mt-4">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1 -mt-0.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Dine opplysninger er trygge og deles kun med kvalifiserte elektrikere.
      </p>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="calc-surface p-8 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-success-50 border-2 border-success-500 flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-8 h-8 text-success-600" />
      </div>
      <h3 className="font-display font-bold text-heading-lg text-secondary-950 mb-2">Forespørsel mottatt!</h3>
      <p className="text-body-md text-secondary-600 mb-6 max-w-sm mx-auto">En sertifisert elektriker vil kontakte deg innen <strong>24 timer</strong> med et uforpliktende tilbud.</p>
      <div className="bg-neutral-50 rounded-12 p-4 text-left space-y-2 max-w-xs mx-auto">
        <div className="text-label text-secondary-500">Hva skjer nå?</div>
        {["Vi mottar din forespørsel", "Vi matcher deg med riktig elektriker", "Elektriker kontakter deg innen 24t"].map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-body-sm text-secondary-700">
            <span className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0">{i + 1}</span>{s}
          </div>
        ))}
      </div>
    </div>
  );
}
