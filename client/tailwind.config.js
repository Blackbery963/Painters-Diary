/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    extend: {
      fontFamily: {
        // painters Diary
        eagle: ['"Eagle Lake"', 'cursive'],
        // the diary of every  artist
        cookie: ['"Cookie"', 'cursive'],
        // other button like home 
        playfair:['"Playfair Display"', 'serif'],
        
    },
    
    animation: {
      fadeIn: "fadeIn 2s ease-in-out",
      slideInUp: "slideInUp 0.8s ease-out",
        expand: 'expand 1.5s ease-out forwards',
        fadeOut: 'fadeOut 0.8s ease-out forwards',
        pulseblur: 'pulseBlur 3s infinite',
        float: 'float 15s linear infinite alternate',
  
     
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideInUp: {
        "0%": { transform: "translateY(20px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
       expand: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        pulseBlur: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' },
        },
         float: {
      '0%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(-40px, -40px)' },
    },
     
    },

    },
  },
  plugins: [],
}     
