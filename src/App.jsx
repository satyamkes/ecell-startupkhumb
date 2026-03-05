import { useState, useEffect } from "react";

function useEventSocket() {
  const [activeStartup] = useState({
    name: "EcoGrid Technologies",
    tagline: "Powering Tomorrow's Cities",
    category: "CleanTech",
    founderName: "Priya Sharma",
    pitchOrder: 3,
    totalPitches: 8,
  });
  const [pollOpen, setPollOpen] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalVoters: 142,
    likeIdea: 89,
    likePresentation: 104,
    wouldJoin: 67,
    satisfactionScore: 74,
  });

  useEffect(() => {
    const t = setTimeout(() => setPollOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => {
        const tv = prev.totalVoters + Math.floor(Math.random() * 3);
        const li = prev.likeIdea + (Math.random() > 0.3 ? 1 : 0);
        const lp = prev.likePresentation + (Math.random() > 0.35 ? 1 : 0);
        const wj = prev.wouldJoin + (Math.random() > 0.5 ? 1 : 0);
        const score = Math.round(((li + lp + wj) / (tv * 3)) * 100);
        return { totalVoters: tv, likeIdea: li, likePresentation: lp, wouldJoin: wj, satisfactionScore: score };
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return { activeStartup, pollOpen, liveStats };
}

// ─── Dot Grid + Soft Blob Background ─────────────────────────────────────────
function DotGrid() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <defs>
          <pattern id="dotpat" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0E1B4D" opacity="0.22" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotpat)" />
      </svg>
      <div style={{ position: "absolute", top: "-8%", right: "-12%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: "42%", left: "28%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
    </div>
  );
}

function SatisfactionMeter({ stats, compact = false }) {
  const pct = stats.satisfactionScore;
  const color = pct >= 75 ? "#16A34A" : pct >= 50 ? "#EA580C" : "#DC2626";
  const bgColor = pct >= 75 ? "#F0FDF4" : pct >= 50 ? "#FFF7ED" : "#FEF2F2";
  const borderColor = pct >= 75 ? "#BBF7D0" : pct >= 50 ? "#FED7AA" : "#FECACA";
  const label = pct >= 75 ? "Crowd Loves It 🔥" : pct >= 50 ? "Mixed Reactions ⚡" : "Needs Work 🤔";

  if (compact) {
    const r = 12;
    const circ = 2 * Math.PI * r;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: `1.5px solid ${borderColor}`, borderRadius: 40, padding: "5px 12px 5px 6px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        <div style={{ position: "relative", width: 32, height: 32 }}>
          <svg width="32" height="32" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="16" cy="16" r={r} fill="none" stroke="#F1F5F9" strokeWidth="3" />
            <circle cx="16" cy="16" r={r} fill="none" stroke={color} strokeWidth="3"
              strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color, fontFamily: "'Exo 2',sans-serif" }}>{pct}%</span>
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#94A3B8", fontWeight: 700, letterSpacing: 0.8 }}>CROWD SCORE</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0E1B4D" }}>{stats.totalVoters.toLocaleString()} votes</div>
        </div>
      </div>
    );
  }

  // Full meter
  const R = 38;
  const C = 2 * Math.PI * R;
  const bars = [
    { label: "Like the Idea", count: stats.likeIdea, color: "#F97316", icon: "💡" },
    { label: "Liked the Pitch", count: stats.likePresentation, color: "#3B82F6", icon: "🎤" },
    { label: "Would Join", count: stats.wouldJoin, color: "#22C55E", icon: "🚀" },
  ];
  const cumulative = stats.totalVoters > 0
    ? Math.round(((stats.likeIdea + stats.likePresentation + stats.wouldJoin) / (stats.totalVoters * 3)) * 100)
    : 0;

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${borderColor}`, borderRadius: 20, padding: 20, boxShadow: "0 4px 24px rgba(14,27,77,0.08)", position: "relative", overflow: "hidden" }}>
      {/* Gradient top strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, #F97316, ${color})`, borderRadius: "20px 20px 0 0" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: 1.2, margin: 0 }}>LIVE CROWD SATISFACTION</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0E1B4D", margin: "4px 0 0" }}>{label}</p>
        </div>
        {/* Donut */}
        <div style={{ position: "relative", width: 88, height: 88 }}>
          <svg width="88" height="88" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="44" cy="44" r={R} fill="none" stroke="#F1F5F9" strokeWidth="8" />
            <circle cx="44" cy="44" r={R} fill="none" stroke={color} strokeWidth="8"
              strokeDasharray={C} strokeDashoffset={C - (pct / 100) * C}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color}55)` }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Exo 2',sans-serif" }}>{pct}%</span>
            <span style={{ fontSize: 8, color: "#94A3B8", fontWeight: 600, letterSpacing: 0.3 }}>SATISFIED</span>
          </div>
        </div>
      </div>

      {bars.map((b) => {
        const bp = stats.totalVoters > 0 ? Math.round((b.count / stats.totalVoters) * 100) : 0;
        return (
          <div key={b.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: "#475569", fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                <span>{b.icon}</span>{b.label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{bp}%</span>
            </div>
            <div style={{ height: 6, background: "#F1F5F9", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${bp}%`, background: b.color, borderRadius: 10, transition: "width 1s ease", boxShadow: `0 0 8px ${b.color}55` }} />
            </div>
          </div>
        );
      })}

      {/* Cumulative total score */}
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#0E1B4D", letterSpacing: 0.4 }}>
            📊 Cumulative Satisfaction Score
          </span>
          <span style={{ fontSize: 14, fontWeight: 900, color, fontFamily: "'Exo 2',sans-serif" }}>{cumulative}%</span>
        </div>
        {/* Segmented bar */}
        <div style={{ display: "flex", gap: 2, height: 10, borderRadius: 10, overflow: "hidden" }}>
          {bars.map((b) => {
            const w = stats.totalVoters > 0 ? (b.count / (stats.totalVoters * 3)) * 100 : 0;
            return (
              <div key={b.label} style={{ height: "100%", width: `${w}%`, background: b.color, transition: "width 1s ease", minWidth: w > 0 ? 4 : 0 }} />
            );
          })}
          <div style={{ flex: 1, background: "#F1F5F9" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={{ fontSize: 10, color: "#94A3B8" }}>0%</span>
          <span style={{ fontSize: 10, color: "#94A3B8" }}>100%</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", animation: "livePulse 1.5s infinite", display: "inline-block" }} />
        <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>
          {stats.totalVoters.toLocaleString()} live votes • updates in real-time
        </span>
      </div>
    </div>
  );
}

