/* ═══════════════════════════════════════════════════
   OSLO VISUAL ELEMENTS
   Alert boxes, fact cards, and visual content breaks
   ═══════════════════════════════════════════════════ */

interface AlertBoxProps {
  type: "danger" | "warning" | "info" | "tip";
  title: string;
  children: React.ReactNode;
}

const ALERT_STYLES = {
  danger: {
    bg: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  },
  tip: {
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-800",
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  },
};

export function AlertBox({ type, title, children }: AlertBoxProps) {
  const s = ALERT_STYLES[type];
  return (
    <div className={`${s.bg} border rounded-16 p-5 my-6`}>
      <div className="flex items-start gap-3">
        <div className={`${s.iconBg} w-9 h-9 rounded-10 flex items-center justify-center flex-shrink-0 ${s.iconColor}`}>
          {s.icon}
        </div>
        <div className="min-w-0">
          <h4 className={`font-display font-bold text-[0.95rem] ${s.titleColor} mb-1`}>{title}</h4>
          <div className="text-[0.85rem] text-secondary-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── FACT BOX ─── */
interface FactBoxProps {
  emoji?: string;
  children: React.ReactNode;
}

export function FactBox({ emoji = "💡", children }: FactBoxProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-amber-50/50 border border-primary-200 rounded-16 p-5 my-6 overflow-hidden">
      {/* Decorative bolt */}
      <div className="absolute -right-3 -top-3 w-20 h-20 opacity-[0.06]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary-900"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <div className="relative flex items-start gap-3">
        <div className="w-9 h-9 rounded-10 bg-white border border-primary-200 flex items-center justify-center flex-shrink-0 text-lg">{emoji}</div>
        <div>
          <div className="font-display font-bold text-[0.8rem] text-primary-700 uppercase tracking-wider mb-1">Visste du at?</div>
          <div className="text-[0.85rem] text-secondary-700 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── CHECKLIST BOX ─── */
interface ChecklistProps {
  title: string;
  items: string[];
}

export function ChecklistBox({ title, items }: ChecklistProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-16 p-5 my-6 shadow-card-sm">
      <h4 className="font-display font-bold text-[0.95rem] text-secondary-900 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#ecfdf5"/><path d="M6 10l3 3 5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-[0.85rem] text-secondary-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STAT HIGHLIGHT ─── */
interface StatHighlightProps {
  stats: { value: string; label: string; subtext?: string }[];
}

export function StatHighlight({ stats }: StatHighlightProps) {
  return (
    <div className={`grid grid-cols-${Math.min(stats.length, 4)} gap-3 my-6`}>
      {stats.map((s) => (
        <div key={s.label} className="bg-secondary-900 rounded-16 p-4 text-center">
          <div className="font-display font-extrabold text-xl sm:text-2xl text-primary-400">{s.value}</div>
          <div className="text-[0.7rem] text-secondary-400 uppercase tracking-wider mt-0.5">{s.label}</div>
          {s.subtext && <div className="text-[0.65rem] text-secondary-500 mt-1">{s.subtext}</div>}
        </div>
      ))}
    </div>
  );
}
