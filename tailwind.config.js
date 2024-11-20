/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ["Abril Fatface", "serif"],
        antonio: ["Antonio", "sans-serif"],
        sofia: ["Sofia Sans Extra Condensed", "sans-serif"],
      },

      backgroundColor: {
        blue: "#6EDFFB",
        green: "#4A5D50",
      },

      colors: {
        blue: "#6EDFFB",
      },

      keyframes: {
        big: {
          "0%, 100%": { transform: "scale(0.8)" },
          "50%": { transform: "scale(1.2)" },
        },
        small: {
          "0%, 100%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
        },
      },

      animation: {
        pulseBig: "big 1.5s ease-in-out infinite",
        pulseSmall: "small 1.5s ease-in-out infinite",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "2000px",
      // => @media (min-width: 2000px) { ... }

      ipad: { raw: "(min-height: 768px),(min-width: 1024px)" },

      ipadBig: { raw: "(min-height: 1366px),(min-width: 1024px)" },
    },
  },
  plugins: [("flowbite/plugin")],
};
