/** @type {import('tailwindcss').Config} */
// Light "platinum" system: a cool silver-white page, graphite type and
// panels, and the ember gradient used sparingly as the accent. The logo's
// gold + silver + black reads cleanly on this palette.
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Theme-aware colours: each token reads an RGB triple from a CSS
      // variable (light values on :root, dark values on .dark — see
      // globals.css), so every opacity modifier like text-graphite/60 still
      // works and the whole site flips theme by toggling one class.
      //  • graphite as TEXT/BORDER = the ink colour (dark on light, light on dark)
      //  • graphite as BACKGROUND  = the "panel" colour (always a dark panel)
      //  • white as BACKGROUND     = the "surface" colour (white / dark card)
      //  • snow / coal             = fixed white / black that never flip
      colors: {
        paper: {
          DEFAULT: "rgb(var(--c-paper) / <alpha-value>)",
          2: "rgb(var(--c-paper-2) / <alpha-value>)",
          3: "rgb(var(--c-paper-3) / <alpha-value>)",
        },
        card: "rgb(var(--c-surface) / <alpha-value>)",
        graphite: {
          DEFAULT: "rgb(var(--c-panel) / <alpha-value>)",
          2: "rgb(var(--c-panel-2) / <alpha-value>)",
          3: "rgb(var(--c-panel-3) / <alpha-value>)",
        },
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        steel: {
          DEFAULT: "rgb(var(--c-steel) / <alpha-value>)",
          light: "rgb(var(--c-steel-light) / <alpha-value>)",
        },
        line: "rgb(var(--c-ink) / 0.10)",
        ember: { DEFAULT: "#E85D10", light: "#FFAA4C", deep: "#B4320F" },
        snow: "#FFFFFF",
        coal: "#0D0F12",
      },
      textColor: { graphite: "rgb(var(--c-ink) / <alpha-value>)" },
      borderColor: { graphite: "rgb(var(--c-ink) / <alpha-value>)" },
      divideColor: { graphite: "rgb(var(--c-ink) / <alpha-value>)" },
      backgroundColor: { white: "rgb(var(--c-surface) / <alpha-value>)" },
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
