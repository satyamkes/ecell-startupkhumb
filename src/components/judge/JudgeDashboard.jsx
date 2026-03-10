import { useState } from "react";
import ScoreSlider     from "./ScoreSlider";
import ScoreSummaryBar from "./ScoreSummaryBar";

const CRITERIA = [
  {
    key:         "innovation",
    label:       "Innovation",
    description: "How original, creative, and disruptive is the idea?",
    icon:        "",
  },
  {
    key:         "feasibility",
    label:       "Feasibility",
    description: "Is the solution technically and operationally achievable?",
    icon:        "",
  },
  {
    key:         "marketFit",
    label:       "Market Fit",
    description: "Is there a real, scalable demand for this product?",
    icon:        "",
  },
  {
    key:         "teamStrength",
    label:       "Team Strength",
    description: "Does the team have the skills and drive to execute?",
    icon:        "",
  },
  {
    key:         "presentation",
    label:       "Presentation",
    description: "Was the pitch clear, confident, and compelling?",
    icon:        "",
  },
];

const CATEGORY_META = {
  CleanTech:  { color: "#16A34A", icon: "🌿" },
  FinTech:    { color: "#2563EB", icon: "💳" },
  HealthTech: { color: "#DB2777", icon: "🏥" },
  EdTech:     { color: "#7C3AED", icon: "📚" },
  AgriTech:   { color: "#D97706", icon: "🌾" },
  default:    { color: "#F97316", icon: "💡" },
};


