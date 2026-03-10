export default function ScoreSummaryBar({ scores, criteria, onSubmit, submitting, disabled }) {
  const values     = Object.values(scores).filter((v) => v != null);
  const filled     = values.length;
  const total      = criteria.length;
  const sum        = values.reduce((a, b) => a + b, 0);
  const maxScore   = total * 10;
  const pct        = filled > 0 ? Math.round((sum / (filled * 10)) * 100) : 0;
  const allDone    = filled === total;

  const getColor = (p) =>
    p >= 80 ? "#22C55E" : p >= 60 ? "#F59E0B" : p >= 40 ? "#F97316" : "#EF4444";

  const color = getColor(pct);

  return (
    <div className="fixed bottom-0 inset-x-0 z-30
                    bg-judge-surface/95 backdrop-blur-xl
                    border-t border-judge-border">
      <div className="max-w-2xl mx-auto px-5 py-4">
        <div className="flex items-center gap-4">

          <div className="flex items-baseline gap-1 flex-shrink-0">
            <span className="font-display font-black text-3xl leading-none transition-all"
                  style={{ color: allDone ? color : "#475569" }}>
              {sum}
            </span>
            <span className="text-white/25 font-bold text-sm">/{filled > 0 ? filled * 10 : maxScore}</span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-white/40 text-[11px] font-semibold">
                {filled}/{total} criteria scored
              </span>
              {allDone && (
                <span className="text-[11px] font-bold" style={{ color }}>
                  {pct}% overall
                </span>
              )}
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width:      `${(filled / total) * 100}%`,
                  background: `linear-gradient(90deg, #F97316, ${color})`,
                }}
              />
            </div>
          </div>

          <button
            onClick={onSubmit}
            disabled={!allDone || submitting || disabled}
            className="flex-shrink-0 flex items-center gap-2 font-display font-bold
                       text-sm rounded-2xl px-5 py-3 transition-all duration-200
                       disabled:opacity-35 disabled:cursor-not-allowed"
            style={allDone && !disabled
              ? { background: "linear-gradient(135deg,#F97316,#F59E0B)", color: "#fff", boxShadow: "0 4px 18px rgba(249,115,22,0.4)" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin-ring" />
                Saving…
              </>
            ) : (
              <> Submit</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
