module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        handwritten: 'Neue Haas Grotesk Display Pro',
      },
      colors: {
        gray: {
          850: '#18202F',
          950: '#0b0f1a',
        },
      },
      screens: {
        xxs: '240px',
        xs: '576px',
        '1.5xl': '1440px',
      },
    },
  },
  plugins: [require('tailwindcss-radix')(), require('@tailwindcss/typography')],
}
