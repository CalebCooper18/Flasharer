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
        secondary: '#23272A',
        textboxDark: '#35383a',
        vistaBlue: '#738ADB',
        darkenVistaBlue: '#6479c4'
      },
      screens: {
        xss: '450px'
      },
      fontFamily: 
      {
        mono_space: ['Space Mono', 'monospace']
      },
      keyframes : 
      {
        fadeIn: 
        {
          '0%': { transform: 'translateY(-30px)', opacity: '0%'},
          '100%': { transform: 'translateY(0px)', opacity: '100%'}
        }
      },
      animation : {
        'fading-in': 'fadeIn 1s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}