// ParsedPostBody.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { ParsedPostBody } from './ParsedPostBody';

const meta = {
    title: 'Shared/ui/Post/PostData',
    component: ParsedPostBody,
    tags: ['autodocs'],
    argTypes: {
        jsonData: {
            control: 'object',
            description: 'JSON array containing content to render as text or images.',
            defaultValue: [
                {
                    type: 'text',
                    content: 'This is a sample text element with a link: https://example.com',
                },
                {
                    type: 'image',
                    url: '/path/to/sample-image.jpg',
                    alt: 'Sample Image',
                    widthPx: 500,
                    heightPx: 300,
                },
            ],
        },
    },
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
                component: `The \`ParsedPostBody\` component parses JSON data to render either text elements (including formatted links) or images.`,
            },
        },
    },
} satisfies Meta<typeof ParsedPostBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        jsonData: [
            { type: 'text', content: 'Check out this link: https://AltZone.fi' },
            {
                type: 'image',
                url: 'https://rjkeoghphotography.ie/shop/wp-content/uploads/2021/10/Test-Image.jpg',
                alt: 'An example image',
                widthPx: 500,
                heightPx: 300,
            },
        ],
    },
};
