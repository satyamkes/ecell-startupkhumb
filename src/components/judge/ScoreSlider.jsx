
export default function ScoreSlider({ label, description, icon, value, onChange, disabled }) {
  const pct   = value != null ? (value / 10) * 100 : 0;
  const hasVal = value != null;

  const getZone = (v) => {
    if (v == null) return { color: "#475569", bg: "rgba(71,85,105,0.15)", label: "—" };
    if (v <= 3)   return { color: "#EF4444", bg: "rgba(239,68,68,0.12)",   label: "Needs Work"  };
    if (v <= 5)   return { color: "#F97316", bg: "rgba(249,115,22,0.12)",  label: "Average"     };
    if (v <= 7)   return { color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  label: "Good"        };
    if (v <= 9)   return { color: "#22C55E", bg: "rgba(34,197,94,0.12)",   label: "Excellent"   };
    return              { color: "#10B981", bg: "rgba(16,185,129,0.15)",   label: "Perfect! 🌟" };
  };

  const zone = getZone(value);

  const taps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
                     ${hasVal
                       ? "border-judge-border-bright bg-judge-card"
                       : "border-judge-border bg-white/[0.02]"}`}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{icon}</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{label}</p>
            <p className="text-white/35 text-xs mt-0.5">{description}</p>
          </div>
        </div>


        <div
          className="min-w-[52px] h-[52px] rounded-xl flex flex-col items-center
                     justify-center transition-all duration-300 border"
          style={{
            background:   zone.bg,
            borderColor:  hasVal ? zone.color + "44" : "rgba(255,255,255,0.06)",
          }}
        >
          <span className="font-display font-black text-xl leading-none"
                style={{ color: hasVal ? zone.color : "#475569" }}>
            {hasVal ? value : "—"}
          </span>
          <span className="text-[9px] font-bold text-white/30 mt-0.5">/10</span>
        </div>
      </div>

  
      <div className="px-4 pb-2">
        <div className="relative h-2 rounded-full bg-white/8 mb-1">
          {/* Filled portion */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
            style={{
              width:      `${pct}%`,
              background: hasVal
                ? `linear-gradient(90deg, ${zone.color}88, ${zone.color})`
                : "transparent",
            }}
          />
          <input
            type="range"
            min={0} max={10} step={1}
            value={value ?? 0}
            onChange={(e) => !disabled && onChange(Number(e.target.value))}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer
                       disabled:cursor-not-allowed"
            style={{ zIndex: 2 }}
          />
          {/* Thumb */}
          {hasVal && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full
                         border-2 border-judge-bg shadow-lg transition-all duration-200
                         pointer-events-none"
              style={{
                left:       `calc(${pct}% - 8px)`,
                background: zone.color,
                boxShadow:  `0 0 12px ${zone.color}88`,
              }}
            />
          )}
        </div>
        <div className="flex justify-between text-[9px] text-white/20 font-bold px-0.5">
          <span>0</span><span>5</span><span>10</span>
        </div>
      </div>

      <div className="flex items-center gap-1 px-4 pb-4">
        {taps.map((n) => {
          const z  = getZone(n);
          const sel = value === n;
          return (
            <button
              key={n}
              onClick={() => !disabled && onChange(n)}
              disabled={disabled}
              className="flex-1 h-7 rounded-lg text-[11px] font-bold transition-all duration-150
                         disabled:cursor-not-allowed"
              style={{
                background:  sel ? z.color : "rgba(255,255,255,0.04)",
                color:       sel ? "#fff" : "rgba(255,255,255,0.3)",
                transform:   sel ? "scale(1.15)" : "scale(1)",
                boxShadow:   sel ? `0 2px 10px ${z.color}55` : "none",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>


      {hasVal && (
        <div className="px-4 pb-3 -mt-1">
          <span className="text-xs font-bold" style={{ color: zone.color }}>
            {zone.label}
          </span>
        </div>
      )}
    </div>
  );
}
