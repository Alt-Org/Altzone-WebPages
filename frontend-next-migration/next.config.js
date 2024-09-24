// /** @type {import('next').NextConfig} */
// const path = require('path');
// const withPlugins = require('next-compose-plugins');
//
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === true,
//     // enabled: process.env.NODE_ENV === 'development',
//     openAnalyzer: false
// });
//
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     heroes.ts: {
//         remotePatterns: [
//             { hostname: process.env.NEXT_PUBLIC_API_DOMAIN },
//             { hostname: "hips.hearstapps.com" },
//             { hostname: "www.thesprucepets.com" },
//             { hostname: "heroes.ts.unsplash.com" },
//             { hostname: "raw.githubusercontent.com" },
//         ],
//     },
//     sassOptions: {
//         includePaths: [path.join(__dirname, 'styles')],
//         // prependData: `@import "src/app/styles/variables/_mixins.scss";`,
//         prependData: `@import "src/preparedApp/styles/variables/_mixins.scss";`,
//     },
//     output: 'standalone',
//
//     experimental: {
//         webpackBuildWorker: true
//     },
//
//
// }
//
//
//
// module.exports = withPlugins([
//     withBundleAnalyzer,
// ], nextConfig);

// module.exports = nextConfig;
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: process.env.NEXT_PUBLIC_API_DOMAIN },
      { hostname: 'hips.hearstapps.com' },
      { hostname: 'www.thesprucepets.com' },
      { hostname: 'heroes.ts.unsplash.com' },
      { hostname: 'raw.githubusercontent.com' },
      { hostname: 'localhost' }, // Add localhost for development
      { hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_HOST).hostname },
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
