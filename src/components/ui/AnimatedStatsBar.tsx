"use client";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  endValue: number;
  suffix: string;
  label: string;
  ikon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    endValue: 340,
    suffix: "+",
    label: "Kommuner",
    ikon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    endValue: 11,
    suffix: "",
    label: "Fylker",
    ikon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    endValue: 24,
    suffix: "t",
    label: "Responstid",
    ikon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    endValue: 100,
    suffix: "%",
    label: "Autoriserte",
    ikon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function useCountUp(end: number, duration: number, startCounting: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [end, duration, startCounting]);

  return count;
}

function AnimatedStat({ stat, index }: { stat: StatItem; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.endValue, 1800 + index * 200, visible);

  return (
    <div
      ref={ref}
      className="relative text-center group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      {/* Glow behind number */}
      <div
        className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Icon */}
      <div className="text-primary-500/60 flex justify-center mb-1.5 sm:mb-2" aria-hidden>
        {stat.ikon}
      </div>

      {/* Number */}
      <div className="relative font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-primary-400 tabular-nums tracking-tight">
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <div className="text-[0.6rem] sm:text-[0.7rem] text-secondary-500 uppercase tracking-[0.15em] mt-1">
        {stat.label}
      </div>

      {/* Bottom accent line */}
      <div
        className="mx-auto mt-2.5 sm:mt-3 h-[2px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
        style={{
          width: visible ? "60%" : "0%",
          transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.12}s`,
        }}
        aria-hidden
      />
    </div>
  );
}

export default function AnimatedStatsBar() {
  return (
    <section className="relative bg-secondary-950 overflow-hidden" aria-label="Nøkkeltall">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" aria-hidden />

      <div className="container-site py-6 sm:py-8 relative">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" aria-hidden />
    </section>
  );
}
