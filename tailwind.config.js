// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  important: true,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#1989fa',
      },
    },
  },
  variants: {},
  plugins: [],
}
