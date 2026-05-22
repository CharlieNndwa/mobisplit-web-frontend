/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0E14',
          card: '#1B2129',
          teal: '#00F2C3',
        }
      },
    },
  },
  plugins: [],
}