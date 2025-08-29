
const path = require('path');
/**
 * next.config.js
 *
 * - Adds a rewrite rule to proxy /api/* requests to the backend API (devapi.altzone.fi)
 * - Configures allowed image domains, including dynamic env-based hosts
 * - Sets up Sass options for global styles
 * - Output set to 'standalone' for deployment
 */
const nextConfig = {
    // Proxy API requests to backend
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://devapi.altzone.fi/:path*',
            },
        ];
    },
    // Allow images from these domains
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_API_LINK &&
                (process.env.NEXT_PUBLIC_API_LINK.startsWith('http://') || process.env.NEXT_PUBLIC_API_LINK.startsWith('https://'))
                    ? new URL(process.env.NEXT_PUBLIC_API_LINK).hostname
                    : ""
            },
            { hostname: 'hips.hearstapps.com' },
            { hostname: 'www.thesprucepets.com' },
            { hostname: 'heroes.ts.unsplash.com' },
            { hostname: 'raw.githubusercontent.com' },
            { hostname: 'raw.githubusercontent.com' },
            { hostname: "localhost" },
            {
                hostname: process.env.NEXT_PUBLIC_STRAPI_HOST
                    ? new URL(process.env.NEXT_PUBLIC_STRAPI_HOST).hostname
                    : ""
            },
        ],
    },
    // Sass global config
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        // prependData: `@import "src/app/styles/variables/_mixins.scss";`,
        prependData: `@import "src/app/_styles/variables/_mixins.scss";`,
        // prependData: `@import "src/preparedApp/styles/variables/_mixins.scss";`,
    },
    output: 'standalone',
    // experimental: {
    //   webpackBuildWorker: true
    // },
};

module.exports = nextConfig;