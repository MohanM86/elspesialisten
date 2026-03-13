"use client";
import { useEffect, useState, useRef } from "react";

interface TocItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TOC_ITEMS: TocItem[] = [
  { id: "tjenester", label: "Tjenester", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: "elbillader", label: "Elbillader", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { id: "dognvakt", label: "Døgnvakt", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { id: "problemer", label: "Vanlige feil", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { id: "priser", label: "Priser", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { id: "marked", label: "Markedet", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: "bedrifter", label: "Bedrifter", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id: "faq", label: "FAQ", icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
];

export default function OsloTableOfContents() {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(window.scrollY / docH, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <nav className="hidden xl:block fixed left-[max(1rem,calc((100vw-1280px)/2-200px))] top-1/2 -translate-y-1/2 z-30" aria-label="Innholdsfortegnelse">
      {/* Progress line */}
      <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-neutral-200 rounded-full overflow-hidden">
        <div className="w-full bg-primary-500 rounded-full transition-all duration-300" style={{ height: `${progress * 100}%` }} />
      </div>

      <div className="relative flex flex-col gap-1">
        {TOC_ITEMS.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`flex items-center gap-2.5 pl-8 pr-3 py-1.5 rounded-8 text-[0.7rem] font-medium transition-all duration-200 group ${
                isActive ? "text-primary-600 bg-primary-50" : "text-secondary-400 hover:text-secondary-700 hover:bg-neutral-50"
              }`}
            >
              {/* Dot on the line */}
              <div className={`absolute left-[11px] w-[10px] h-[10px] rounded-full border-2 transition-all duration-200 ${
                isActive ? "border-primary-500 bg-primary-500 scale-125" : "border-neutral-300 bg-white group-hover:border-neutral-400"
              }`} />
              <span className={`transition-colors ${isActive ? "text-primary-500" : "text-secondary-400 group-hover:text-secondary-600"}`}>{icon}</span>
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
