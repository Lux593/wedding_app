/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF8F3',   // Sehr helles Champagner
          100: '#F5F1E8',  // Helles Champagner
          200: '#EBE3D0',  // Helles Gold
          300: '#D9C9A8',  // Mittel Champagner-Gold
          400: '#C7AF80',  // Kräftiges Champagner-Gold
          500: '#B89968',  // Haupt Luxus-Gold
          600: '#A0804D',  // Dunkleres Luxus-Gold
          700: '#87683A',  // Sehr dunkles Gold
          800: '#6E5330',  // Bronze-Gold
          900: '#554026',  // Sehr dunkel
        },
        cream: {
          25: '#FFFEFC',   // Minimales Creme
          30: '#FFFEFB',   // Sehr minimales Creme
          50: '#FFFEF9',   // Sehr helles Creme
          100: '#FFFDF5',  // Helles Creme
          200: '#FFF9E6',  // Creme
          300: '#FFF5D6',  // Mittel Creme
          400: '#FFF1C6',  // Kräftigeres Creme
          500: '#F5E6D3',  // Haupt Creme
          600: '#E8D4B8',  // Dunkleres Creme
          700: '#DBC29D',  // Sehr dunkles Creme
          800: '#CEB88A',  // Warmes Creme
          900: '#C4A77D',  // Sand/Creme
        },
        ivory: {
          50: '#FAFAF8',
          100: '#F5F3F0',
          200: '#EDE9E3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
