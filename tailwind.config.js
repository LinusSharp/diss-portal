/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}', 
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#f8f9fa',
      },
    },
  },
  plugins: [],
}
