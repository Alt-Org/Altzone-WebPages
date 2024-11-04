import { Meta, StoryObj } from '@storybook/react';
import { Post } from './Post';

const meta = {
    title: 'shared/ui/Post/Post',
    component: Post,
    argTypes: {
        className: {
            control: 'text',
            description: 'Additional class names to apply.',
            defaultValue: '',
        },
        postData: {
            control: 'object',
            description: 'The data for the post.',
        },
    },
    args: {
        className: '',
        postData: {
            id: '1',
            title: 'Sample Post',
            date: new Date(),
            bodyElements: [{ type: 'text', content: 'This is a sample post.' }],
        },
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
                component: 'Component to display a Post.',
            },
        },
    },
} satisfies Meta<typeof Post>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        className: 'custom-class',
        postData: {
            id: '1',
            title: 'Sample Post',
            date: new Date(),
            bodyElements: [{ type: 'text', content: 'This is a sample post.' }],
        },
    },
};
