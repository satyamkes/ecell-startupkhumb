/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:  "#F97316",
          "orange-light": "#FFF7ED",
          "orange-border": "#FED7AA",
          navy:    "#0E1B4D",
          "navy-50":  "#F0F3FF",
          "navy-100": "#E0E7FF",
          green:   "#22C55E",
          "green-light": "#F0FDF4",
          "green-border": "#BBF7D0",
          blue:    "#3B82F6",
          "blue-light": "#EFF6FF",
        },
        judge: {
          bg:       "#0A0F1E",
          surface:  "#111827",
          card:     "#151E2D",
          border:   "#1E2D45",
          "border-bright": "#2A3F5C",
          accent:   "#F97316",
          gold:     "#F59E0B",
          silver:   "#94A3B8",
        },
      },
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        body:    ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        card:   "0 2px 16px rgba(14,27,77,0.07), 0 1px 4px rgba(14,27,77,0.04)",
        "card-hover": "0 8px 32px rgba(14,27,77,0.12), 0 2px 8px rgba(14,27,77,0.06)",
        orange: "0 6px 24px rgba(249,115,22,0.32)",
        green:  "0 6px 24px rgba(34,197,94,0.28)",
        orb:    "0 8px 32px rgba(249,115,22,0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #22C55E 100%)",
        "orange-gradient": "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
        "screen-bg": "linear-gradient(155deg, #F8FAFD 0%, #EEF3FF 45%, #F4FBF8 100%)",
        "judge-bg": "linear-gradient(145deg, #0A0F1E 0%, #0D1526 50%, #0A1520 100%)",
        "score-gradient": "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":       { opacity: "0.3", transform: "scale(0.65)" },
        },
        "pop-in": {
          "0%":   { opacity: "0", transform: "scale(0.82)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-ring": {
          to: { transform: "rotate(360deg)" },
        },
        "bar-fill": {
          "0%":   { width: "0%" },
          "100%": { width: "var(--bar-w)" },
        },
        "count-up": {
          "0%":   { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        "confetti-fall": {
          "0%":   { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(120px) rotate(720deg)", opacity: "0" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center"  },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(249,115,22,0.3)"  },
          "50%":       { boxShadow: "0 0 28px rgba(249,115,22,0.7)" },
        },
        "score-reveal": {
          "0%":   { opacity: "0", transform: "scale(0.6) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.6s ease-in-out infinite",
        "pop-in":     "pop-in 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "slide-up":   "slide-up 0.4s ease forwards",
        "slide-down": "slide-down 0.3s ease forwards",
        "spin-ring":  "spin-ring 0.75s linear infinite",
        "float":      "float 3s ease-in-out infinite",
        "confetti":   "confetti-fall 1.2s ease forwards",
        "shimmer":    "shimmer 2.4s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "score-reveal":"score-reveal 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        "slide-right": "slide-right 0.35s ease forwards",
      },
    },
  },
  plugins: [],
};
