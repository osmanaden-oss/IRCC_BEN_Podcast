/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        ben: {
          black: '#000000',
          darkbrown: '#2f261b',
          brown: '#7c5035',
          sand: '#9b8656',
          gold: '#D4AF37',
          brightGold: '#FFD700',
          terracotta: '#c66445',
        }
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #d69a65, #c66445, #7c5035)',
        'gradient-earth': 'linear-gradient(135deg, #9b8656, #7c5035, #2f261b)',
        'glass-dark': 'linear-gradient(145deg, rgba(47, 38, 27, 0.4), rgba(47, 38, 27, 0.1))',
      },
      animation: {
        'shimmer': 'shimmer 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'hero-pan': 'heroPan 15s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heroPan: {
          '0%': { transform: 'scale(1.2) translate(0, 0)' },
          '25%': { transform: 'scale(1.18) translate(-2%, 1%)' },
          '50%': { transform: 'scale(1.15) translate(-3%, -2%)' },
          '75%': { transform: 'scale(1.13) translate(1%, -1%)' },
          '100%': { transform: 'scale(1.2) translate(0, 0)' },
        }
      }
    },
  },
  plugins: [],
}
