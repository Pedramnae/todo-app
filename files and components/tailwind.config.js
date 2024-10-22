/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily:{
        montseratl: ['montseratl'],
        montseratm: ['montseratm'],
        montseratb: ['montseratb']
      },

      animation:{
        myAnim: 'myAnim 1s ease 0s 1 normal forwards',
        myAnim2: 'myAnim2 1s ease 0s 1 normal forwards'
      },

      keyframes:{
        myAnim :{
          '0%': {
            'transform': 'scale(0)',
            'transform-origin':'0% 50%'
          },
        
          '100%': {
            'transform': 'scale(1)',
            'transform-origin': '0% 50%',
          }
        },
        myAnim2: {
          '0%' : {
            'transform': 'scale(1)',
            'transform-origin': '100% 50%'
          },
          '100%' : {
            'transform': 'scale(0)',
            'transform-origin': '100% 50%'
          }
        }
      }
    },
  },
  plugins: [],
}

