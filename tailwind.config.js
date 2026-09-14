/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          soft: "#101010",
          softer: "#151515",
        },
        gold: {
          DEFAULT: "#F2661C",
          light: "#FFB562",
          deep: "#B3300C",
        },
        silver: "#C0C0C0",
        muted: "#A0A0A0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFB562 0%, #F2661C 55%, #B3300C 100%)",
        "radial-glow": "radial-gradient(ellipse at center, rgba(242,102,28,0.18) 0%, rgba(5,5,5,0) 70%)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
