/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bRed: '#FF0000',
      },
      animation: {
        zoom: 'zoom 1s ease-in-out infinite', // Custom animation
        'slide-in-right': 'slide-in-right 2s ease-out forwards',
        'slide-in-left': 'slide-in-left 2s ease-out backwards',
      },
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' }, // Normal size at the start and end
          '50%': { transform: 'scale(1.2)' },    // Slight zoom in at the midpoint
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      
    },
  },
  plugins: [],
}