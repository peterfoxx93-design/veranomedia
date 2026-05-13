const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'vm-primary': '#007AFF',
        'vm-secondary': '#1C1C1E',
        'vm-accent': '#34C759',
        'vm-neutral': {
          100: '#FFFFFF',
          200: '#F5F5F7',
          300: '#E8E8ED',
          400: '#D1D1D6',
          500: '#8E8E93',
          600: '#636366',
          700: '#1C1C1E',
        },
        'vm-success': '#34C759',
        'vm-warning': '#FF9F0A',
        'vm-error': '#FF453A',
        'vm-info': '#5AC8FA',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Playfair Display', ...fontFamily.serif],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'heading-xl': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        'vm-sm': '6px',
        'vm-md': '12px',
        'vm-lg': '20px',
        'vm-xl': '32px',
      },
      boxShadow: {
        'vm-sm': '0px 1px 2px rgba(28, 28, 30, 0.05)',
        'vm-md': '0px 4px 12px rgba(28, 28, 30, 0.08)',
        'vm-lg': '0px 8px 30px rgba(28, 28, 30, 0.12)',
        'vm-xl': '0px 20px 60px rgba(28, 28, 30, 0.15)',
      },
    },
  },
  plugins: [],
}
