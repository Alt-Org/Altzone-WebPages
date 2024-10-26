const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_API_LINK
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
