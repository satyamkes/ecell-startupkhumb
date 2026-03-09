/**
 * TogglePair
 * Two-option toggle button group used in the voting screen.
 * Each option has: value, label, icon (emoji), color (hex), activeBg (hex light)
 */
export default function TogglePair({ value, onChange, opts, disabled = false }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mt-3">
      {opts.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            style={{
              borderColor:    active ? opt.color : undefined,
              backgroundColor: active ? opt.activeBg : undefined,
              color:           active ? opt.color : undefined,
              boxShadow:       active ? `0 4px 18px ${opt.color}28` : undefined,
            }}
            className={`
              flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl
              border-2 transition-all duration-200 cursor-pointer
              font-bold text-sm font-body
              ${active
                ? "scale-[1.03]"
                : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:bg-white"
              }
              disabled:cursor-not-allowed disabled:opacity-50
            `}
          >
            <span className="text-2xl leading-none">{opt.icon}</span>
            <span className="text-xs font-bold">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
