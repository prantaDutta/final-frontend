const withPWA = require('next-pwa')

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    dest: 'public',
    // to disable pwa just set disable to true,
    disable: false,
  }
});
