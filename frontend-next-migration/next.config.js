/** @type {import('next').NextConfig} */
const path = require('path');
const withImages = require('next-images');

const nextConfig = {
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