import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#141414",
          950: "#0b0a0f",
          900: "#100e15",
          850: "#16131c",
          800: "#1c1823",
        },
        brand: {
          DEFAULT: "#E50914",
          deep: "#b20710",
          soft: "#ff3b45",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        kicker: "0.32em",
      },
      boxShadow: {
        glow: "0 0 40px -6px rgba(229, 9, 20, 0.65)",
        "glow-lg": "0 0 90px -10px rgba(229, 9, 20, 0.7)",
        card: "0 24px 60px -24px rgba(0, 0, 0, 0.9)",
      },
      maxWidth: {
        shell: "1680px",
      },
    },
  },
  plugins: [],
};

export default config;
