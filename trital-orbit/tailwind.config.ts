import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "orbit-blue": "#0B3C5D",
        "orbit-red": "#E63946",
        "orbit-white": "#F8FAFC",
        "orbit-dark": "#1F2937",
        "orbit-blue-light": "#1A5276",
        "orbit-blue-lighter": "#2980B9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0B3C5D",
          foreground: "#F8FAFC",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#0B3C5D",
        },
        secondary: {
          DEFAULT: "#E63946",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#E63946",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1F2937",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1F2937",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(230, 57, 70, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(230, 57, 70, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "orbit-gradient": "linear-gradient(135deg, #0B3C5D 0%, #1A5276 50%, #2980B9 100%)",
        "orbit-gradient-dark": "linear-gradient(135deg, #071E2D 0%, #0B3C5D 50%, #1A5276 100%)",
        "orbit-gradient-red": "linear-gradient(135deg, #E63946 0%, #C0392B 100%)",
        "hero-gradient": "linear-gradient(135deg, #071E2D 0%, #0B3C5D 40%, #1A3A4A 100%)",
      },
      boxShadow: {
        "orbit": "0 4px 6px -1px rgba(11, 60, 93, 0.08), 0 2px 4px -1px rgba(11, 60, 93, 0.04)",
        "orbit-lg": "0 10px 25px -5px rgba(11, 60, 93, 0.12), 0 4px 10px -5px rgba(11, 60, 93, 0.06)",
        "orbit-xl": "0 20px 40px -10px rgba(11, 60, 93, 0.2), 0 8px 20px -5px rgba(11, 60, 93, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
