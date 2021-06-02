module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    enabled: true,
    layers: ['components', 'utilities'],
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}']
  },
  // purge: false,
  theme: {
    extend: {
      backgroundImage: () => ({
        'header-img': "url('/background-1.jpg')",
        'intro-img': "url('/modern-background.jpg')",
        'new-bg': "url('/new-bg.png')",
        'hero-img': "url('/hero.png')"
      }),
      height: {
        '1vh': '10vh',
        '2vh': '20vh',
        '3vh': '30vh',
        '4vh': '40vh',
        '5vh': '50vh',
        '6vh': '60vh',
        '7vh': '70vh',
        '8vh': '80vh',
        '9vh': '90vh',
        '10vh': '100vh'
      },
      width: {
        '1vw': '10vw',
        '2vw': '20vw',
        '3vw': '30vw',
        '4vw': '40vw',
        '5vw': '50vw',
        '6vw': '60vw',
        '7vw': '70vw',
        '8vw': '80vw',
        '9vw': '90vw',
        '10vw': '100vw'
      },
      colors: {
        primary: '#2caeba',
        primaryAccent: '#2c96ba'
      },
      spacing: {
        0.5: '0.15rem',
        75: '19rem'
      },
      fontFamily: {
        body: ['Nunito']
      },
      animation: {
        expand: 'expand 1s'
      },
      keyframes: {
        expand: {
          '0%': {
            transform: 'scale(1.2)'
          },
          '100%': {
            transform: 'scale(0.8)'
          }
        }
      },
      transitionProperty: {
        height: 'height'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
      height: ['responsive', 'hover', 'focus']
    }
  }
}