export default function JudgeDashboard({ judge, startup, onSubmit, onLogout, alreadySubmitted }) {
  const initScores = () =>
    CRITERIA.reduce((acc, c) => ({ ...acc, [c.key]: null }), {});

  const [scores,     setScores]     = useState(initScores);
  const [remarks,    setRemarks]    = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(alreadySubmitted);

  const meta = CATEGORY_META[startup.category] ?? CATEGORY_META.default;

  const handleScoreChange = (key, val) =>
    setScores((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    setSubmitting(true);
    const success = await onSubmit(startup.id, scores, remarks);
    if (success) setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    const total    = Object.values(scores).filter((v) => v != null);
    const sum      = total.reduce((a, b) => a + b, 0);
    const maxScore = CRITERIA.length * 10;

    return (
      <div className="min-h-dvh bg-judge-bg flex flex-col items-center justify-center
                      px-5 py-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
               style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.15) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500
                          flex items-center justify-center text-4xl animate-pop-in
                          shadow-green">
            ✅
          </div>

          <div className="text-center">
            <h2 className="font-display font-black text-2xl text-white mb-1">
              Scores Submitted!
            </h2>
            <p className="text-white/40 text-sm">
              Your evaluation for{" "}
              <span className="text-brand-orange font-semibold">{startup.name}</span>{" "}
              has been recorded privately.
            </p>
          </div>


          <div className="w-full bg-judge-card border border-judge-border rounded-2xl p-5">
            <p className="text-[10px] font-black text-white/30 tracking-widest uppercase mb-4">
              Your Private Scorecard
            </p>
            <div className="space-y-3 mb-5">
              {CRITERIA.map((c) => {
                const val = scores[c.key];
                const pct = val != null ? (val / 10) * 100 : 0;
                return (
                  <div key={c.key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/60 text-xs flex items-center gap-1.5">
                        <span>{c.icon}</span>{c.label}
                      </span>
                      <span className="text-white/80 text-xs font-bold">
                        {val ?? "—"}/10
                      </span>
                    </div>
                    <div className="h-1 bg-white/8 rounded-full">
                      <div className="h-full rounded-full bg-score-gradient transition-all"
                           style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/8">
              <span className="text-white/40 text-sm font-semibold">Total Score</span>
              <span className="font-display font-black text-2xl text-brand-orange">
                {sum}<span className="text-white/25 text-base font-bold">/{maxScore}</span>
              </span>
            </div>
          </div>

          <div className="w-full bg-brand-orange/8 border border-brand-orange/20
                          rounded-2xl p-4 text-center">
            <p className="text-orange-300/80 text-sm">
              🔒 Scores are sealed until the admin reveals results on the main stage.
            </p>
          </div>

          <button
            onClick={onLogout}
            className="text-white/30 text-sm font-semibold hover:text-white/60
                       transition-colors mt-2"
          >
            ← Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-judge-bg pb-28 relative overflow-x-hidden">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
             style={{
               backgroundImage: "linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)",
               backgroundSize: "48px 48px",
             }} />
      </div>


      <div className="sticky top-0 z-20 bg-judge-surface/90 backdrop-blur-xl
                      border-b border-judge-border">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-score-gradient flex items-center
                            justify-center text-white font-black text-sm flex-shrink-0">
              {judge.avatar}
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">{judge.name}</p>
              <p className="text-white/35 text-[11px]">{judge.designation}</p>
            </div>
          </div>


          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25
                             text-red-400 rounded-full px-2.5 py-1 text-[10px] font-black
                             tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
              LIVE
            </span>
            <span className="text-white/25 text-xs font-bold tabular-nums">
              #{startup.pitchOrder}/{startup.totalPitches}
            </span>
            <button
              onClick={onLogout}
              className="text-white/20 hover:text-white/50 transition-colors text-xs
                         font-semibold ml-1"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 pt-5 flex flex-col gap-5">
        <div className="rounded-3xl border border-judge-border-bright bg-judge-card
                        overflow-hidden animate-slide-up opacity-0
                        [animation-fill-mode:forwards]">
          <div className="h-1" style={{ background: `linear-gradient(90deg, #F97316, ${meta.color})` }} />
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">
                    Now Evaluating
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold
                                   rounded-full px-2.5 py-0.5 border"
                        style={{ color: meta.color, background: meta.color + "15", borderColor: meta.color + "33" }}>
                    {meta.icon} {startup.category}
                  </span>
                </div>
                <h2 className="font-display font-black text-2xl text-white leading-tight mb-1">
                  {startup.name}
                </h2>
                <p className="text-white/40 text-sm italic mb-4">"{startup.tagline}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-score-gradient flex items-center
                                  justify-center text-white text-xs font-black">
                    {startup.founderName[0]}
                  </div>
                  <span className="text-white/50 text-sm">{startup.founderName}</span>
                </div>
              </div>


              <span className="font-display font-black text-[80px] leading-none
                               text-white/[0.04] select-none pointer-events-none mt-[-8px]"
                    style={{ color: meta.color }}>
                {startup.pitchOrder}
              </span>
            </div>
          </div>
        </div>


        <div className="flex items-center gap-3 bg-brand-orange/6 border border-brand-orange/15
                        rounded-2xl px-4 py-3 animate-slide-up opacity-0
                        [animation-delay:80ms] [animation-fill-mode:forwards]">
          <span className="text-brand-orange text-base">🔒</span>
          <p className="text-white/45 text-xs font-medium">
            <strong className="text-white/65">Your scores are private.</strong>{" "}
            They are stored securely and only revealed when the admin triggers the final reveal on stage.
          </p>
        </div>


        <div className="flex flex-col gap-3">
          <h3 className="text-[11px] font-black text-white/30 tracking-widest uppercase">
            Evaluation Criteria
          </h3>
          {CRITERIA.map((c, i) => (
            <div
              key={c.key}
              className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${120 + i * 70}ms` }}
            >
              <ScoreSlider
                label={c.label}
                description={c.description}
                icon={c.icon}
                value={scores[c.key]}
                onChange={(v) => handleScoreChange(c.key, v)}
                disabled={submitting}
              />
            </div>
          ))}
        </div>

        <div className="animate-slide-up opacity-0 [animation-delay:480ms]
                        [animation-fill-mode:forwards]">
          <h3 className="text-[11px] font-black text-white/30 tracking-widest uppercase mb-2">
            Private Remarks <span className="text-white/15 font-medium normal-case tracking-normal">(optional)</span>
          </h3>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={submitting}
            placeholder="Add private notes for this startup…"
            rows={3}
            className="w-full bg-white/4 border border-judge-border rounded-2xl
                       px-4 py-3.5 text-white/80 text-sm resize-none outline-none
                       placeholder:text-white/20 transition-all duration-200
                       focus:border-brand-orange/40 focus:ring-0
                       disabled:opacity-50"
          />
          <p className="text-white/20 text-[11px] mt-1.5 font-medium">
            🔒 Remarks are never shown on any public screen
          </p>
        </div>

      </div>


      <ScoreSummaryBar
        scores={scores}
        criteria={CRITERIA}
        onSubmit={handleSubmit}
        submitting={submitting}
        disabled={submitted}
      />
    </div>
  );
}
