module.exports = {
  plugins: [
    require('postcss-nesting'), // Add this line to enable nesting
    require('tailwindcss'),
    require('autoprefixer'),
    // Other plugins as needed
  ]
}
