import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        secondary: {
          100: '#666666',
          500: '#1f1f1f',
          900: '#000000'
        },
        accent: {
          white: '#ffffff'
        }
      }
    }
  },
  plugins: []
};

export default config;
