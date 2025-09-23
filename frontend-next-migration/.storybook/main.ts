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
        "@storybook/addon-onboarding",
        "@storybook/addon-docs"
    ],

    framework: {
        name: '@storybook/nextjs',
        options: {
            builder: {
                useSWC: true, // Enables SWC support
            },
        },
    }
};
export default config;
