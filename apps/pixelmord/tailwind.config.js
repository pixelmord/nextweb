const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  presets: [require('tailwind-config/tailwind.config.js')],
  content: ['./src/**/*.{ts,tsx}', '../../packages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', ...fontFamily.sans],
      },
      colors: {
        base: colors.zinc,
        primary: colors.emerald,
        secondary: colors.orange,
        accent: colors.emerald,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};
