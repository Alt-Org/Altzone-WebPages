import { Meta, StoryObj } from '@storybook/react';
import NavMenu, { NavMenuProps, NavMenuItemType } from './NavMenu';

const meta: Meta<NavMenuProps> = {
    title: 'shared/ui/NavMenu',
    component: NavMenu,
    argTypes: {
        title: {
            control: 'text',
            description: 'The title displayed for the dropdown menu.',
            defaultValue: 'Menu',
        },
        dropdownItems: {
            control: 'object',
            description: 'An array of dropdown items including nested dropdown elements.',
        },
        staticDropdown: {
            control: 'boolean',
            description: 'Determines if the first dropdown element remains static and always open.',
            defaultValue: false,
        },
        titleAsActive: {
            control: 'boolean',
            description:
                'Uses the active dropdown item title as the main dropdown title. (title set only if items link path is the same as router path)',
            defaultValue: false,
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes for styling the root container.',
            defaultValue: '',
        },
    },
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#dddddd' },
                { name: 'dark', value: '#333333' },
                { name: 'gray', value: '#dddddd' },
            ],
        },
        docs: {
            description: {
                component:
                    'The `NavMenu` component is a flexible navigation menu that supports nested dropdowns and dynamic titles.',
            },
        },
    },
};
export default meta;

type Story = StoryObj<NavMenuProps>;

export const Default: Story = {
    args: {
        title: 'Menu',
        openByDefault: false,
        staticDropdown: false,
        titleAsActive: false,
        dropdownItems: [
            { type: NavMenuItemType.Link, name: 'Item 1', path: '/item1' },
            {
                type: NavMenuItemType.Dropdown,
                name: 'Category 1',
                elements: [
                    {
                        id: '1',
                        elementText: 'Item 2',
                        link: { path: 'https://altzone.fi', isExternal: true },
                    },
                    { id: '2', elementText: 'Item 3', link: { path: '/item3', isExternal: false } },
                ],
            },
            {
                type: NavMenuItemType.Dropdown,
                name: 'Category 2',
                elements: [
                    {
                        id: '3',
                        elementText: 'Item 4',
                        link: { path: 'https://altzone.fi', isExternal: true },
                    },
                    { id: '4', elementText: 'Item 5', link: { path: '/item5', isExternal: false } },
                ],
            },
            {
                type: NavMenuItemType.Dropdown,
                name: 'Category 3',
                elements: [
                    {
                        id: '5',
                        elementText: 'Item 4',
                        link: { path: 'https://altzone.fi', isExternal: true },
                    },
                    { id: '6', elementText: 'Item 5', link: { path: '/item5', isExternal: false } },
                ],
            },
            {
                type: NavMenuItemType.Element,
                element: <p>React node</p>,
            },
        ],
    },
};
