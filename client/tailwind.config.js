/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563EB", // Blue-600
        secondary: "#10B981", // Emerald-500
        neutralLight: "#F8FAFC", // Slate-50
        neutralDark: "#1E293B", // Slate-800
        danger: "#EF4444", // Red-500
        success: "#22C55E", // Green-500
        warning: "#F59E0B", // Amber-500
        info: "#0EA5E9", // Sky-500
      },
    },
  },
  plugins: [],
};