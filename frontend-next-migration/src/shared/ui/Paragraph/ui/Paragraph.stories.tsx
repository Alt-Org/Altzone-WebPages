import { Meta, StoryObj } from '@storybook/react';
import Paragraph from './Paragraph';

const meta = {
    title: 'shared/ui/Paragraph',
    component: Paragraph,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        title: {
            control: 'text',
            description: 'The title text.',
            defaultValue: '',
        },
        text: {
            control: 'text',
            description: 'The main text content.',
            defaultValue: '',
        },
        footer: {
            control: 'text',
            description: 'The footer text.',
            defaultValue: '',
        },
    },
    args: {
        className: '',
        title: '',
        text: '',
        footer: '',
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

        docs: {
            description: {
                component:
                    'The `Paragraph` component renders a title, text, and footer if provided.',
            },
        },
    },
} satisfies Meta<typeof Paragraph>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        title: 'Hello World',
        text: 'This is a paragraph.',
        footer: 'Footer text here.',
    },
};
