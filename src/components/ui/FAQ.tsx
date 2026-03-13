"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildFAQSchema } from "@/lib/utils";
import type { FAQItem } from "@/types";

interface FAQProps {
  items:      FAQItem[];
  tittel?:    string;
  showSchema?: boolean;
  className?: string;
}

export default function FAQ({ items, tittel = "Vanlige spørsmål", showSchema = true, className }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={cn("w-full", className)} aria-labelledby="faq-heading">
      {showSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(items.map(i => ({ sporsmal: i.sporsmal, svar: i.svar })))) }} />
      )}
      {tittel && <h2 id="faq-heading" className="font-display font-bold text-display-lg text-secondary-950 mb-8">{tittel}</h2>}
      <div className="divide-y divide-neutral-200 border-t border-neutral-200">
        {items.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={idx} className="faq-item">
              <button type="button" className="faq-trigger" onClick={() => setOpen(isOpen ? null : idx)} aria-expanded={isOpen} aria-controls={`faq-content-${idx}`} id={`faq-trigger-${idx}`}>
                <span className="text-pretty">{item.sporsmal}</span>
                <ChevronDown className={cn("w-5 h-5 flex-shrink-0 text-secondary-400 transition-transform duration-300", isOpen && "rotate-180 text-primary-500")} aria-hidden />
              </button>
              <div id={`faq-content-${idx}`} role="region" aria-labelledby={`faq-trigger-${idx}`} className={cn("overflow-hidden transition-all duration-300 ease-out", isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                <div className="faq-content" dangerouslySetInnerHTML={{ __html: item.svar }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
