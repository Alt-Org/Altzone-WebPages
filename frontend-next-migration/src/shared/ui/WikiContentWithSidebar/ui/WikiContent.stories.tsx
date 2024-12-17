import { Meta, StoryObj } from '@storybook/react';
import WikiContentWithSideBar from './WikiContentWithSideBar';

const meta = {
    title: 'shared/ui/WikiContentWithSideBar',
    component: WikiContentWithSideBar,
    argTypes: {
        sections: {
            control: 'object',
            description: 'Sections to display in the sidebar.',
            defaultValue: [],
        },
    },
    args: {
        sections: [
            {
                id: 'section1',
                label: 'Section 1',
                description: 'Description for section 1',
                image: 'image1.png',
                imageAlt: 'Image 1',
            },
            {
                id: 'section2',
                label: 'Section 2',
                description: 'Description for section 2',
                image: 'image2.png',
                imageAlt: 'Image 2',
            },
        ],
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
                    'The `WikiContentWithSideBar` component renders a page with a sidebar containing sections and a main content area with detailed information about each section.',
            },
        },
    },
} satisfies Meta<typeof WikiContentWithSideBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        sections: [
            {
                id: 'section1',
                label: 'Section 1',
                description: 'Description for section 1',
                image: 'https://altzone.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FaltLogo.cbe537d0.png&w=384&q=75',
                imageAlt: 'Image 1',
            },
            {
                id: 'section2',
                label: 'Section 2',
                description: 'Description for section 2',
                image: 'https://altzone.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgraffitti-gaya.0b1229e0.png&w=1080&q=100',
                imageAlt: 'Image 2',
            },
            {
                id: 'section3',
                label: 'Section 3',
                description: 'Description for section 3',
                image: 'https://altzone.fi/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhannu-hodari.755680ec.png&w=1920&q=75',
                imageAlt: 'Image 3',
            },
        ],
    },
};
