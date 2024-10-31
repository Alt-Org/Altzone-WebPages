import { StoryObj, Meta } from '@storybook/react';
import { AttributesPie, PieSlice, PieSection } from './AttributesPie';

const main = {
    title: 'Entities/AttributesPie',
    component: AttributesPie,
    args: {
        characterDefault: new PieSlice(50, [new PieSection(20, '#ff0000')]),
        characterUpgrade: new PieSlice(50, []),
        bordercolor: '#000000',
        borderwidth: 2,
        radius: 100,
    },
    argTypes: {
        characterDefault: {
            control: 'PieSlice',
            description: 'Left side of the pie intended for the character-specific statistics',
            defaultValue: new PieSlice(60, [
                new PieSection(20, '#ff0000'),
                new PieSection(20, '#00ff00'),
                new PieSection(20, '#0000ff'),
            ]),
        },
        characterUpgrade: {
            control: 'PieSlice',
            description: 'Right side of the pie intended for the upgradable statistics',
            defaultValue: new PieSlice(60, [
                new PieSection(20, '#ff0000'),
                new PieSection(20, '#00ff00'),
                new PieSection(20, '#0000ff'),
            ]),
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
        characterDefault: new PieSlice(60, [
            new PieSection(20, '#ff0000'),
            new PieSection(20, '#00ff00'),
            new PieSection(20, '#0000ff'),
        ]),
        characterUpgrade: new PieSlice(60, [
            new PieSection(20, '#ff0000'),
            new PieSection(20, '#00ff00'),
            new PieSection(20, '#0000ff'),
        ]),
        radius: 100,
        bordercolor: '#000000',
        borderwidth: 2,
    },
};
