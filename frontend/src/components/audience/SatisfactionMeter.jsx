export default function SatisfactionMeter({ stats, compact = false }) {
  const pct = stats?.satisfactionScore ?? 0;

  const { color, bgClass, borderClass, label, emoji } =
    pct >= 75 ? { color: "#16A34A", bgClass: "bg-green-50", borderClass: "border-green-200", label: "Crowd Loves It", emoji: "🔥" } :
      pct >= 50 ? { color: "#EA580C", bgClass: "bg-orange-50", borderClass: "border-orange-200", label: "Mixed Reactions", emoji: "⚡" } :
        { color: "#DC2626", bgClass: "bg-red-50", borderClass: "border-red-200", label: "Needs Work", emoji: "🤔" };

  if (compact) {
    const r = 11, circ = 2 * Math.PI * r;
    return (
      <div className={`flex items-center gap-2 bg-white border ${borderClass}
                       rounded-full pl-1.5 pr-3 py-1 shadow-sm`}>
        <div className="relative w-7 h-7 flex-shrink-0">
          <svg width="28" height="28" className="-rotate-90">
            <circle cx="14" cy="14" r={r} fill="none" stroke="#F1F5F9" strokeWidth="2.5" />
            <circle cx="14" cy="14" r={r} fill="none"
              stroke={color} strokeWidth="2.5"
              strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black"
            style={{ color }}>{pct}%</span>
        </div>
        <div className="leading-none">
          <p className="text-[9px] font-bold text-slate-400 tracking-wide">CROWD</p>
          <p className="text-[11px] font-bold text-brand-navy mt-0.5">
            {(stats?.totalVoters ?? 0).toLocaleString()} votes
          </p>
        </div>
      </div>
    );
  }

  const R = 40, C = 2 * Math.PI * R;
  const barItems = [
    { key: "likeIdea", label: "Liked the Idea", icon: "💡", color: "#F97316" },
    { key: "likePresentation", label: "Liked the Pitch", icon: "🎤", color: "#3B82F6" },
    { key: "wouldJoin", label: "Would Join", icon: "🚀", color: "#22C55E" },
  ];
  const tv = Math.max(stats?.totalVoters ?? 0, 1);

  const cumulativePct = (stats?.totalVoters ?? 0) > 0
    ? Math.round(((stats.likeIdea + stats.likePresentation + stats.wouldJoin) / (tv * 3)) * 100)
    : 0;

  return (
    <div className={`card overflow-hidden`}>

      <div className="h-1 w-full rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, #F97316, ${color})` }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-black text-slate-400 tracking-[1.2px] uppercase mb-1">
              Live Crowd Satisfaction
            </p>
            <p className="text-sm font-bold text-brand-navy">
              {emoji} {label}
            </p>
          </div>

          <div className="relative w-24 h-24 flex-shrink-0">
            <svg width="96" height="96" className="-rotate-90">
              <circle cx="48" cy="48" r={R} fill="none" stroke="#F1F5F9" strokeWidth="9" />
              <circle cx="48" cy="48" r={R} fill="none"
                stroke={color} strokeWidth="9"
                strokeDasharray={C}
                strokeDashoffset={C - (pct / 100) * C}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
                  filter: `drop-shadow(0 0 7px ${color}55)`,
                }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black font-display leading-none"
                style={{ color }}>{pct}%</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wide mt-0.5">
                SATISFIED
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {barItems.map(({ key, label, icon, color: c }) => {
            const count = stats[key] ?? 0;
            const bp = Math.round((count / tv) * 100);
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <span>{icon}</span>{label}
                  </span>
                  <span className="text-xs font-bold" style={{ color: c }}>{bp}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${bp}%`, background: c, boxShadow: `0 0 8px ${c}55` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Cumulative total score ── */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-brand-navy tracking-wide uppercase">
              📊 Cumulative Satisfaction
            </span>
            <span className="text-base font-black font-display" style={{ color }}>
              {cumulativePct}%
            </span>
          </div>

          {/* Segmented bar */}
          <div className="flex h-3 rounded-full overflow-hidden gap-px bg-slate-100">
            {barItems.map(({ key, color: c }) => {
              const w = ((stats[key] ?? 0) / (tv * 3)) * 100;
              return (
                <div
                  key={key}
                  className="h-full transition-all duration-1000 ease-out"
                  style={{ width: `${w}%`, background: c, minWidth: w > 0 ? 4 : 0 }}
                />
              );
            })}
          </div>

          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-slate-400">0%</span>
            <div className="flex items-center gap-3">
              {barItems.map(({ key, label, icon, color: c }) => (
                <span key={key} className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: c }} />
                  {icon}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-slate-400">100%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
          <span className="text-[11px] text-slate-400 font-medium">
            {(stats?.totalVoters ?? 0).toLocaleString()} votes cast · updates in real-time
          </span>
        </div>
      </div>
    </div>
  );
}
