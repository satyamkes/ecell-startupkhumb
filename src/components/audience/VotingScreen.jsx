import { useState } from "react";
import DotGrid from "../shared/DotGrid";
import TopBar from "../shared/TopBar";
import TogglePair from "../shared/TogglePair";
import SatisfactionMeter from "./SatisfactionMeter";

const QUESTIONS=[
  {
    id: "q1",
    stateKey: "likeIdea",
    label: "Do you like the idea?",
    sub: "Is the concept exciting & innovative?",
    accentColor: "#F97316",
    opts: [
      { value: true,  label: "Love It!",   icon: "", color: "#F97316", activeBg: "#FFF7ED" },
      { value: false, label: "Not really", icon: "", color: "#EF4444", activeBg: "#FEF2F2" },
    ],
  },
  {
    id: "q2",
    stateKey: "likePresentation",
    label: "Did you like the presentation?",
    sub: "Was the pitch clear and compelling?",
    accentColor: "#3B82F6",
    opts: [
      { value: true,  label: "Yes!",       icon: "", color: "#3B82F6", activeBg: "#EFF6FF" },
      { value: false, label: "Not really", icon: "", color: "#EF4444", activeBg: "#FEF2F2" },
    ],
  },
  {
    id: "q3",
    stateKey: "wouldJoin",
    label: "Would you join this startup?",
    sub: "Would you be part of this journey?",
    accentColor: "#22C55E",
    opts: [
      { value: true,  label: "Count me in!", icon: "", color: "#22C55E", activeBg: "#F0FDF4" },
      { value: false, label: "Maybe not",    icon: "", color: "#EF4444", activeBg: "#FEF2F2" },
    ],
  },
];

export default function VotingScreen({ startup, userName, onSubmit, liveStats }) {
  const [answers, setAnswers]       = useState({ likeIdea: null, likePresentation: null, wouldJoin: null });
  const [submitting, setSubmitting] = useState(false);
  const [statsOpen, setStatsOpen]   = useState(false);

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const allDone       = answeredCount === 3;

  const setAnswer = (key, val) =>
    setAnswers((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!allDone || submitting) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(answers), 900);
  };

  return (
    <div className="relative min-h-dvh bg-screen-bg overflow-x-hidden">
      <DotGrid />
      <TopBar label={startup.name} liveStats={liveStats} />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-20 pb-10 flex flex-col gap-4">

        <div className="animate-slide-up opacity-0 [animation-fill-mode:forwards]">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-slate-600">
              Hi <span className="font-bold text-brand-navy">{userName.split(" ")[0]}</span>! Cast your vote 🗳️
            </p>
            <span className={`stat-badge ${allDone
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-orange-600 bg-orange-50 border-orange-200"}`}>
              {answeredCount}/3
            </span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(answeredCount / 3) * 100}%`,
                background: allDone
                  ? "linear-gradient(90deg, #22C55E, #16A34A)"
                  : "linear-gradient(90deg, #F97316, #F59E0B)",
                boxShadow: allDone
                  ? "0 0 10px rgba(34,197,94,0.45)"
                  : "0 0 10px rgba(249,115,22,0.45)",
              }}
            />
          </div>
        </div>

        {QUESTIONS.map((q, i) => {
          const isAnswered = answers[q.stateKey] !== null;
          const isActive   = i === answeredCount && !isAnswered;

          return (
            <div
              key={q.id}
              className={`
                card p-4 transition-all duration-300
                border-l-4
                animate-slide-up opacity-0 [animation-fill-mode:forwards]
                ${isAnswered ? "border-l-green-400"
                  : isActive  ? "border-l-brand-orange shadow-orange/10"
                  : "border-l-slate-200"}
                ${i > answeredCount && !isAnswered ? "opacity-40" : ""}
              `}
              style={{ animationDelay: `${i * 60}ms` }}
            >
  
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    text-[11px] font-black flex-shrink-0 mt-0.5 border-2
                    transition-all duration-300
                    ${isAnswered
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                        ? "border-brand-orange text-brand-orange bg-orange-50"
                        : "border-slate-200 text-slate-400 bg-slate-50"}
                  `}
                >
                  {isAnswered ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-brand-navy leading-snug">
                    {q.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{q.sub}</p>
                </div>
              </div>

              <TogglePair
                value={answers[q.stateKey]}
                onChange={(val) => setAnswer(q.stateKey, val)}
                opts={q.opts}
                disabled={submitting}
              />
            </div>
          );
        })}

        <div className="card overflow-hidden animate-slide-up opacity-0
                        [animation-delay:220ms] [animation-fill-mode:forwards]">
          <button
            onClick={() => setStatsOpen((p) => !p)}
            className="w-full flex items-center justify-between p-4
                       text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <span>📊</span> See how others are voting live
            </span>
            <span className={`text-slate-400 text-xs transition-transform duration-200
                              ${statsOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
          {statsOpen && (
            <div className="animate-slide-down border-t border-slate-100">
              <SatisfactionMeter stats={liveStats} />
            </div>
          )}
        </div>

        <div className="animate-slide-up opacity-0 [animation-delay:280ms]
                        [animation-fill-mode:forwards]">
          <button
            onClick={handleSubmit}
            disabled={!allDone || submitting}
            className="btn-primary"
            style={allDone ? {} : { background: "#E2E8F0", color: "#94A3B8", boxShadow: "none" }}
          >
            {submitting ? (
              <>
                <span className="ring-spinner" />
                Submitting…
              </>
            ) : (
              <>
                <span>🗳️</span>
                Submit My Vote
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
            🔒 Anonymous · One vote per person · Final
          </p>
        </div>

      </div>
    </div>
  );
}
