import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          blue: '#0066FF',
          white: '#FFFFFF',
          silver: '#C0C0C0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'Arial', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 102, 255, 0.2), 0 18px 48px rgba(0, 102, 255, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 102, 255, 0.4)' },
          '70%': { boxShadow: '0 0 0 16px rgba(0, 102, 255, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-blue': 'pulseBlue 2.4s infinite',
      },
      screens: {
        xs: '480px',
      },
    },
  },
};

export default config;
