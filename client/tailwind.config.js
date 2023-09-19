/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
            primary: {
              DEFAULT: colors.blue[600],
            },
            secondary: {
              DEFAULT: "#00A86B",
            },
           black: {
              DEFAULT: "#000",
              dark: "#222328",
              light: "#666E75"
            },
           error: {
              DEFAULT: "#ED4337",
            },
            info: {
                DEFAULT: colors.blue[600],
            },
           offline: {
                DEFAULT: colors.slate[600],
            }, 
           online: {
                DEFAULT: colors.green[500],
            }, 
              
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
  },
  plugins: [],
};