import { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
    title: 'shared/ui/Container',
    component: Container,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        fluid: {
            control: 'boolean',
            description: 'Whether the container should be fluid.',
            defaultValue: false,
        },
        children: {
            control: 'text',
            description: 'The content of the container.',
            defaultValue: '',
        },
    },
    args: {
        className: '',
        fluid: false,
        children: '',
    },
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
                    'The `Container` component is a flexible wrapper component that conditionally applies classes based on its props.',
            },
        },
    },
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NotFluid: Story = {
    args: {
        className: '',
        fluid: false,
        children: 'This is the content of the container.',
    },
};

export const Fluid: Story = {
    args: {
        className: '',
        fluid: true,
        children: 'This is the content of the container.',
    },
};
