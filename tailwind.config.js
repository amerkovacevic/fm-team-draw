import { tailwindColors, tailwindFonts } from '../shared-design-tokens.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        // Keep custom color aliases for easy migration (mapped to shared palette)
        midnight: tailwindColors.primary[800],
        pitch: tailwindColors.secondary[700],
        azure: tailwindColors.tertiary[500],
        sand: tailwindColors.warning[300],
      },
      fontFamily: tailwindFonts,
      boxShadow: {
        glow: '0 10px 30px rgba(65, 90, 119, 0.35)', // Using tertiary-500 RGB
      },
    },
  },
  plugins: [],
};
