import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06111F",
        mist: "#F5F7FB",
        accent: "#7EC8FF",
        "accent-deep": "#1A6EE8",
        "brand-slate": "#97A5BC",
        line: "rgba(151, 165, 188, 0.22)"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(0, 0, 0, 0.24)",
        glow: "0 0 0 1px rgba(126, 200, 255, 0.18), 0 20px 50px rgba(26, 110, 232, 0.18)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(126, 200, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 200, 255, 0.08) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
