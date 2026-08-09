/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A8E6CF',
        secondary: '#8BC6A8',
        accent: '#2D6A4F',
        soft: '#6A8F7A',
        dark: '#1A3A2A',
        background: '#F5F9F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(168, 230, 207, 0.10)',
      },
    },
  },
  plugins: [],
}