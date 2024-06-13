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

  docs: {
    autodocs: "tag",
  },
};
export default config;
