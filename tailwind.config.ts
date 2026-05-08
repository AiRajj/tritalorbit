import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // TRITAL Orbit brand
        orbit: {
          deep: "#0B3C5D",
          deeper: "#062B45",
          red: "#E63946",
          ember: "#C5303C",
          mist: "#F8FAFC",
          slate: "#1F2937",
          ink: "#0A1929",
          steel: "#3B5468",
          gold: "#D4A24C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(11, 60, 93, 0.4)" },
          "50%": { boxShadow: "0 0 0 16px rgba(11, 60, 93, 0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        orbit: "orbit 24s linear infinite",
      },
      backgroundImage: {
        "orbit-radial":
          "radial-gradient(60% 70% at 50% 0%, rgba(11,60,93,0.12) 0%, rgba(11,60,93,0) 60%)",
        "orbit-grid":
          "linear-gradient(to right, rgba(11,60,93,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,60,93,0.06) 1px, transparent 1px)",
        "orbit-hero":
          "radial-gradient(120% 80% at 50% 0%, rgba(11,60,93,0.95) 0%, rgba(6,43,69,1) 60%, rgba(10,25,41,1) 100%)",
      },
      boxShadow: {
        elevate:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(11,60,93,0.35), 0 8px 16px -8px rgba(11,60,93,0.18)",
        ring: "0 0 0 1px rgba(11,60,93,0.08), 0 24px 48px -24px rgba(11,60,93,0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
