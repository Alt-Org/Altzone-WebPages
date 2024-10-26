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
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Fancybox component using @fancyapps/ui library. Component is used to create a lightbox gallery.',
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
                href="image1.jpg"
            >
                <img
                    src="thumbnail1.jpg"
                    alt="Thumbnail 1"
                />
            </a>,
            <a
                key={2}
                data-fancybox="gallery"
                href="image2.jpg"
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
