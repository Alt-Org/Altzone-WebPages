import { Meta, StoryObj } from '@storybook/react';
import Fancybox from './Fancybox';

const meta = {
    title: 'shared/ui/Fancybox',
    component: Fancybox,
    argTypes: {
        children: {
            control: 'text',
            description: 'The content of the link.',
            defaultValue: '',
        },
        delegate: {
            control: 'text',
            description: 'CSS selector for the elements that will trigger the fancybox.',
            defaultValue: '',
        },
        options: {
            control: 'object',
            description: 'Configuration options for the fancybox.',
            defaultValue: {},
        },
    },
    args: {
        children: '',
        delegate: '',
        options: {},
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
                    '`Fancybox` component using @fancyapps/ui library. Component is used to create a lightbox gallery. Component gets children as an array of elements that will be displayed in the gallery.',
            },
        },
    },
} satisfies Meta<typeof Fancybox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <a
                key={1}
                data-fancybox="gallery"
                href="https://altzone.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhannu-hodari.755680ec.png&w=1920&q=75"
            >
                <img
                    src="thumbnail1.jpg"
                    alt="Thumbnail 1"
                />
            </a>,
            <a
                key={2}
                data-fancybox="gallery"
                href="https://altzone.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgraffitti-gaya.0b1229e0.png&w=1080&q=100"
            >
                <img
                    src="thumbnail2.jpg"
                    alt="Thumbnail 2"
                />
            </a>,
        ],
        delegate: '',
        options: {},
    },
};
