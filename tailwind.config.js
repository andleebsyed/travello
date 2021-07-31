module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
      blue: {
        light: "#1DA1F2", 
        DEFAULT: "#15202B"
      },
      white: {
        DEFAULT: "#FFFFFF"
      }
    },
      screens: {
        'xsm': '500px',
        'flexbreak': "1080px"
      },
    },
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
