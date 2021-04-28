const withPWA = require('next-pwa')

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // to disable pwa just set disable to true,
    disable: process.env.NODE_ENV === "development",
  }
});
