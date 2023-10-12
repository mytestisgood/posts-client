/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./src/shared/ui/tailwind-presets/tailwind-preset.config')],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

