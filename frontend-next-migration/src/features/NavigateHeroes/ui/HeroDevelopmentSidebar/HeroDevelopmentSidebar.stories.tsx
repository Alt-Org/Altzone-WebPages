import { Meta, StoryObj } from '@storybook/react';
import HeroDevelopmentSidebar from './HeroDevelopmentSidebar';

const meta = {
    title: 'features/NavigateHeroes/HeroDevelopmentSidebar',
    component: HeroDevelopmentSidebar,
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#333333' },
                { name: 'gray', value: '#dddddd' },
            ],
        },
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `Card` component is a versatile container with customizable subcomponents for Title, Body, Date, and ReadMoreLink.',
            },
        },
    },
} satisfies Meta<typeof HeroDevelopmentSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
