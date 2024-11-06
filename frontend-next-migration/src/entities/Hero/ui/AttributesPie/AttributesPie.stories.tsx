import { StoryObj, Meta } from '@storybook/react';
import { AttributesPie } from './AttributesPie';

const main = {
    title: 'Entities/Hero/AttributesPie',
    component: AttributesPie,
    argTypes: {
        characterDefault: {
            control: 'object',
            description: 'Left side of the pie intended for the character-specific statistics',
            defaultValue: {
                max: 60,
                sections: [
                    {
                        color: '#ff0000',
                        value: 20,
                    },
                    {
                        color: '#00ff00',
                        value: 20,
                    },
                    {
                        color: '#0000ff',
                        value: 20,
                    },
                ],
            },
        },
        characterUpgrade: {
            control: 'object',
            description: 'Right side of the pie intended for the upgradable statistics',
            defaultValue: {
                max: 60,
                sections: [
                    {
                        color: '#ff0000',
                        value: 15,
                    },
                    {
                        color: '#00ff00',
                        value: 12,
                    },
                    {
                        color: '#0000ff',
                        value: 9,
                    },
                ],
            },
        },
        bordercolor: {
            control: 'color',
            description: 'Color of the space between slices',
            defaultValue: '#000000',
        },
        borderwidth: {
            control: 'number',
            description: 'Space in pixels between slices',
            defaultValue: 2,
        },
        radius: {
            control: 'number',
            description: 'Radius of the pie',
            defaultValue: 100,
        },
    },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `AttributesPie` component is designed to display character upgrades and statistics in the form of a pie chart.',
            },
        },
    },
} satisfies Meta<typeof AttributesPie>;

export default main;

export const Default: StoryObj<typeof main> = {
    args: {
        characterDefault: {
            max: 60,
            sections: [
                {
                    color: '#ff0000',
                    value: 20,
                },
                {
                    color: '#00ff00',
                    value: 20,
                },
                {
                    color: '#0000ff',
                    value: 20,
                },
            ],
        },
        characterUpgrade: {
            max: 60,
            sections: [
                {
                    color: '#ff0000',
                    value: 15,
                },
                {
                    color: '#00ff00',
                    value: 12,
                },
                {
                    color: '#0000ff',
                    value: 9,
                },
            ],
        },
        radius: 100,
        bordercolor: '#000000',
        borderwidth: 2,
    },
};

export const Example: StoryObj<typeof main> = {
    args: {
        characterDefault: {
            max: 14,
            sections: [
                {
                    color: '#B4A7D6',
                    value: 4,
                },
                {
                    color: '#F9CB9C',
                    value: 3,
                },
                {
                    color: '#FFE599',
                    value: 2,
                },
                {
                    color: '#FFE599',
                    value: 2,
                },
                {
                    color: '#B6D7A8',
                    value: 3,
                },
            ],
        },
        characterUpgrade: {
            max: 14,
            sections: [
                {
                    color: '#B4A7D6',
                    value: 3,
                },
                {
                    color: '#F9CB9C',
                    value: 3,
                },
                {
                    color: '#FFE599',
                    value: 2,
                },
                {
                    color: '#FFE599',
                    value: 0,
                },
                {
                    color: '#B6D7A8',
                    value: 0,
                },
            ],
        },
        radius: 100,
        bordercolor: '#000000',
        borderwidth: 2,
    },
};
