import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        bracket: {
          red: '#8F2432',
          redHover: '#7B1E2A',
          soft: '#F8EAEC',
          gold: '#B7924A',
          bone: '#F5F3EE',
          warm: '#FBFAF7',
          border: '#E4E0D8',
          ink: '#1D1D1F',
          secondary: '#5F5F64',
        },
      },
      boxShadow: {
        soft: '0 4px 12px rgba(29,29,31,.07)',
        float: '0 12px 32px rgba(29,29,31,.10)',
      },
    },
  },
  plugins: [],
} satisfies Config
