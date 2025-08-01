const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url(\"../assets/header.svg\")",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      "white": "#fff",
      "border": "var(--border)",
      "input": "var(--input)",
      "ring": "var(--ring)",
      "background": "var(--background)",
      "foreground": "var(--foreground)",
      "background-inset": "var(--background-inset-color)",
      "foreground-inset": "var(--foreground-inset-color)",
      "primary": {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      "secondary": {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      "destructive": {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      "muted": {
        "DEFAULT": "var(--muted)",
        "gray-foreground": "var(--muted-gray-foreground)",
        "foreground": "var(--muted-foreground)",
      },
      "accent": {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      "popover": {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      "card": {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
