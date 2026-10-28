/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0f9d58',
          dark: '#0b5c2e',
          light: '#e6f4ea',
          emerald: '#10b981',
          teal: '#14b8a6',
          night: '#0a101d',
          charcoal: '#0d1522'
        }
      },
      boxShadow: {
        'cyber-sm': '0 2px 10px -2px rgba(16, 185, 129, 0.15)',
        'cyber-md': '0 8px 30px -4px rgba(16, 185, 129, 0.2)',
        'cyber-lg': '0 12px 40px -6px rgba(16, 185, 129, 0.25)',
        'danger-glow': '0 0 25px -5px rgba(239, 68, 68, 0.35)'
      }
    }
  },
  plugins: []
};
