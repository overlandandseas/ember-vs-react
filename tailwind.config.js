/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./templates/**/*.{html,js}", "content/**/*.md"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
