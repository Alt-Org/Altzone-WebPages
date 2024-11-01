import { StoryObj, Meta } from '@storybook/react';
import { AttributesPie } from './AttributesPie';

const main = {
    title: 'Entities/Hero/AttributesPie',
    component: AttributesPie,
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
            sections: [],
        },
        bordercolor: '#000000',
        borderwidth: 2,
        radius: 100,
    },
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
                sections: [],
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
            sections: [],
        },
        radius: 100,
        bordercolor: '#000000',
        borderwidth: 2,
    },
};