function LandingScreen({ onJoin, liveStats }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const canJoin = name.trim().length > 0;

  return (
    <div style={S.screen}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1, padding: "40px 22px 40px", maxWidth: 440, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={S.logoOrb}></div>
          <div style={S.badge}>DST i-TBI × NITA Foundation</div>
          <h1 style={S.heroTitle}>Startup<br /><span style={{ color: "#F97316" }}>Khumb</span></h1>
          <p style={S.heroSub}>The Ultimate Pitch Arena</p>
        </div>

        {/* Live satisfaction always visible */}
        <div style={{ marginBottom: 20 }}>
          <SatisfactionMeter stats={liveStats} />
        </div>

        <div style={S.card}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 16 }}>
            👋 Join the audience to vote on pitches in real-time!
          </p>
          <label style={S.label}>Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. Rahul Verma"
            style={{ ...S.input, borderColor: focused ? "#F97316" : "#E2E8F0", boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.12)" : "0 1px 3px rgba(0,0,0,0.04)" }}
          />
          <button onClick={() => canJoin && onJoin(name.trim())} style={{ ...S.primaryBtn, opacity: canJoin ? 1 : 0.4, cursor: canJoin ? "pointer" : "not-allowed" }}>
            🎟️ &nbsp;Enter the Arena →
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "#B0BAD0", marginTop: 16 }}>
          🔗 Scanned a QR code? Just enter your name above
        </p>
      </div>
    </div>
  );
}

