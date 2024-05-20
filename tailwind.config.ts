import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "product-card-text": "#2c2727",
        dark: "#2c2727",
        "product-card-last-price": "rgb(107, 107, 107)",
        "t-grey": "rgb(107, 107, 107)",
        pink: "rgb(249, 67, 107)",
        "link-pink": "#F9436B",
        gray: "rgb(218, 218, 218)",
        "number-text": "rgb(44, 39, 39)",
        "dark-text": "rgb(44, 39, 39)",
        mainScene: "#F2F2F2",
        "user-profile": "rgb(93, 85, 85);",
        "border-grey": "rgb(222, 222, 222)",
        "grey-text-header": "#DEDEDE",
        "category-border": "rgb(218, 218, 218);",
        blue: "rgb(7, 79, 165)",
        "blue-link": "#074FA5",
      },
      boxShadow: {
        "product-card": "4px 4px 15px 0px rgba(0, 0, 0, 0.07)",
        custom: "4px 4px 15px 0px rgba(0, 0, 0, 0.07)",
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(236.45deg, rgb(240, 27, 116) 29.85%, rgb(255, 96, 100) 93.311%)",
      },
    },
    fontFamily: {
      "robot-c": ['"Roboto Condensed"', "sans"],
      robot: ["Roboto", "sans"],
      inter: ["Inter", "sans"],
    },
    screens: {
      lt: { min: "0px", max: "374px" },
      sm2: { min: "386", max: "742px" },

      sm: { min: "0px", max: "743px" },

      md: { min: "744px", max: "1279px" },
      md2: { min: "1024px", max: "9999px" },

      xl: { min: "1280px", max: "1439px" },

      lg: { min: "1440px", max: "5000px" },

      "2xl": { min: "1921px", max: "5000px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
