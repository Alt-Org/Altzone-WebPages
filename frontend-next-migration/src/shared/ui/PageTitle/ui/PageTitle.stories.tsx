import { Meta, StoryObj } from '@storybook/react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import PageTitle from './PageTitle';
import { useState } from 'react';

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

const Template = (args: any) => {
    return (
        <>
            <PageTitle {...args} />
            {/* <LayoutWithSidebars
                leftTopSidebar={{
                    component: <p>Sidebar</p>,
                }}
            >
                <p>Content</p>
            </LayoutWithSidebars> */}
        </>
    );
};

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

export const ExampleOnUse: Story = {
    render: Template,
    args: {
        titleText: 'Tulostaulukko',
        searchVisible: true,
    },
};
