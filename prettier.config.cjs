/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  singleQuote: false,
  semi: true,
  bracketSameLine: true,
  useTabs: true,
  tabWidth: 4,
  jsxSingleQuote: false,
};
