/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images');

const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_API_DOMAIN , "hips.hearstapps.com" , "www.thesprucepets.com", "images.unsplash.com"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "src/app/styles/variables/_mixins.scss";`,
    },
    // pageExtensions: ['page.tsx', 'page.ts']
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