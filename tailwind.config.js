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
          50: '#FFFAF0',   // Sehr helles Creme
          100: '#FFF5E6',  // Helles Creme
          200: '#FFEECC',  // Creme
          300: '#FFE4B3',  // Mittel Creme
          400: '#FFD89C',  // Kräftigeres Creme
          500: '#D4AF37',  // Haupt Gold
          600: '#B8941F',  // Dunkleres Gold
          700: '#9A7A15',  // Sehr dunkles Gold
          800: '#7C5F0F',  // Fast braun
          900: '#5E4509',  // Sehr dunkel
        },
        cream: {
          50: '#FFFEF9',   // Sehr helles Creme
          100: '#FFFDF5',  // Helles Creme
          200: '#FFF9E6',  // Creme
          300: '#FFF5D6',  // Mittel Creme
          400: '#FFF1C6',  // Kräftigeres Creme
          500: '#F5E6D3',  // Haupt Creme
          600: '#E8D4B8',  // Dunkleres Creme
          700: '#DBC29D',  // Sehr dunkles Creme
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
