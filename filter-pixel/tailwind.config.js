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
    keyframes : {
      sunrise : {
        '0%' : { transform : 'scale(0)' },
        '100%' : {transform : 'scale(1)'}
      },
      colorchange : {
        '0%' : { background : 'white' },
        '100%' : {background : 'black'}
      }
    },
    animation : {
      "riseup" : "sunrise 0.2s linear",
      "dull" : "colorchange 0.2s linear"
    }
  },
  plugins: [],
}

