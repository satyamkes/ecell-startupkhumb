import { useEffect, useState } from "react";
import DotGrid from "../shared/DotGrid";
import SatisfactionMeter from "./SatisfactionMeter";

const CONFETTI_COLORS = ["#F97316", "#22C55E", "#3B82F6", "#F59E0B", "#EC4899", "#0E1B4D"];

function ConfettiPiece({ style }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-sm animate-confetti pointer-events-none"
      style={style}
    />
  );
}

export default function SubmittedScreen({ startup, votes, liveStats }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [80, 480, 820, 1120];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const breakdown = [
    { label: "Liked the Idea",       value: votes.likeIdea,         icon: "💡", color: "#F97316" },
    { label: "Great Presentation",   value: votes.likePresentation,  icon: "🎤", color: "#3B82F6" },
    { label: "Would Join",           value: votes.wouldJoin,         icon: "🚀", color: "#22C55E" },
  ];
  const positiveCount = breakdown.filter((b) => b.value).length;
  const scoreLabel    = positiveCount === 3 ? "Full support! 🌟" : positiveCount === 2 ? "Mostly positive" : positiveCount === 1 ? "Some doubts" : "Skeptical 🤔";
  const scoreBadgeClass =
    positiveCount === 3 ? "text-green-700 bg-green-50 border-green-200" :
    positiveCount >= 2  ? "text-orange-600 bg-orange-50 border-orange-200" :
                          "text-red-600 bg-red-50 border-red-200";

  
  const confetti = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: `${Math.random() * 8 + 6}px`,
    rotation: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="relative min-h-dvh bg-screen-bg overflow-x-hidden">
      <DotGrid />

      {step >= 1 && (
        <div className="fixed inset-x-0 top-20 z-20 pointer-events-none">
          {confetti.map((c) => (
            <ConfettiPiece
              key={c.id}
              style={{
                left: c.left, top: 0,
                width: c.size, height: c.size,
                background: c.color,
                transform: `rotate(${c.rotation})`,
                animationDelay: c.delay,
                animationDuration: `${Math.random() * 0.6 + 1}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-md mx-auto px-5 flex flex-col items-center
                      justify-center min-h-dvh py-10 gap-5">


        <div
          className={`
            w-24 h-24 rounded-full flex items-center justify-center text-5xl
            bg-gradient-to-br from-green-50 to-green-100
            border-[3px] border-green-400 shadow-green
            transition-all duration-500
            ${step >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
          style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
        >
          
        </div>


        <div
          className={`text-center transition-all duration-400
            ${step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <h2 className="font-display font-black text-3xl text-brand-navy leading-tight mb-1">
            Vote Submitted!
          </h2>
          <p className="text-sm text-slate-500">
            You voted on{" "}
            <strong className="text-brand-orange">{startup.name}</strong>
          </p>
        </div>
        <div
          className={`w-full card transition-all duration-400
            ${step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                Your Votes
              </p>
              <span className={`stat-badge ${scoreBadgeClass}`}>
                {scoreLabel}
              </span>
            </div>

            <div className="space-y-0 divide-y divide-slate-50">
              {breakdown.map((b) => (
                <div key={b.label}
                     className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-sm text-slate-600 font-medium">{b.label}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={b.value
                      ? { color: b.color, background: `${b.color}12`, borderColor: `${b.color}33` }
                      : { color: "#DC2626", background: "#FEF2F2", borderColor: "#FECACA" }}
                  >
                    {b.value ? "YES" : "NO"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`w-full transition-all duration-400
            ${step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <SatisfactionMeter stats={liveStats} />
        </div>

        <div
          className={`w-full bg-brand-orange-light border border-brand-orange-border
                      rounded-2xl p-4 text-center transition-all duration-400
            ${step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="text-sm text-orange-800 font-medium leading-relaxed">
            👀 Watch the <strong>Main Stage Screen</strong> for the live leaderboard &amp; final scores!
          </p>
        </div>

      </div>
    </div>
  );
}
