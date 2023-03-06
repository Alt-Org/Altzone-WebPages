const path = require('path');
const svgr = require("vite-plugin-svgr");

module.exports = {
  "stories": [
    "../../src/**/*.stories.mdx",
    "../../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
     "storybook-addon-themes"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "staticDirs": [ "../../public" ],

  async viteFinal(config, { configType }) {

    config.plugins = [
      ...config.plugins,
      svgr({
        exportAsDefault: true,
        include: '**/*.svg',
      }),
    ];

    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@",
            replacement: path.resolve(__dirname, '..', '..', 'src'),
          },
        ],
      },





    };
  },



}
