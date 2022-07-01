/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: "'Plus Jakarta Sans', sans-serif"
      },
      fontSize: {
        'heading-xl': ['1.5rem', '1.875rem'], // 24px, 30px
        'heading-lg': ['1.125rem', '1.4375rem'], // 18px, 23px
        'heading-md': ['0.9375rem', '1.1875rem'], // 15px, 19px
        'heading-sm': [
          '0.75rem', // 12px
          {
            letterSpacing: '2.4px',
            lineHeight: '0.9375rem' // 15px
          }
        ],
        'body-lg': ['0.8125rem', '1.4375rem'], // 13px, 23px
        'body-md': ['0.75rem', '0.9375rem'] // 12px, 15px
      },
      colors: {
        red: {
          300: '#FF9898',
          500: '#EA5555'
        },
        purple: {
          300: '#A8A4FF',
          500: '#635FC7'
        },
        gray: {
          100: '#F4F7FD',
          200: '#E4EBFA',
          300: '#828FA3',
          400: '#3E3F4E',
          500: '#2B2C37',
          600: '#20212C',
          700: '#000112'
        }
      }
    }
  },
  plugins: []
}
