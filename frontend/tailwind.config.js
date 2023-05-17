/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#764abc',
        semiLightPurple: '#7c6ea7',
        darkBackground: '#23272A',
        textboxDark: '#35383a',
      },
      screens: {
        xss: '450px'
      },
      fontFamily: 
      {
        mono_space: ['Space Mono', 'monospace']
      },
      fontSize: {
        tiny: '0.6rem'
      },
      keyframes : 
      {
        fadeIn: 
        {
          '0%': { transform: 'translateY(30px)', opacity: '0%'},
          '100%': { transform: 'translateY(0px)', opacity: '100%'}
        },
        altBounce: 
        {
          '0%': {transform: 'translateY(0%)'},
          '50%': {transform: 'translateY(-25%)'},
          '95%': {transform: 'translateY(2%)'}
        }
      },
      animation : {
        'fading-in': 'fadeIn 1s ease-in-out forwards',
        'alt-bounce': 'altBounce 1s infinite'
      }
    },
  },
  plugins: [],
}