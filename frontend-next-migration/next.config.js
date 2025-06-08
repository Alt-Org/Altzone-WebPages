// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: getSafeHostname(process.env.NEXT_PUBLIC_API_LINK) },
            { hostname: 'hips.hearstapps.com' },
            { hostname: 'www.thesprucepets.com' },
            { hostname: 'heroes.ts.unsplash.com' },
            { hostname: 'raw.githubusercontent.com' },
            { hostname: 'raw.githubusercontent.com' },
            { hostname: 'localhost' },
            { hostname: getSafeHostname(process.env.NEXT_PUBLIC_STRAPI_HOST) },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        // prependData: `@import "src/app/styles/variables/_mixins.scss";`,
        prependData: `@import "src/app/_styles/variables/_mixins.scss";`,
        // prependData: `@import "src/preparedApp/styles/variables/_mixins.scss";`,
    },
    output: 'standalone',
    // experimental: {
    //     webpackBuildWorker: true
    // },
};

module.exports = nextConfig;

function getSafeHostname(envVar, fallback = 'localhost') {
    if (!envVar) {
        console.warn(`[next.config.js] WARNING: missing env var, falling back to ${fallback}`);
        return fallback;
    }

    try {
        return new URL(envVar).hostname;
    } catch {
        console.warn(
            `[next.config.js] WARNING: invalid URL in env var, falling back to ${fallback}`,
        );
        return fallback;
    }
}
