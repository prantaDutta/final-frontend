export default {
    openGraph: {
        type: "website",
        locale: "en_IE",
        url: "http://localhost:3000/",
        site_name: "Grayscale",
    },
    additionalLinkTags: [
        {
            rel: 'icon',
            href: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
        },
        {
            rel: 'icon',
            href: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            rel: 'apple-touch-icon',
            href: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: "image/png"
        },
        {
            rel: 'manifest',
            href: '/manifest.json'
        },
    ],
    additionalMetaTags: [
        {
            name: 'application-name',
            content: 'Grayscale'
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'default'
        }, {
            name: 'apple-mobile-web-app-title',
            content: 'Grayscale'
        }, {
            name: 'description',
            content: 'Best P2P Provider in Bangladesh'
        }, {
            name: 'format-detection',
            content: 'telephone=no'
        }, {
            name: 'mobile-web-app-capable',
            content: 'yes'
        }, {
            name: 'theme-color',
            content: '#2caeba'
        },
    ]
    // twitter: {
    //   handle: '@handle',
    //   site: '@site',
    //   cardType: 'summary_large_image',
    // },
};