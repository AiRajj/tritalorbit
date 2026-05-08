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
          slate: "#1F2937"
        }
      },
      backgroundImage: {
        "orbit-gradient": "linear-gradient(135deg, #0B3C5D 0%, #1F2937 55%, #E63946 100%)",
        "orbit-soft": "radial-gradient(circle at top right, rgba(11,60,93,0.18), rgba(230,57,70,0.16), rgba(248,250,252,0.9))"
      },
      boxShadow: {
        premium: "0 20px 40px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
