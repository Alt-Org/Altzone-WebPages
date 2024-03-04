import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
      "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      "'!../node_modules/**',"
  ],
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

  webpackFinal: async (config) => {
    // ...
    config.module.rules[0]!.exclude = /node_modules/;
    // ...
    return config;
  },

  docs: {
    autodocs: "tag",
  },
};
export default config;
