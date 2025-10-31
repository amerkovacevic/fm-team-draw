/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0D17',
        pitch: '#111827',
        emerald: '#34D399',
        sand: '#FDE68A',
        slate: {
          850: '#1F2937',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 30px rgba(52, 211, 153, 0.35)',
      },
    },
  },
  plugins: [],
};
