import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
      // "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  // stories: [
  //   '../src/**/*.stories.@(js|jsx|ts|tsx)'
  // ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true, // Enables SWC support
      },
    },
  },

  // features: {
  //   storyStoreV7: false,
  // },

  //todo if we enable this to work with svgs we will break other image types for some reason..., figure our why
  // webpackFinal: async (config) => {
  //
  //   const fileLoaderRule = config.module.rules.find((rule) =>
  //       // @ts-ignore
  //       rule.test?.test?.('.svg')
  //   );
  //   // @ts-ignore
  //   fileLoaderRule.exclude = /\.svg$/;
  //
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });
  //
  //   return config;
  // },


  docs: {
    autodocs: "tag",
  },
};
export default config;
