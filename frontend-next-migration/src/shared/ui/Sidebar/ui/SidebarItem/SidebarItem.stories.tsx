import { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';
import { sidebarItemType, ISidebarItem } from '../../model/items';
import { DropDownElement } from '@/shared/ui/DropdownWrapper';
const meta = {
    title: 'shared/ui/Sidebar/SidebarItem',
    component: SidebarItem,
    argTypes: {
        item: {
            control: 'object',
            description: 'The item to display in the sidebar.',
            defaultValue: { type: 'ISidebarItemBasic', path: '/home', name: 'Home' },
        },
        collapsed: {
            control: 'boolean',
            description: 'Whether the sidebar is collapsed or not.',
            defaultValue: false,
        },
    },
    args: {
        item: {
            type: sidebarItemType.ISidebarItemBasic,
            name: 'Home',
            path: '/',
        },
        collapsed: false,
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
                    'Renders a sidebar item, which can either be a basic item or a dropdown.',
            },
        },
    },
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const Example: Story = {
    args: {
        item: {
            type: sidebarItemType.ISidebarItemBasic,
            name: 'Home',
            path: '/',
        },
    },
};

export const Example2: Story = {
    args: {
        item: {
            type: sidebarItemType.ISidebarItemDropDown,
            name: 'Settings',
            elements: [
                { elementText: 'Settings content 1' },
                { elementText: 'Settings content 2' },
            ],
        },
    },
};
