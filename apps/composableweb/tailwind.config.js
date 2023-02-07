const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('tailwind-config/tailwind.config.js')],
  content: ['./src/**/*.{ts,tsx}', '../../packages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-barlow)', ...fontFamily.sans],
        headline: ['var(--font-archivo)'],
        serif: [...fontFamily.serif],
      },
      colors: {
        base: colors.zinc,
        primary: colors.indigo,
        secondary: colors.orange,
        accent: colors.pink,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: theme('fontFamily.headline'),
            },
            h2: {
              fontFamily: theme('fontFamily.headline'),
            },
            h3: {
              fontFamily: theme('fontFamily.headline'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};
