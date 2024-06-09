/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3388EB',
        'secondary': '#C1C1C1',
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}

