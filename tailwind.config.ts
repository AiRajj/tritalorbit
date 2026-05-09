import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        orbit: {
          blue: "#0B3C5D",
          red: "#E63946",
          white: "#F8FAFC",
          slate: "#1F2937",
          cyan: "#00C2FF",
          navy: "#071A2A",
          emerald: "#0EA5A4"
        }
      },
      backgroundImage: {
        "orbit-gradient": "linear-gradient(135deg, #0B3C5D 0%, #1F2937 55%, #E63946 100%)",
        "orbit-soft": "radial-gradient(circle at top right, rgba(11,60,93,0.18), rgba(230,57,70,0.16), rgba(248,250,252,0.9))",
        "orbit-aurora":
          "linear-gradient(122deg, rgba(7,26,42,1) 0%, rgba(11,60,93,1) 36%, rgba(14,165,164,0.88) 70%, rgba(230,57,70,0.86) 100%)",
        "orbit-grid":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      boxShadow: {
        premium: "0 20px 40px rgba(15, 23, 42, 0.16)",
        glow: "0 0 0 1px rgba(0,194,255,0.4), 0 16px 45px rgba(11,60,93,0.45)"
      },
      borderRadius: {
        xl2: "1.2rem"
      }
    }
  },
  plugins: []
};

export default config;
