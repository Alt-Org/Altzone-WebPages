const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: new URL(process.env.NEXT_PUBLIC_API_DOMAIN).hostname },
      { hostname: 'hips.hearstapps.com' },
      { hostname: 'www.thesprucepets.com' },
      { hostname: 'heroes.ts.unsplash.com' },
      { hostname: 'raw.githubusercontent.com' },
      { hostname: 'raw.githubusercontent.com' },
      { hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL).hostname} ,
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
