/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
       "forest","dark"
    ]
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}