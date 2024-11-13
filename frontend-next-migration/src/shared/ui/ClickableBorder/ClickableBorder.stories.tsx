import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ClickableBorder from './ClickableBorder';

const meta = {
    title: 'shared/ui/ClickableBorder',
    component: ClickableBorder,
    argTypes: {
        borderImageSource: {
            control: 'any',
            description: 'URL or path of the image to be used for the border when hovered.',
            defaultValue: '',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names for custom styling.',
            defaultValue: '',
        },
        children: {
            control: 'text',
            description: 'Content inside the bordered container.',
            defaultValue: 'Content inside the border',
        },
    },
    args: {
        borderImageSource:
            'https://img.freepik.com/free-photo/border-from-blue-golden-paint_23-2147763676.jpg',
        className: '',
        children: 'Content inside the border',
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
                    'The `ClickableBorder` component wraps its children with a dynamic border that changes on hover. You can customize the border image by passing the `borderImageSource` prop. To ensure the ClickableBorder component functions correctly, the content inside it must include the CSS rules "pointer-events: all;" and "cursor:pointer" in its SCSS file.',
            },
        },
    },
} satisfies Meta<typeof ClickableBorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        borderImageSource:
            'https://img.freepik.com/free-photo/border-from-blue-golden-paint_23-2147763676.jpg',
        className: '',
        children: (
            <div style={{ pointerEvents: 'all', cursor: 'pointer' }}>
                {' '}
                <h2>Custom Title</h2>
                <p>This is a custom block inside the clickable border.</p>
            </div>
        ),
    },
};

export const WithCustomContent: Story = {
    args: {
        borderImageSource:
            'https://img.freepik.com/free-photo/border-from-blue-golden-paint_23-2147763676.jpg',
        className: 'custom-class',
        children: (
            <div
                style={{
                    pointerEvents: 'all',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                }}
            >
                <h2>Custom Title</h2>
                <p>This is a custom block inside the clickable border.</p>
                <p>This is a custom block inside the clickable border.</p>
                <p>This is a custom block inside the clickable border.</p>
                <p>This is a custom block inside the clickable border.</p>
            </div>
        ),
    },
};
