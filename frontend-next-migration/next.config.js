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
        includePaths: [path.join(__dirname, 'src/app/_styles')],
        additionalData: `@use "src/app/_styles/variables/mixins" as *;`,
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

// Injected content via Sentry wizard below
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: process.env.NEXT_PUBLIC_SENTRY_ORG,
    project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,

    // Only print logs for uploading source maps in CI
    silent: true,
    // silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: false,

    webpack: {
        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,

        // Tree-shaking options for reducing bundle size
        treeshake: {
            removeDebugLogging: true,
        },
    },
});
