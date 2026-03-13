"use client";
import { useEffect, useRef, useState } from "react";
import type { CityMarketData } from "@/data/city-configs";

function AnimatedBar({ label, value, maxValue, color, delay }: { label: string; value: number; maxValue: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setWidth((value / maxValue) * 100), delay); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, maxValue, delay]);
  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="w-[110px] sm:w-[140px] text-[0.75rem] text-secondary-600 font-medium text-right flex-shrink-0 truncate">{label}</div>
      <div className="flex-1 bg-neutral-100 rounded-full h-7 overflow-hidden relative">
        <div className="h-full rounded-full transition-all duration-1000 ease-out flex items-center" style={{ width: `${width}%`, background: color, transitionDelay: `${delay}ms` }}>
          <span className="text-[0.65rem] font-bold text-white pl-3 whitespace-nowrap drop-shadow-sm">{value.toLocaleString("nb-NO")}</span>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const size = 160, stroke = 28, radius = (size - stroke) / 2, circ = 2 * Math.PI * radius;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  let acc = 0;
  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {data.map((d, i) => { const pct = d.value / total; const dash = pct * circ; const gap = circ - dash; const offset = acc * circ; acc += pct;
            return <circle key={d.label} cx={size/2} cy={size/2} r={radius} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={visible ? `${dash} ${gap}` : `0 ${circ}`} strokeDashoffset={-offset} strokeLinecap="round" style={{ transition: `stroke-dasharray 1s ease-out ${i*0.15}s` }} />;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display font-extrabold text-xl text-secondary-900">{total}</div>
          <div className="text-[0.6rem] text-secondary-400 uppercase tracking-wider">bedrifter</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {data.map((d) => (<div key={d.label} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-[0.7rem] text-secondary-600">{d.label} ({d.value})</span></div>))}
      </div>
    </div>
  );
}

export default function CityMarketChart({ data, cityName }: { data: CityMarketData; cityName: string }) {
  const [tab, setTab] = useState<"bedrifter" | "omrader">("bedrifter");
  const maxBedrift = Math.max(...data.topBedrifter.map(b => b.value));
  const maxOmrade = Math.max(...data.omrader.map(b => b.value));

  return (
    <div className="bg-white border border-neutral-200 rounded-20 overflow-hidden my-8 shadow-card-sm">
      <div className="bg-secondary-950 px-5 py-4 sm:px-6">
        <h3 className="font-display font-bold text-[1rem] text-white">{cityName} elektrikerbransje i tall</h3>
        <p className="text-[0.75rem] text-secondary-400 mt-0.5">Kilde: Brønnøysundregistrene, næringskode 43.210</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-[0.75rem] font-display font-semibold text-secondary-700 uppercase tracking-wider mb-4">Selskapsform</div>
            <DonutChart data={data.selskapsform} total={data.total} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              {(["bedrifter", "omrader"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-8 text-[0.75rem] font-semibold transition-all ${tab === t ? "bg-primary-500 text-white shadow-cta" : "bg-neutral-100 text-secondary-600 hover:bg-neutral-200"}`}>
                  {t === "bedrifter" ? "Største bedrifter" : "Etter område"}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {tab === "bedrifter"
                ? data.topBedrifter.map((b, i) => <AnimatedBar key={b.label} label={b.label} value={b.value} maxValue={maxBedrift} color={b.color} delay={i*100} />)
                : data.omrader.map((b, i) => <AnimatedBar key={b.label} label={b.label} value={b.value} maxValue={maxOmrade} color={b.color} delay={i*100} />)
              }
            </div>
            <p className="text-[0.65rem] text-secondary-400 mt-3">{tab === "bedrifter" ? "Ansatte (registrert i enhetsregisteret)" : "Antall bedrifter per område"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-neutral-100">
          {data.bottomStats.map(({ v, l }) => (<div key={l} className="text-center"><div className="font-display font-extrabold text-lg text-primary-600">{v}</div><div className="text-[0.65rem] text-secondary-500 mt-0.5">{l}</div></div>))}
        </div>
      </div>
    </div>
  );
}
