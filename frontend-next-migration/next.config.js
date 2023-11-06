/** @type {import('next').NextConfig} */
const path = require('path');
// const withImages = require('next-images');

const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: process.env.NEXT_PUBLIC_API_DOMAIN },
            { hostname: "hips.hearstapps.com" },
            { hostname: "www.thesprucepets.com" },
            { hostname: "images.unsplash.com" },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "src/app/styles/variables/_mixins.scss";`,
    },
}


module.exports = nextConfig;

// module.exports = withImages(nextConfig);

// module.exports = withImages({
//
//     // images: {
//     //     disableStaticImages: true,
//     // },
//
//     sassOptions: {
//         includePaths: [path.join(__dirname, 'styles')],
//         prependData: `@import "src/app/styles/variables/_mixins.scss";`,
//     },
// });