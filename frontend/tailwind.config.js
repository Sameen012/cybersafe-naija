/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0f9d58',
          dark: '#0b5c2e',
          light: '#e6f4ea'
        }
      }
    }
  },
  plugins: []
};
