import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    features: {
        storyStoreV7: false,
    },
    webpackFinal: async (config) => {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|jsx|ts|tsx)$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules.push({
            test: /\.svg$/,
            type: 'asset',
            resourceQuery: /url/,
        });

        return config;
    },
    docs: {
        autodocs: 'tag',
    },
};

export default config;
