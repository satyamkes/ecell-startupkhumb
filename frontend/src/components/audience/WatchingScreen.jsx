import { useEffect, useState } from "react";
import DotGrid from "../shared/DotGrid";
import TopBar from "../shared/TopBar";
import SatisfactionMeter from "./SatisfactionMeter";

const CATEGORY_META = {
  CleanTech:  { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", icon: "🌿" },
  FinTech:    { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", icon: "💳" },
  HealthTech: { color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8", icon: "🏥" },
  EdTech:     { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", icon: "📚" },
  AgriTech:   { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", icon: "🌾" },
  default:    { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", icon: "💡" },
};

export default function WatchingScreen({ startup, userName, pollOpen, onPollReady, liveStats }) {
  const [pollAnim, setPollAnim] = useState(false);
  const meta = CATEGORY_META[startup.category] ?? CATEGORY_META.default;

  useEffect(() => {
    if (!pollOpen) return;
    setPollAnim(true);
    const t = setTimeout(() => onPollReady(), 1600);
    return () => clearTimeout(t);
  }, [pollOpen]);

  const firstName = userName.split(" ")[0];

  return (
    <div className="relative min-h-dvh bg-screen-bg overflow-x-hidden">
      <DotGrid />
      <TopBar
        label={startup.name}
        liveStats={liveStats}
        pitchOrder={startup.pitchOrder}
        totalPitches={startup.totalPitches}
      />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-20 pb-10 flex flex-col gap-4">

        {/* Section divider */}
        <div className="section-label mt-1">Now Pitching</div>

        {/* ── Startup hero card ── */}
        <div className="card overflow-hidden animate-slide-up opacity-0
                        [animation-fill-mode:forwards]">
          {/* Coloured top border */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${meta.color}, #F97316)` }} />

          <div className="p-5 relative">
            <span className="absolute right-3 bottom-1 font-display font-black text-[90px]
                             leading-none select-none pointer-events-none opacity-[0.04]"
                  style={{ color: meta.color }}>
              {startup.pitchOrder}
            </span>

            {/* Category pill */}
            <div className="category-pill mb-4 text-xs"
                 style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}>
              <span>{meta.icon}</span>
              {startup.category}
            </div>

            <h2 className="font-display font-black text-2xl text-brand-navy
                           leading-tight mb-1.5">
              {startup.name}
            </h2>
            <p className="text-sm text-slate-500 italic mb-5">
              "{startup.tagline}"
            </p>

            {/* Founder row */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-orange-gradient flex items-center
                              justify-center text-white font-black text-base shadow-orange flex-shrink-0">
                {startup.founderName[0]}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                  Founder
                </p>
                <p className="text-sm font-bold text-brand-navy">{startup.founderName}</p>
              </div>
            </div>
          </div>
        </div>

    
        <div className="animate-slide-up opacity-0 [animation-delay:100ms]
                        [animation-fill-mode:forwards]">
          <SatisfactionMeter stats={liveStats} />
        </div>

        {!pollOpen && !pollAnim && (
          <div className="card p-4 flex items-center gap-4
                          bg-brand-orange-light border-brand-orange-border
                          animate-slide-up opacity-0 [animation-delay:200ms]
                          [animation-fill-mode:forwards]">
            <div className="w-8 h-8 rounded-full border-2 border-orange-200
                            border-t-brand-orange animate-spin-ring flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-brand-navy">
                Sit tight, {firstName}!
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Voting opens when the pitch ends
              </p>
            </div>
          </div>
        )}

        {pollAnim && (
          <div className="card p-4 flex items-center gap-4
                          bg-brand-green-light border-brand-green-border
                          animate-pop-in">
            <span className="text-3xl">🗳️</span>
            <div>
              <p className="text-sm font-bold text-green-700">
                Poll is Opening!
              </p>
              <p className="text-xs text-green-500 mt-0.5">
                Get ready to cast your vote…
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
