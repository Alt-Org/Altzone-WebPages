import { Meta, StoryObj } from '@storybook/react';
import NavMenuWithDropdowns, { NavMenuWithDropdownsProps } from './NavMenuWithDropdowns';

const meta: Meta<NavMenuWithDropdownsProps> = {
    title: 'shared/ui/NavMenuWithDropdowns',
    component: NavMenuWithDropdowns,
    argTypes: {
        title: {
            control: 'text',
            description: 'The title displayed for the dropdown menu.',
            defaultValue: 'Menu',
        },
        dropdownItems: {
            control: 'object',
            description: 'An array of dropdown items including nested dropdown elements.',
            defaultValue: [
                {
                    title: 'Category 1',
                    openByDefault: false,
                    elements: [
                        {
                            id: '1',
                            elementText: 'Item 1',
                            link: { path: '/item1', isExternal: false },
                        },
                        {
                            id: '2',
                            elementText: 'Item 2',
                            link: { path: '/item2', isExternal: false },
                        },
                    ],
                },
                {
                    title: 'Category 2',
                    openByDefault: false,
                    elements: [
                        {
                            id: '3',
                            elementText: 'Item 3',
                            link: { path: '/item3', isExternal: false },
                        },
                        {
                            id: '4',
                            elementText: 'Item 4',
                            link: { path: '/item4', isExternal: false },
                        },
                    ],
                },
            ],
        },
        openByDefault: {
            control: 'boolean',
            description: 'Specifies if the dropdown should be open by default.',
            defaultValue: false,
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
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#333333' },
                { name: 'gray', value: '#dddddd' },
            ],
        },
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `NavMenuWithDropdowns` component is a flexible navigation menu that supports nested dropdowns and dynamic titles. However storybook doesnt reflect how mobile version looks',
            },
        },
    },
};
export default meta;

type Story = StoryObj<NavMenuWithDropdownsProps>;

export const Default: Story = {
    args: {
        title: 'Menu',
        openByDefault: false,
        staticDropdown: false,
        titleAsActive: false,
        dropdownItems: [
            { elementText: 'Item 1', link: { path: '/item1', isExternal: false } },
            {
                title: 'Category 1',
                openByDefault: false,
                elements: [
                    { id: '1', elementText: 'Item 2', link: { path: '/item2', isExternal: false } },
                    { id: '2', elementText: 'Item 3', link: { path: '/item3', isExternal: false } },
                ],
            },
            {
                title: 'Category 2',
                openByDefault: false,
                elements: [
                    { id: '3', elementText: 'Item 4', link: { path: '/item4', isExternal: false } },
                    { id: '4', elementText: 'Item 5', link: { path: '/item5', isExternal: false } },
                ],
            },
        ],
    },
};
