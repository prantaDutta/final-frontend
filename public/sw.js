if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,r)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=r(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts("fallback-IC97PkUt0Y-05TA0BrlWm.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Michael-Pina-LUIS.png",revision:"90e506b3ec86fdd31ffa7fb52ac6114d"},{url:"/_next/static/IC97PkUt0Y-05TA0BrlWm/_buildManifest.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/IC97PkUt0Y-05TA0BrlWm/_ssgManifest.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/0a301732-5d93fbf0d73314b7b649.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/1323-039c16e7bd051b240b11.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/1745-ff2b05d509b2adefc632.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/3045.4754fc32fe2fa619e8b8.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/3294-3a4d7de405fb70c86f53.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/3443-9ecc6778177605a2979e.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/3568-4e0b673377b32ece5cd2.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/3618-7e54a2f4cd41eb8267f9.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/372-d475aeb24d1196b2a069.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/5274-bae526c3e040be11cc02.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/5756-44c2e92839b5ec8fae96.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/5909-5eed1a0405dcf548a324.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/6753-611a01a1d517c2a40ae9.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/72a30a16.9e9831686d992bdca55d.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/7816-84e28428f8efcfb2049a.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/7856.0507e09864bd957db5fa.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/8038-45ab913507f3028d7a87.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/8180-11104663c2fe1bad8442.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/9249-ced7121877fe2314c2af.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/9521-a7bfe3df19e7e595a448.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/995-6c65f06ccf5407fabd26.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/ad7f724d.5b5cbc3779c25463554b.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/commons-f1f0a3c6a813498d95b9.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/e78312c5-52c1e1a03298542d87da.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/framework-31bb6d6ed129563bb8b6.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/main-e7dc15f7380bb83bdbb1.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/404-6d261de889d38ecd26ae.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/_app-a3180de5ade93494610c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/_error-30e6f84091ab526a527a.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/_offline-e81788fec247a32ea72c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/about-c3a7fdc924b8ef040ee3.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/dashboard-1a88e0ec88d77142b1c7.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/installments-c8fbb7d66ba922cec6f8.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/installments/%5Binstallment%5D-3661962135463e6dc389.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/loans-e3040cf632c0c67c32db.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/loans/%5Bloan%5D-3fdd567dee8d01bed946.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/loans/%5Bloan%5D/loan-installments-c57aa970ba2d98523851.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/settings-42a2c9a419a976c8cda9.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/settings/change-interest-rate-8f7bbca8dfdb32ff75f8.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/settings/change-penalty-data-dc36a511b6283e5b243a.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/transactions-8ef424876e59bca58692.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/transactions/%5Brequest%5D-021ac2488aac7267c628.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/users-b5b4a2fe915edce4523a.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/users/%5Buser%5D-25393a668bedd1ee3096.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/users/%5Buser%5D/loans-5775b0ca6fa58fbd70b1.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/users/%5Buser%5D/transactions-8d287828da314c16d89c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/admin/users/%5Buser%5D/user-installments-a6abff3484ebb0cf6ebc.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/contact-7a4dee49cc4757dad039.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/dashboard-ee5f803e2d8b5884b35b.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/deposits-794386c03e33b8d8e57b.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/deposits/%5Bdeposit%5D-bbb933f796ad5c27c48c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/deposits/deposit-now-c0c2b210d6e982500de2.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/faq-0e00ed02c2ce84f888e8.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/index-2acf16f84eb6a1610517.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/installments-3a5018a675f5884819a4.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/installments/%5Binstallment%5D-0c8d8f6ee1b837bf3cbd.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/loans-e079e4cf5609bf44863e.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/loans/%5Bloan%5D-ab7413ba0900acb3c63c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/loans/%5Bloan%5D/loan-installments-aeb2afba10955ca1df24.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/loans/new-loan-1629002b9324db3a2c9c.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/login-9f1336ed6f3caf7a06ab.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/register-a9f9cc99aa1d0ccd02ae.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/settings-3fcd2b0aacb44c9417fb.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/settings/notifications-159e92f8a5ed5e8e5c9d.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/verify-fa381a496235a6166f13.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/verify-mobile-no-0cabd8beac25943e6b20.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/withdrawals-16dba29831ef1476947f.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/withdrawals/%5Bwithdraw%5D-f25576a35d3bfe797bbb.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/pages/withdrawals/withdraw-now-fbc294f6e11623ec2b4a.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/polyfills-ec4e5916daa21dfc2df4.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/chunks/webpack-9f04a7da7bf2dd0b1e3b.js",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/css/1717aaee3b422676c40d.css",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/css/f894142a6345d09118c2.css",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_next/static/css/feb229cd7b9c54fac28e.css",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/_offline",revision:"IC97PkUt0Y-05TA0BrlWm"},{url:"/android-screen.png",revision:"0d20e7a159d75574eb85d8cc5e679592"},{url:"/app-store-badge.png",revision:"1f1f4065422f352ed97f5064e3fb12c0"},{url:"/background-1.jpg",revision:"78e950d0293bba540f13a518bb7aea19"},{url:"/background-2.jpg",revision:"b31482c01356f5dd668cfb19bb4e0c4a"},{url:"/bkash.png",revision:"cf20d88b39bd9ebde5c5958d7c158477"},{url:"/dashboard_phonexs-1024x774-mobile.png",revision:"356f59c94c74b365b817d86d448c25ec"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/google-play-badge.png",revision:"6405891c27abb33814be594e9fa0153e"},{url:"/hero-image-again.jpg",revision:"079b240e36c7d598ff6ac95dcf7faa66"},{url:"/hero-image.jpg",revision:"76cb6f669a967182faa8c69111492e34"},{url:"/hero.png",revision:"5c2970d05a094bcb36beef08bde3bc5c"},{url:"/icon.png",revision:"7cee335afc936da1c90294ea654de808"},{url:"/icons/icon-192x192.png",revision:"43e219ce5e27abf24a8edb9a5db80959"},{url:"/icons/icon-256x256.png",revision:"8e5f61a86d5ec0f4ea55a9bfb416ce0a"},{url:"/icons/icon-384x384.png",revision:"a25b72ce691dc22335a63c412aa33b62"},{url:"/icons/icon-512x512.png",revision:"2d7403d60e0dd053b3326e6ad8782518"},{url:"/main-logo.png",revision:"3d6a4023ced3a0fff3db3d2accfa3cb8"},{url:"/manifest.json",revision:"50a10f016155aff2e3677f6a2d286ab5"},{url:"/modern-background.jpg",revision:"88836e0268f94bc9b70713952c748ab6"},{url:"/new-bg.png",revision:"59bcfb7c38786f31d0b4d34a7bb25d50"},{url:"/new-logo.png",revision:"62cf5503ff0678ab84db4b2ee7467225"},{url:"/nogod.png",revision:"b3a70d1474ae26442f4283c516e2f0ab"},{url:"/rocket.png",revision:"63d1c38579474ccaf71e49add4932e2e"},{url:"/sure_cash_logo.png",revision:"60f6705b9a64e035fc2938514d9c9b7e"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/api\/(?!auth\/callback\/).*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^\/(?!api\/).*$/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
