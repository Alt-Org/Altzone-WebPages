import { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';
import { AppLink } from '../../AppLink/AppLink';

const meta = {
    title: 'shared/ui/PageTitle',
    component: PageTitle,
    argTypes: {
        titleText: {
            control: 'text',
            description: 'The title of the component',
        },
        searchVisible: {
            control: 'boolean',
            description: 'Specifies whether the component has a search field.',
            defaultValue: false,
        },
    },
    args: {
        titleText: '',
        searchVisible: false,
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
                    '`NavbarSide` is component that displays a navigation sidebar with clickable section labels',
            },
        },
    },
} satisfies Meta<typeof PageTitle>;
export default meta;

type Story = StoryObj<typeof meta>;

// Define Example story
export const Default: Story = {
    args: {
        titleText: 'Title',
    },
};

export const WithSearchField: Story = {
    args: {
        titleText: 'Tulostaulukko',
        searchVisible: true,
    },
};
