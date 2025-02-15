/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'night-blue': '#010562',
        'aqua-maring': '#41EDCE',
      }
    },
  },
  safelist: [
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
    'delay-500',
    'delay-600',
  ],
  plugins: [require('@tailwindcss/aspect-ratio')
    ,require('@tailwindcss/forms')
    ,require('@tailwindcss/typography')
  ],
};
