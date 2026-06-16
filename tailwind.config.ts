import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        ink: {
          DEFAULT: "#05060f",
          soft: "#0a0a1f",
        },
        aurora: {
          violet: "#7c3aed",
          indigo: "#4f46e5",
          cyan: "#22d3ee",
          magenta: "#d946ef",
        },
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(124, 58, 237, 0.55)",
        "glow-cyan": "0 0 60px -15px rgba(34, 211, 238, 0.5)",
      },
      animation: {
        "aurora-1": "aurora1 22s ease-in-out infinite",
        "aurora-2": "aurora2 28s ease-in-out infinite",
        "aurora-3": "aurora3 25s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
