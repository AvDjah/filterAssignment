/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'orange' : "#C95252",
        'cya' : "#27EECB"
      },
      width : {
        'tab' : '500px',
        'img' : '270px'
      },
      height : {
        'img' : '210px'
      }
    },
  },
  plugins: [],
}

