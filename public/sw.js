if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        a[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const a = document.createElement('script')
              ;(a.src = e), document.head.appendChild(a), (a.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
          return a[e]
        })
      )
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e))
    },
    a = { require: Promise.resolve(s) }
  self.define = (s, n, t) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {}
        const i = { uri: location.origin + s.slice(1) }
        return Promise.all(
          n.map((s) => {
            switch (s) {
              case 'exports':
                return a
              case 'module':
                return i
              default:
                return e(s)
            }
          })
        ).then((e) => {
          const s = t(...e)
          return a.default || (a.default = s), a
        })
      }))
  }
}
define('./sw.js', ['./workbox-ea903bce'], function (e) {
  'use strict'
  importScripts('fallback-GgHD7E6TmtS8xg1h7q75a.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Michael-Pina-LUIS.png', revision: '90e506b3ec86fdd31ffa7fb52ac6114d' },
        { url: '/_next/static/GgHD7E6TmtS8xg1h7q75a/_buildManifest.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/GgHD7E6TmtS8xg1h7q75a/_ssgManifest.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/0a301732-5d93fbf0d73314b7b649.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/1323-039c16e7bd051b240b11.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/1350-cf053b79459424e2c4c4.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/1557-e1221d44a6f08cfab84f.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/264-8c561031f48bac5e78ae.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/372-d475aeb24d1196b2a069.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/5720-ba0bf101b2258fb05ce7.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/5723-495b62cf25a5c184cc67.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/7816-84e28428f8efcfb2049a.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/8180-11104663c2fe1bad8442.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/9249-ced7121877fe2314c2af.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/9521-a7bfe3df19e7e595a448.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/955-3af47e0f4eff7ee83275.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/commons-f1f0a3c6a813498d95b9.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/framework-31bb6d6ed129563bb8b6.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/main-e7dc15f7380bb83bdbb1.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/404-808918a9378d950b75f1.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/_app-52681f94e846e61daeef.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/_error-30e6f84091ab526a527a.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/_offline-af5c8f29d2ac87b2a76f.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/about-c217764b5791e7b29197.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/admin/dashboard-f21f71987bf41891140a.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/installments-07342c616bd39e533cd5.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/installments/%5Binstallment%5D-aa87391826d494e0a002.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/admin/loans-0f691db87b2fe6280679.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/admin/loans/%5Bloan%5D-a47ca3ea90a06ee1b8c1.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/loans/%5Bloan%5D/loan-installments-5d17ba38f2e7d26c637d.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/admin/settings-097d35659ca4f8f99d67.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/admin/settings/change-interest-rate-08e13333ac33bead8e27.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/change-penalty-data-9edd8882d959efc71857.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/transactions-937b39b721d55963787d.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/transactions/%5Brequest%5D-57c6f9322af15a701758.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/admin/users-764b84801a911b116667.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D-58f06fc035a7e7ceb8b8.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/loans-e2b918d3f81d0662e200.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/transactions-ac1884f78cc07cbf02bd.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/user-installments-725b5f0fb3c133864d7b.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/contact-6230ec43fa15966e45f3.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/dashboard-3e04ed8402f2cfa02bf3.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/deposits-ce7fcc683d0b11ca9aa5.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/deposits/%5Bdeposit%5D-309d5e55cdec4b129b8f.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/deposits/deposit-now-50c7a3ec2ea2f7c0bf54.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/faq-f2689644ac1318ba7d2f.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/index-5fc9ede5c62db78a01b5.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/installments-725ccb237089c0091679.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/installments/%5Binstallment%5D-dcae2cdd184807eb97b6.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/loans-672470d9d7fa61e308cb.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/loans/%5Bloan%5D-204887070f663db2d6f1.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/loans/%5Bloan%5D/loan-installments-56ef85841130feb27672.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/loans/new-loan-5ee59346844cae1ea7b6.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/login-76b156960cbc5830c915.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/register-0537c71e49b422724d62.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/pages/settings-0a362f81a8583b8c1f99.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/settings/notifications-ae1830cf19ab95f7b44c.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/verify-18ac5b822020255c26c7.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/verify-mobile-no-a8df851ba93d41b186f8.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/pages/withdrawals-f1b2384d5f62628d58f2.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        {
          url: '/_next/static/chunks/pages/withdrawals/%5Bwithdraw%5D-b79b2291ef5ce2fdfbd4.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        {
          url: '/_next/static/chunks/pages/withdrawals/withdraw-a4db890edcb59def0eb4.js',
          revision: 'GgHD7E6TmtS8xg1h7q75a'
        },
        { url: '/_next/static/chunks/polyfills-ec4e5916daa21dfc2df4.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/chunks/webpack-1f99f5c6e70c65234172.js', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/css/1717aaee3b422676c40d.css', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_next/static/css/540311a84770e839cbed.css', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/_offline', revision: 'GgHD7E6TmtS8xg1h7q75a' },
        { url: '/android-screen.png', revision: '0d20e7a159d75574eb85d8cc5e679592' },
        { url: '/app-store-badge.png', revision: '1f1f4065422f352ed97f5064e3fb12c0' },
        { url: '/background-1.jpg', revision: '78e950d0293bba540f13a518bb7aea19' },
        { url: '/background-2.jpg', revision: 'b31482c01356f5dd668cfb19bb4e0c4a' },
        { url: '/bkash.png', revision: 'cf20d88b39bd9ebde5c5958d7c158477' },
        { url: '/dashboard_phonexs-1024x774-mobile.png', revision: '356f59c94c74b365b817d86d448c25ec' },
        { url: '/favicon.ico', revision: '21b739d43fcb9bbb83d8541fe4fe88fa' },
        { url: '/google-play-badge.png', revision: '6405891c27abb33814be594e9fa0153e' },
        { url: '/hero-image-again.jpg', revision: '079b240e36c7d598ff6ac95dcf7faa66' },
        { url: '/hero-image.jpg', revision: '76cb6f669a967182faa8c69111492e34' },
        { url: '/hero.png', revision: '5c2970d05a094bcb36beef08bde3bc5c' },
        { url: '/icon.png', revision: '7cee335afc936da1c90294ea654de808' },
        { url: '/icons/icon-192x192.png', revision: '43e219ce5e27abf24a8edb9a5db80959' },
        { url: '/icons/icon-256x256.png', revision: '8e5f61a86d5ec0f4ea55a9bfb416ce0a' },
        { url: '/icons/icon-384x384.png', revision: 'a25b72ce691dc22335a63c412aa33b62' },
        { url: '/icons/icon-512x512.png', revision: '2d7403d60e0dd053b3326e6ad8782518' },
        { url: '/main-logo.png', revision: '3d6a4023ced3a0fff3db3d2accfa3cb8' },
        { url: '/manifest.json', revision: '50a10f016155aff2e3677f6a2d286ab5' },
        { url: '/modern-background.jpg', revision: '88836e0268f94bc9b70713952c748ab6' },
        { url: '/new-bg.png', revision: '59bcfb7c38786f31d0b4d34a7bb25d50' },
        { url: '/new-logo.png', revision: '62cf5503ff0678ab84db4b2ee7467225' },
        { url: '/nogod.png', revision: 'b3a70d1474ae26442f4283c516e2f0ab' },
        { url: '/rocket.png', revision: '63d1c38579474ccaf71e49add4932e2e' },
        { url: '/sure_cash_logo.png', revision: '60f6705b9a64e035fc2938514d9c9b7e' },
        { url: '/vercel.svg', revision: '26bf2d0adaf1028a4d4c6ee77005e819' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-media-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^\/api\/(?!auth\/callback\/).*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^\/(?!api\/).*$/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    )
})
