module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
        blue: {
        xlight: '#162d40',
        light: "#1DA1F2", 
        DEFAULT: "#15202B"
      },
      white: {
        DEFAULT: "#FFFFFF"
        },
        red: {
        DEFAULT: "#DC2626"
      }
    },
      screens: {
        'xsm': '550px',
        'flexbreak': "1080px",
        'gridbreak': '950px'
      },
      gridTemplateColumns: {
          //for homepage 
        'home': '1fr 3fr 1fr',
        'home-middle': 'minmax(0px,1fr) 3fr',
        'home-mobile': '1fr'
      },
      gridTemplateRows: {
           //for homepage 
        'home': '1fr 3fr',
        'home-mobile': '1fr 2fr 1fr'
        }
    },
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
