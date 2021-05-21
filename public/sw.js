if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        n[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const n = document.createElement('script')
              ;(n.src = e), document.head.appendChild(n), (n.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!n[e]) throw new Error(`Module ${e} didn’t register its module`)
          return n[e]
        })
      )
    },
    s = (s, n) => {
      Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e))
    },
    n = { require: Promise.resolve(s) }
  self.define = (s, a, c) => {
    n[s] ||
      (n[s] = Promise.resolve().then(() => {
        let n = {}
        const i = { uri: location.origin + s.slice(1) }
        return Promise.all(
          a.map((s) => {
            switch (s) {
              case 'exports':
                return n
              case 'module':
                return i
              default:
                return e(s)
            }
          })
        ).then((e) => {
          const s = c(...e)
          return n.default || (n.default = s), n
        })
      }))
  }
}
define('./sw.js', ['./workbox-ea903bce'], function (e) {
  'use strict'
  importScripts('fallback-uvRVMUN6po7PEY5ZDc5KU.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Michael-Pina-LUIS.png', revision: '90e506b3ec86fdd31ffa7fb52ac6114d' },
        { url: '/_next/static/chunks/0a301732-5d93fbf0d73314b7b649.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/1323-039c16e7bd051b240b11.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/1350-cf053b79459424e2c4c4.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/1557-e1221d44a6f08cfab84f.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/264-8c561031f48bac5e78ae.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/372-d475aeb24d1196b2a069.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/5720-f090feb624e59a2136de.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/5723-495b62cf25a5c184cc67.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/7816-84e28428f8efcfb2049a.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/8180-11104663c2fe1bad8442.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/9249-ced7121877fe2314c2af.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/9521-a7bfe3df19e7e595a448.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/955-5008f286b7a1cf27651f.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/commons-f1f0a3c6a813498d95b9.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/framework-31bb6d6ed129563bb8b6.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/main-e7dc15f7380bb83bdbb1.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/404-c2ce70612dcc1cd0ed8f.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/_app-05d229883090fa9a04fe.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/_error-30e6f84091ab526a527a.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/_offline-93d6b34e9d8a0819814a.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/about-aadf95927ef516af64b2.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/admin/dashboard-53c7a2ad74977687f86f.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/installments-d7df0f8fa73d625e3e33.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/installments/%5Binstallment%5D-0d5806fc2a0c907673fe.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/admin/loans-dffa6f6c835a4b3d7342.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/admin/loans/%5Bloan%5D-3eb30950bbc288fe14d4.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/loans/%5Bloan%5D/loan-installments-9639a51fec1fc739430f.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/admin/settings-94733534a267c0d4ea60.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/admin/settings/change-interest-rate-83e1c409961e43685286.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/settings/change-penalty-data-edcb6aec175772e8bc5a.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/transactions-bd791166e5ef312c45be.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/transactions/%5Brequest%5D-913983d1490f58276a76.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/admin/users-86d9e7aa428c47fd02be.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D-d4a691403f90a76eb174.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/loans-6e2b4d3b747f740644f0.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/transactions-9981b3580b81cd8b5a92.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/admin/users/%5Buser%5D/user-installments-20cf23f4bed85321d1b3.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/contact-72ee071ec8228353a125.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/dashboard-80565fb906d4c4cda2a6.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/deposits-9bc723dd787d980112e1.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/deposits/%5Bdeposit%5D-21928237f3ee3456c51d.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/deposits/deposit-now-7b22e5b74b6bdbc9232c.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/index-fc380f5eaa92272cb049.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/installments-c4852d3aee6df63125b7.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/installments/%5Binstallment%5D-3307fd2086b98d1c14c3.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/loans-cd8a3dbd814a49d20762.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/loans/%5Bloan%5D-e64d2a427bf9b379bf89.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/loans/%5Bloan%5D/loan-installments-4ae9c1f88def0d35cb2e.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/loans/new-loan-55282e9cfd71b037eab0.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/login-f8ae9c02cf315685c99b.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/register-40421d3bad5c81b7e87a.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/pages/settings-604e86fe73c483a588dc.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/settings/notifications-7604952d1cf1f3686fca.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/verify-9cfd3f1f2d1ef90ebbf6.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/verify-mobile-no-5e40b5e0f6752fef6186.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/pages/withdrawals-48484e647ffe0ff0a8a4.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        {
          url: '/_next/static/chunks/pages/withdrawals/%5Bwithdraw%5D-5de79266d7405d4d038f.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        {
          url: '/_next/static/chunks/pages/withdrawals/withdraw-a4db890edcb59def0eb4.js',
          revision: 'uvRVMUN6po7PEY5ZDc5KU'
        },
        { url: '/_next/static/chunks/polyfills-ec4e5916daa21dfc2df4.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/chunks/webpack-b559928999ce431cdf68.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/css/1717aaee3b422676c40d.css', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/css/d684d7994fff7fb43049.css', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/uvRVMUN6po7PEY5ZDc5KU/_buildManifest.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_next/static/uvRVMUN6po7PEY5ZDc5KU/_ssgManifest.js', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
        { url: '/_offline', revision: 'uvRVMUN6po7PEY5ZDc5KU' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
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
