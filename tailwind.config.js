const { join } = require('path');

module.exports = {
  presets: [require('./src/shared/ui/tailwind-presets/tailwind-preset.config')],
  content: [
    join(__dirname, './src/**/*.{html,js}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

