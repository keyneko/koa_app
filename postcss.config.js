module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
    }),
  ]
}
