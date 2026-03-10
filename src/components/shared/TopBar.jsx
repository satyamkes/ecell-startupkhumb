/**
 * TopBar
 * Sticky glassmorphism header shown on all screens after landing.
 * Shows: LIVE chip | compact satisfaction ring | pitch counter
 */
export default function TopBar({ label, liveStats, pitchOrder, totalPitches }) {
  const pct   = liveStats?.satisfactionScore ?? 0;
  const total = liveStats?.totalVoters ?? 0;

  // Ring math
  const r    = 11;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const ringColor = pct >= 75 ? "#16A34A" : pct >= 50 ? "#EA580C" : "#DC2626";

  return (
    <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between
                       px-4 py-2.5 bg-white/80 backdrop-blur-xl
                       border-b border-slate-100 shadow-sm">

      {/* Left: LIVE + label */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="live-chip">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
          LIVE
        </span>
        {label && (
          <span className="text-xs font-bold text-brand-navy truncate max-w-[120px]">
            {label}
          </span>
        )}
      </div>

      {/* Centre: compact satisfaction ring */}
      <div className="flex items-center gap-2 bg-white border border-slate-100
                      rounded-full px-3 py-1.5 shadow-sm">
        <div className="relative w-7 h-7">
          <svg width="28" height="28" className="-rotate-90">
            <circle cx="14" cy="14" r={r} fill="none" stroke="#F1F5F9" strokeWidth="2.5" />
            <circle
              cx="14" cy="14" r={r} fill="none"
              stroke={ringColor} strokeWidth="2.5"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center
                           text-[8px] font-black"
                style={{ color: ringColor }}>
            {pct}%
          </span>
        </div>
        <div className="leading-tight">
          <p className="text-[9px] font-bold text-slate-400 tracking-wide uppercase">Crowd</p>
          <p className="text-[11px] font-bold text-brand-navy">
            {total.toLocaleString()} votes
          </p>
        </div>
      </div>

      {/* Right: pitch counter */}
      {pitchOrder && (
        <span className="text-[11px] font-bold text-slate-400 tabular-nums">
          #{pitchOrder}
          <span className="text-slate-300">/{totalPitches}</span>
        </span>
      )}
    </header>
  );
}
