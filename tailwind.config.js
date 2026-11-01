/** @type {import('tailwindcss').Config} */
// Light "platinum" system: a cool silver-white page, graphite type and
// panels, and the ember gradient used sparingly as the accent. The logo's
// gold + silver + black reads cleanly on this palette.
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#F1F2F4", 2: "#E8EAEE", 3: "#DDE0E5" },
        card: "#FFFFFF",
        graphite: { DEFAULT: "#0D0F12", 2: "#16191E", 3: "#22262D" },
        steel: { DEFAULT: "#5A616C", light: "#8A919C" },
        line: "rgba(13,15,18,0.10)",
        ember: { DEFAULT: "#E85D10", light: "#FFAA4C", deep: "#B4320F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: { label: "0.24em" },
      backgroundImage: {
        "ember-gradient": "linear-gradient(120deg, #FFAA4C 0%, #E85D10 52%, #B4320F 100%)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inout: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
