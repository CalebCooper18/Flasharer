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
    },
  },
  plugins: [],
}