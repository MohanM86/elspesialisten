"use client";
import { useState, useMemo } from "react";

interface Bedrift {
  n: string; o: string; t: string; a: number; p: string; s: string; w?: string;
}

type SortField = "navn" | "ansatte" | "stiftet";

export default function BedriftOversikt({ bedrifter, kommune }: { bedrifter: Bedrift[]; kommune: string }) {
  const [soketekst, setSoketekst] = useState("");
  const [sortering, setSortering] = useState<SortField>("ansatte");
  const [visAntall, setVisAntall] = useState(20);
  const [kunMedAnsatte, setKunMedAnsatte] = useState(false);

  const filtrert = useMemo(() => {
    let res = [...bedrifter];
    if (soketekst) {
      const q = soketekst.toLowerCase();
      res = res.filter((b) => b.n.toLowerCase().includes(q) || b.o.includes(q) || b.p.includes(q));
    }
    if (kunMedAnsatte) res = res.filter((b) => b.a > 0);
    res.sort((a, b) => {
      if (sortering === "ansatte") return b.a - a.a;
      if (sortering === "stiftet") return (a.s || "9999").localeCompare(b.s || "9999");
      return a.n.localeCompare(b.n);
    });
    return res;
  }, [bedrifter, soketekst, sortering, kunMedAnsatte]);

  const synlige = filtrert.slice(0, visAntall);
  const antallAS = bedrifter.filter((b) => b.t === "AS").length;
  const antallENK = bedrifter.filter((b) => b.t === "ENK").length;
  const medAnsatte = bedrifter.filter((b) => b.a > 0).length;
  const totaltAnsatte = bedrifter.reduce((sum, b) => sum + b.a, 0);
  const medWeb = bedrifter.filter((b) => b.w).length;

  return (
    <div>
      {/* Markedsstatistikk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { tall: bedrifter.length, label: "Registrerte bedrifter" },
          { tall: antallAS, label: "Aksjeselskap" },
          { tall: antallENK, label: "Enkeltpersonforetak" },
          { tall: medAnsatte, label: "Med ansatte" },
        ].map(({ tall, label }) => (
          <div key={label} className="bg-neutral-50 rounded-12 p-3 text-center">
            <div className="font-display font-extrabold text-heading-md text-secondary-900">{tall}</div>
            <div className="text-[0.65rem] text-secondary-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Søk og filter */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            type="text"
            placeholder="Søk etter bedriftsnavn, org.nr eller postnr..."
            value={soketekst}
            onChange={(e) => { setSoketekst(e.target.value); setVisAntall(20); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-10 border border-neutral-200 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
          />
        </div>
        <select
          value={sortering}
          onChange={(e) => setSortering(e.target.value as SortField)}
          className="px-3 py-2.5 rounded-10 border border-neutral-200 text-body-sm bg-white"
        >
          <option value="ansatte">Flest ansatte</option>
          <option value="navn">Alfabetisk</option>
          <option value="stiftet">Eldst først</option>
        </select>
        <button
          onClick={() => setKunMedAnsatte(!kunMedAnsatte)}
          className={`px-3 py-2.5 rounded-10 border text-body-sm transition-colors ${kunMedAnsatte ? "bg-primary-50 border-primary-300 text-primary-700" : "border-neutral-200 text-secondary-600 hover:bg-neutral-50"}`}
        >
          Kun med ansatte
        </button>
      </div>

      <p className="text-caption text-secondary-400 mb-3">{filtrert.length} bedrifter {soketekst && `for «${soketekst}»`}</p>

      {/* Bedriftsliste */}
      <div className="space-y-2">
        {synlige.map((b) => (
          <div key={b.o} className="bg-white border border-neutral-200 rounded-12 px-4 py-3 hover:border-neutral-300 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-display font-semibold text-body-sm text-secondary-900 truncate">{b.n}</div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="text-[0.7rem] text-secondary-400">Org. {b.o}</span>
                  <span className="text-[0.7rem] text-secondary-400">{b.p}</span>
                  {b.s && <span className="text-[0.7rem] text-secondary-400">Stiftet {b.s}</span>}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[0.6rem] font-medium bg-neutral-100 text-secondary-500">{b.t}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {b.a > 0 && (
                  <div className="text-right">
                    <div className="font-display font-bold text-body-sm text-secondary-900">{b.a}</div>
                    <div className="text-[0.6rem] text-secondary-400">ansatte</div>
                  </div>
                )}
                {b.w && (
                  <a
                    href={b.w.startsWith("http") ? b.w : `https://${b.w}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 hover:text-primary-600"
                    aria-label={`Besøk ${b.n} sin nettside`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vis flere */}
      {visAntall < filtrert.length && (
        <button
          onClick={() => setVisAntall((prev) => prev + 30)}
          className="w-full mt-4 py-3 rounded-12 border border-neutral-200 text-body-sm text-secondary-600 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
        >
          Vis flere ({filtrert.length - visAntall} gjenstår)
        </button>
      )}

      {/* Kilde */}
      <p className="text-[0.65rem] text-secondary-400 mt-4">
        Kilde: Brønnøysundregistrene, enhetsregisteret. Næringskode 43.210 (elektrisk installasjonsarbeid). Bedriftene er ikke tilknyttet Elspesialisten.
      </p>
    </div>
  );
}
