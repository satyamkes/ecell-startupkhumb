import { useState } from "react";


export default function JudgeLoginScreen({ onLogin, authError, authLoading }) {
  const [email, setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState(null); 

  const canSubmit = email.trim().length > 0 && password.length > 0 && !authLoading;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (canSubmit) onLogin(email.trim(), password);
  };

  return (
    <div className="min-h-dvh bg-judge-bg flex flex-col items-center justify-center
                    px-5 py-10 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        rounded-full opacity-20"
             style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]
                        rounded-full opacity-10"
             style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.5) 0%, transparent 70%)" }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: "linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)",
               backgroundSize: "60px 60px",
             }} />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-6">

        {/* Logo + branding */}
        <div className="text-center animate-slide-up opacity-0 [animation-fill-mode:forwards]">
          <div className="w-16 h-16 rounded-2xl bg-score-gradient mx-auto mb-4
                          flex items-center justify-center text-3xl shadow-orange
                          animate-glow-pulse">
            ⚖️
          </div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                          rounded-full px-4 py-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-live-pulse" />
            <span className="text-[11px] font-black text-white/60 tracking-widest uppercase">
              Judge Portal
            </span>
          </div>
          <h1 className="font-display font-black text-4xl text-white tracking-tight leading-tight">
            Startup<br />
            <span className="text-transparent bg-clip-text bg-score-gradient">Khumb</span>
          </h1>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-2 font-semibold">
            Evaluation Dashboard
          </p>
        </div>

        <div className="bg-judge-card border border-judge-border rounded-3xl p-6 shadow-2xl
                        animate-slide-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">

          <h2 className="text-white font-bold text-lg mb-1">Welcome, Judge</h2>
          <p className="text-white/40 text-sm mb-6">
            Enter your credentials to access the evaluation panel.
          </p>

          {authError && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25
                            rounded-xl p-3 mb-5 animate-pop-in">
              <span className="text-red-400 text-base mt-0.5">⚠️</span>
              <p className="text-red-300 text-sm font-medium">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[10px] font-black text-white/40
                                tracking-widest uppercase mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="judge@example.com"
                  autoComplete="email"
                  className="w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3.5
                             text-white text-sm placeholder:text-white/20 outline-none
                             transition-all duration-200"
                  style={{
                    borderColor: focused === "email" ? "#F97316" : "rgba(255,255,255,0.1)",
                    boxShadow: focused === "email" ? "0 0 0 3px rgba(249,115,22,0.15)" : "none",
                  }}
                />
              </div>
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-white/40
                                tracking-widest uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                  🔒
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-white/5 border rounded-xl pl-10 pr-12 py-3.5
                             text-white text-sm placeholder:text-white/20 outline-none
                             transition-all duration-200"
                  style={{
                    borderColor: focused === "password" ? "#F97316" : "rgba(255,255,255,0.1)",
                    boxShadow: focused === "password" ? "0 0 0 3px rgba(249,115,22,0.15)" : "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                             text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-score-gradient text-white font-display font-bold text-base
                         rounded-2xl py-4 flex items-center justify-center gap-2.5
                         transition-all duration-200 mt-2
                         disabled:opacity-40 disabled:cursor-not-allowed"
              style={canSubmit ? { boxShadow: "0 6px 24px rgba(249,115,22,0.4)" } : {}}
            >
              {authLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30
                                   border-t-white animate-spin-ring" />
                  Verifying…
                </>
              ) : (
                <>
                  <span>🔓</span> Enter Dashboard
                </>
              )}
            </button>
          </form>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4
                        animate-slide-up opacity-0 [animation-delay:200ms]
                        [animation-fill-mode:forwards]">
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-wider mb-2">
            🔑 Demo Credentials
          </p>
          <div className="space-y-1">
            {[
              { email: "anil@dsti-tbi.in",  pass: "judge123" },
              { email: "sunita@nita.ac.in", pass: "judge456" },
              { email: "vikram@startup.in", pass: "judge789" },
            ].map((c) => (
              <button
                key={c.email}
                onClick={() => { setEmail(c.email); setPassword(c.pass); }}
                className="block w-full text-left px-3 py-1.5 rounded-lg
                           hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-white/50 text-xs font-mono">{c.email}</span>
                <span className="text-white/20 text-xs mx-2">·</span>
                <span className="text-brand-orange/60 text-xs font-mono">{c.pass}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-white/20 text-[11px] font-medium">
          🔒 Scores are private · Never shown on public screens
        </p>
      </div>
    </div>
  );
}
