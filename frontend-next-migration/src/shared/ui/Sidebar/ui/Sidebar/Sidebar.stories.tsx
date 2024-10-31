import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { ISidebarItem, sidebarItemType } from '../../model/items';
import { DropDownElement } from '@/shared/ui/DropdownWrapper';

const sidebarItemsList: ISidebarItem[] = [
    {
        type: sidebarItemType.ISidebarItemBasic,
        name: 'Home',
        path: '/',
    },
    {
        type: sidebarItemType.ISidebarItemBasic,
        name: 'Profile',
        path: '/profile',
    },
    {
        type: sidebarItemType.ISidebarItemDropDown,
        name: 'Settings',
        elements: [{ elementText: 'Settings content 1' }, { elementText: 'Settings content 2' }],
    },
];

const meta = {
    title: 'shared/ui/Sidebar/Sidebar',
    component: Sidebar,
    argTypes: {
        buttonClassName: {
            control: 'text',
            description: 'Additional CSS class names to apply to the button for custom styling.',
            defaultValue: '',
        },
        sidebarClassName: {
            control: 'text',
            description: 'Additional CSS class names to apply to the sidebar for custom styling.',
            defaultValue: '',
        },
        sidebarItemsList: {
            control: 'object',
            description: 'List of items to display in the sidebar.',
            defaultValue: [],
        },
        side: {
            control: 'radio',
            options: ['left', 'right'],
            description: 'The side of the screen to display the sidebar.',
            defaultValue: 'left',
        },
        closeOnClickOutside: {
            control: 'boolean',
            description: 'Whether the sidebar should close when clicking outside of it.',
            defaultValue: false,
        },
        bottomItems: {
            control: 'object',
            description: 'Additional items to display at the bottom of the sidebar.',
            defaultValue: null,
        },
        onClose: {
            action: 'onClose',
            description: 'Callback function to close the sidebar.',
        },
        sidebarItemsListResetKey: {
            control: 'number',
            description: 'Key to reset the sidebar items list.',
            defaultValue: 0,
        },
    },
    args: {
        buttonClassName: '',
        sidebarClassName: '',
        sidebarItemsList: sidebarItemsList,
        side: 'left',
        closeOnClickOutside: false,
        bottomItems: null,
        onClose: () => {},
        sidebarItemsListResetKey: 0,
    },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `Sidebar` component is a reusable component that renders a sidebar with a list of items. It can be positioned on the left or right side of the screen and can be configured to close when clicking outside of it. In This StoryBook documentation, you need to see Example tab to see the Sidebar component in action. This component does not work properly in Docs tab because it needs bigger parent element.',
            },
        },
    },
} satisfies Meta<typeof Sidebar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        buttonClassName: 'my-custom-button',
        sidebarClassName: 'my-custom-sidebar',
        sidebarItemsList: sidebarItemsList,
        side: 'left',
        closeOnClickOutside: true,
        bottomItems: <div>Custom Bottom Content</div>,
    },
};
