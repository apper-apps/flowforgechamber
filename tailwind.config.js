/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8246F1',
          600: '#7c3aed',
          700: '#6b21a8',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#3b1a7a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neon: {
          purple: '#8246F1',
          blue: '#00E3E3',
          orange: '#FF784A',
        },
        dark: {
          bg: '#0B0B14',
          surface: '#1a1a2e',
          border: '#2d2d44',
        },
        border: '#e2e8f0'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #8246F1, 0 0 10px #8246F1, 0 0 15px #8246F1' },
          '100%': { boxShadow: '0 0 10px #8246F1, 0 0 20px #8246F1, 0 0 30px #8246F1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}