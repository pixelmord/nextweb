/**
 * @type {import('prettier').Options}
 */
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  printWidth: 120,
  singleQuote: true,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-packagejson'),
    require('@plasmohq/prettier-plugin-sort-imports'),
  ],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
