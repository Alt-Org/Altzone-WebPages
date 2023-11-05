/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        // prependData: `@import "src/app/styles/variables/global.scss";`,
        prependData: `@import "src/app/styles/variables/_mixins.scss";`,
        // prependData: `@import "src/app/styles/index.scss";`,
    },
}


module.exports = nextConfig
