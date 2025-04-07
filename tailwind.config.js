/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}', 
    './src/components/**/*.{ts,tsx}',
    // Include any shadcn UI config paths if necessary
  ],
  theme: {
    extend: {
      // Customize your light/off-white theme here if you want
      colors: {
        'off-white': '#f8f9fa',
      },
    },
  },
  plugins: [],
}