function WatchingScreen({ startup, userName, pollOpen, onPollReady, liveStats }) {
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (pollOpen) {
      setTransitioning(true);
      const t = setTimeout(() => onPollReady(), 1400);
      return () => clearTimeout(t);
    }
  }, [pollOpen]);

  const categoryMeta = {
    CleanTech: { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", icon: "🌿" },
    FinTech: { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", icon: "💳" },
    HealthTech: { color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8", icon: "🏥" },
    EdTech: { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", icon: "📚" },
    AgriTech: { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", icon: "🌾" },
  };
  const meta = categoryMeta[startup.category] || { color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA", icon: "💡" };

  return (
    <div style={S.screen}>
      <DotGrid />
      <div style={S.topBar}>
        <div style={S.liveChip}><span style={S.liveDot} />LIVE</div>
        <SatisfactionMeter stats={liveStats} compact />
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>#{startup.pitchOrder}/{startup.totalPitches}</span>
      </div>

      <div style={{ padding: "76px 22px 32px", maxWidth: 440, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", letterSpacing: 1.8 }}>NOW PITCHING</span>
          <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
        </div>

        {/* Startup hero card */}
        <div style={{ ...S.card, borderTop: `4px solid ${meta.color}`, marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -8, bottom: -12, fontSize: 96, opacity: 0.04, fontFamily: "'Exo 2',sans-serif", fontWeight: 900, color: meta.color, userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>
            {startup.pitchOrder}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: meta.bg, border: `1px solid ${meta.border}`, color: meta.color, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, marginBottom: 14 }}>
            <span>{meta.icon}</span>{startup.category}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0E1B4D", margin: "0 0 6px", fontFamily: "'Exo 2',sans-serif", lineHeight: 1.2 }}>{startup.name}</h2>
          <p style={{ color: "#64748B", fontSize: 14, fontStyle: "italic", margin: "0 0 18px" }}>"{startup.tagline}"</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 800, boxShadow: "0 2px 10px rgba(249,115,22,0.3)" }}>
              {startup.founderName[0]}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: 0.8 }}>FOUNDER</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0E1B4D" }}>{startup.founderName}</div>
            </div>
          </div>
        </div>

        {/* Full satisfaction meter */}
        <div style={{ marginBottom: 16 }}><SatisfactionMeter stats={liveStats} /></div>

        {!pollOpen && !transitioning && (
          <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, background: "#FFF7ED", borderColor: "#FED7AA" }}>
            <div style={S.spinner} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0E1B4D" }}>Sit tight, {userName.split(" ")[0]}!</div>
              <div style={{ fontSize: 12, color: "#94A3B8" }}>Voting opens when the pitch ends</div>
            </div>
          </div>
        )}
        {transitioning && (
          <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, background: "#F0FDF4", borderColor: "#A7F3D0", animation: "popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
            <span style={{ fontSize: 28 }}>🗳️</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#16A34A" }}>Poll is Opening!</div>
              <div style={{ fontSize: 12, color: "#4ADE80" }}>Get ready to cast your vote…</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TogglePair({ value, onChange, opts }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
      {opts.map((opt) => {
        const active = value === opt.value;
        return (
          <button key={String(opt.value)} onClick={() => onChange(opt.value)} style={{
            flex: 1, padding: "13px 6px", borderRadius: 12,
            border: `2px solid ${active ? opt.color : "#E2E8F0"}`,
            background: active ? `${opt.color}12` : "#FAFAFA",
            color: active ? opt.color : "#94A3B8",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            transition: "all 0.18s ease",
            transform: active ? "scale(1.04)" : "scale(1)",
            boxShadow: active ? `0 4px 16px ${opt.color}28` : "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 22 }}>{opt.icon}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function VotingScreen({ startup, userName, onSubmit, liveStats }) {
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const answered = [q1, q2, q3].filter((v) => v !== null).length;
  const allDone = answered === 3;

  const handleSubmit = () => {
    if (!allDone || submitting) return;
    setSubmitting(true);
    setTimeout(() => onSubmit({ likeIdea: q1, likePresentation: q2, wouldJoin: q3 }), 900);
  };

  const questions = [
    { key: "q1", label: "Do you like the idea?", sub: "Is the concept exciting & innovative?", value: q1, onChange: setQ1, opts: [{ value: true, label: "Love It!", icon: "💡", color: "#F97316" }, { value: false, label: "Not really", icon: "😕", color: "#EF4444" }] },
    { key: "q2", label: "Did you like the presentation?", sub: "Was the pitch clear and compelling?", value: q2, onChange: setQ2, opts: [{ value: true, label: "Yes!", icon: "🎤", color: "#3B82F6" }, { value: false, label: "Not really", icon: "😐", color: "#EF4444" }] },
    { key: "q3", label: "Would you join this startup?", sub: "Would you be part of this journey?", value: q3, onChange: setQ3, opts: [{ value: true, label: "Count me in!", icon: "🚀", color: "#22C55E" }, { value: false, label: "Maybe not", icon: "🤔", color: "#EF4444" }] },
  ];

  return (
    <div style={S.screen}>
      <DotGrid />
      <div style={S.topBar}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0E1B4D" }}>{startup.name}</div>
        <SatisfactionMeter stats={liveStats} compact />
      </div>

      <div style={{ padding: "76px 22px 32px", maxWidth: 440, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Hi {userName.split(" ")[0]}! Cast your vote 🗳️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: allDone ? "#16A34A" : "#EA580C" }}>{answered}/3 answered</span>
          </div>
          <div style={{ height: 6, background: "#F1F5F9", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(answered / 3) * 100}%`, background: allDone ? "linear-gradient(90deg,#22C55E,#16A34A)" : "linear-gradient(90deg,#F97316,#F59E0B)", borderRadius: 10, transition: "width 0.4s ease", boxShadow: allDone ? "0 0 10px rgba(34,197,94,0.4)" : "0 0 10px rgba(249,115,22,0.4)" }} />
          </div>
        </div>

        {/* Question cards */}
        {questions.map((q, i) => {
          const isAnswered = q.value !== null;
          const isActive = i === answered && !isAnswered;
          return (
            <div key={q.key} style={{ ...S.card, marginBottom: 12, borderLeft: `4px solid ${isAnswered ? "#22C55E" : isActive ? "#F97316" : "#E2E8F0"}`, opacity: i > answered && !isAnswered ? 0.42 : 1, transition: "opacity 0.3s, border-color 0.3s, box-shadow 0.3s", boxShadow: isActive ? "0 4px 20px rgba(249,115,22,0.12)" : "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: isAnswered ? "#22C55E" : isActive ? "#FFF7ED" : "#F8FAFC", border: `2px solid ${isAnswered ? "#22C55E" : isActive ? "#F97316" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isAnswered ? "#fff" : isActive ? "#F97316" : "#94A3B8", transition: "all 0.3s", marginTop: 1 }}>
                  {isAnswered ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0E1B4D" }}>{q.label}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{q.sub}</div>
                  <TogglePair value={q.value} onChange={q.onChange} opts={q.opts} />
                </div>
              </div>
            </div>
          );
        })}

     
        <div style={{ marginBottom: 14 }}>
          <button onClick={() => setStatsOpen(!statsOpen)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "8px 0", color: "#64748B", fontSize: 12, fontWeight: 600 }}>
            <span>📊 See how others are voting live</span>
            <span style={{ transition: "transform 0.2s", transform: statsOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>▼</span>
          </button>
          {statsOpen && <div style={{ animation: "slideDown 0.3s ease" }}><SatisfactionMeter stats={liveStats} /></div>}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!allDone || submitting} style={{ ...S.primaryBtn, background: allDone ? "linear-gradient(135deg,#F97316,#F59E0B)" : "#E2E8F0", color: allDone ? "#fff" : "#94A3B8", cursor: allDone ? "pointer" : "not-allowed", boxShadow: allDone ? "0 6px 24px rgba(249,115,22,0.35)" : "none" }}>
          {submitting ? <><span style={S.btnSpinner} /> Submitting…</> : <><span>🗳️</span> Submit My Vote</>}
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "#B0BAD0", marginTop: 12 }}>🔒 Anonymous · One vote per person · Final</p>
      </div>
    </div>
  );
}


function SubmittedScreen({ startup, votes, liveStats }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [100, 500, 900].map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const breakdown = [
    { label: "Liked the Idea", value: votes.likeIdea, icon: "💡", color: "#F97316" },
    { label: "Great Presentation", value: votes.likePresentation, icon: "🎤", color: "#3B82F6" },
    { label: "Would Join", value: votes.wouldJoin, icon: "🚀", color: "#22C55E" },
  ];
  const myScore = breakdown.filter((b) => b.value).length;

  return (
    <div style={S.screen}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1, padding: "40px 22px", maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100dvh", justifyContent: "center" }}>

        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg,#F0FDF4,#DCFCE7)", border: "3px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, marginBottom: 20, transform: step >= 1 ? "scale(1)" : "scale(0)", transition: "transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275)", boxShadow: "0 8px 32px rgba(34,197,94,0.25)" }}>✅</div>

        <div style={{ textAlign: "center", marginBottom: 24, opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s ease 0.2s" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0E1B4D", fontFamily: "'Exo 2',sans-serif", margin: "0 0 6px" }}>Vote Submitted!</h2>
          <p style={{ color: "#64748B", fontSize: 14 }}>You voted on <strong style={{ color: "#F97316" }}>{startup.name}</strong></p>
        </div>

        <div style={{ width: "100%", marginBottom: 16, opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s ease 0.3s" }}>
          <div style={{ ...S.card, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1, margin: 0 }}>YOUR VOTES</p>
              <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: myScore === 3 ? "#F0FDF4" : myScore >= 2 ? "#FFF7ED" : "#FEF2F2", color: myScore === 3 ? "#16A34A" : myScore >= 2 ? "#EA580C" : "#DC2626", border: `1px solid ${myScore === 3 ? "#BBF7D0" : myScore >= 2 ? "#FED7AA" : "#FECACA"}` }}>
                {myScore}/3 positive
              </span>
            </div>
            {breakdown.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? "1px solid #F8FAFC" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{b.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: b.value ? b.color : "#EF4444", background: b.value ? `${b.color}12` : "#FEF2F2", border: `1px solid ${b.value ? b.color + "33" : "#FECACA"}`, borderRadius: 20, padding: "2px 10px" }}>
                  {b.value ? "YES" : "NO"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full satisfaction meter visible post-submit */}
        <div style={{ width: "100%", marginBottom: 14, opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s ease 0.5s" }}>
          <SatisfactionMeter stats={liveStats} />
        </div>

        <div style={{ width: "100%", background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 14, padding: "14px 16px", textAlign: "center", opacity: step >= 3 ? 1 : 0, transition: "opacity 0.4s ease 0.7s" }}>
          <p style={{ color: "#92400E", fontSize: 13, margin: 0 }}>
            👀 Watch the <strong>Main Stage Screen</strong> for the live leaderboard & final scores!
          </p>
        </div>
      </div>
    </div>
  );
}


export default function AudiencePortal() {
  const [screen, setScreen] = useState("landing");
  const [userName, setUserName] = useState("");
  const [votes, setVotes] = useState(null);
  const { activeStartup, pollOpen, liveStats } = useEventSocket();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body{background:#F8FAFD;font-family:'Plus Jakarta Sans',sans-serif}
      input,button{font-family:inherit}
      @keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.35;transform:scale(0.7)}}
      @keyframes popIn{0%{transform:scale(0.82);opacity:0}100%{transform:scale(1);opacity:1}}
      @keyframes slideDown{0%{opacity:0;transform:translateY(-8px)}100%{opacity:1;transform:translateY(0)}}
      @keyframes spinRing{to{transform:rotate(360deg)}}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-thumb{background:rgba(249,115,22,0.25);border-radius:4px}
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ background: "#F8FAFD", minHeight: "100dvh" }}>
      {screen === "landing" && <LandingScreen liveStats={liveStats} onJoin={(n) => { setUserName(n); setScreen("watching"); }} />}
      {screen === "watching" && <WatchingScreen startup={activeStartup} userName={userName} pollOpen={pollOpen} liveStats={liveStats} onPollReady={() => setScreen("voting")} />}
      {screen === "voting" && <VotingScreen startup={activeStartup} userName={userName} liveStats={liveStats} onSubmit={(v) => { setVotes(v); setScreen("submitted"); }} />}
      {screen === "submitted" && <SubmittedScreen startup={activeStartup} votes={votes} liveStats={liveStats} />}
    </div>
  );
}

const S = {
  screen: { minHeight: "100dvh", background: "linear-gradient(160deg,#F8FAFD 0%,#EFF4FF 55%,#F5FBF8 100%)", position: "relative" },
  card: { background: "#fff", border: "1.5px solid #E8EDF5", borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(14,27,77,0.06)" },
  topBar: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: "rgba(248,250,253,0.93)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E8EDF5" },
  liveChip: { display: "flex", alignItems: "center", gap: 6, background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", borderRadius: 20, padding: "4px 10px", fontSize: 10, fontWeight: 800, letterSpacing: 1.5 },
  liveDot: { width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "livePulse 1.5s infinite" },
  logoOrb: { width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#F59E0B 50%,#22C55E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 14px", boxShadow: "0 8px 30px rgba(249,115,22,0.3)" },
  badge: { display: "inline-block", background: "rgba(14,27,77,0.07)", border: "1px solid rgba(14,27,77,0.12)", color: "#0E1B4D", borderRadius: 20, padding: "4px 14px", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, marginBottom: 12 },
  heroTitle: { fontSize: 52, fontWeight: 900, color: "#0E1B4D", lineHeight: 1.0, letterSpacing: -2, fontFamily: "'Exo 2',sans-serif", marginBottom: 6 },
  heroSub: { color: "#94A3B8", fontSize: 13, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 0 },
  label: { display: "block", fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" },
  input: { width: "100%", borderRadius: 12, border: "1.5px solid #E2E8F0", padding: "13px 16px", fontSize: 16, color: "#0E1B4D", outline: "none", transition: "border-color 0.2s,box-shadow 0.2s", background: "#fff", marginBottom: 14 },
  primaryBtn: { width: "100%", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", transition: "transform 0.15s,box-shadow 0.15s", fontFamily: "'Exo 2',sans-serif", letterSpacing: 0.3 },
  spinner: { width: 22, height: 22, borderRadius: "50%", border: "2.5px solid #FED7AA", borderTopColor: "#F97316", animation: "spinRing 0.8s linear infinite", flexShrink: 0 },
  btnSpinner: { width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", animation: "spinRing 0.8s linear infinite", display: "inline-block" },
};