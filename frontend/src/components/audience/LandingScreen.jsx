import { useState } from "react";
import DotGrid from "../shared/DotGrid";
import SatisfactionMeter from "./SatisfactionMeter";
export default function LandingScreen({ onJoin, liveStats }) {
  const [name,setName] = useState("");
  const [focused,setFocused] = useState(false);
  const canJoin = name.trim().length > 0;

  return (
    <div className="relative min-h-dvh bg-screen-bg overflow-x-hidden">
      <DotGrid />

      <div className="relative z-10 max-w-md mx-auto px-5 pt-12 pb-10 flex flex-col gap-6">

        <div className="flex flex-col items-center text-center gap-3 animate-slide-up">
    
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full bg-brand-gradient
                            flex items-center justify-center text-4xl
                            shadow-orb animate-float">
              🚀
            </div>

            <div className="absolute inset-0 -m-2 rounded-full border-2
                            border-brand-orange/20 animate-spin
                            [animation-duration:12s]" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-brand-navy/5
                          border border-brand-navy/10 rounded-full
                          px-4 py-1.5 text-[10px] font-black tracking-widest
                          text-brand-navy uppercase">
            DST i-TBI × NITA Foundation
          </div>

          <h1 className="font-display font-black text-5xl text-brand-navy
                         leading-[0.95] tracking-tight mt-1">
            Startup<br />
            <span className="text-gradient-orange">Khumb</span>
          </h1>

          <p className="text-xs font-bold text-slate-400 tracking-[3px] uppercase">
            The Ultimate Pitch Arena
          </p>
        </div>
       
        <div className="animate-slide-up [animation-delay:100ms] opacity-0
                        [animation-fill-mode:forwards]">
          <SatisfactionMeter stats={liveStats} />
        </div>

        <div className="card p-5 animate-slide-up [animation-delay:200ms] opacity-0
                        [animation-fill-mode:forwards]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">👋</span>
            <p className="text-sm font-semibold text-slate-600">
              Join the audience &amp; vote on live pitches!
            </p>
          </div>

          <label className="block text-[10px] font-black text-slate-500
                            tracking-widest uppercase mb-2">
            Your Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && canJoin && onJoin(name.trim())}
            placeholder="e.g. Rahul Verma"
            className="input-field mb-4"
          />

          <button
            onClick={() => canJoin && onJoin(name.trim())}
            disabled={!canJoin}
            className="btn-primary"
          >
            <span>🎟️</span>
            <span>Enter the Arena</span>
            <span className="ml-auto text-white/70">→</span>
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-400 font-medium
                      animate-slide-up [animation-delay:300ms] opacity-0
                      [animation-fill-mode:forwards]">
          🔗 Scanned a QR code? Just enter your name above
        </p>

      </div>
    </div>
  );
}
