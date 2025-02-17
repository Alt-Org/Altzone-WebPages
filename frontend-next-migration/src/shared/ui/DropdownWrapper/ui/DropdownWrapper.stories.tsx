import { Meta, StoryObj } from '@storybook/react';
import { DropdownWrapper } from './DropdownWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropDownElement, DropdownWrapperProps } from '../types';

const meta = {
    title: 'shared/ui/DropdownWrapper',
    component: DropdownWrapper,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        children: {
            control: 'text',
            description: 'The content inside the dropdown trigger element.',
            defaultValue: '',
        },
        contentAbsolute: {
            control: 'boolean',
            description: 'Determines if the dropdown content should be positioned absolutely.',
            defaultValue: false,
        },
        mouseOverLeaveMode: {
            control: 'boolean',
            description: 'If true, the dropdown opens on mouse over and closes on mouse leave.',
            defaultValue: false,
        },
        childrenWrapperClassName: {
            control: 'text',
            description: 'CSS class for styling the wrapper around the dropdown trigger.',
            defaultValue: '',
        },
        contentClassName: {
            control: 'text',
            description: 'CSS class to apply custom styles to the dropdown content container.',
            defaultValue: '',
        },
        contentItemClassName: {
            control: 'text',
            description: 'CSS class for styling each dropdown item.',
            defaultValue: '',
        },
        elements: {
            control: 'object',
            description:
                'Array of dropdown items with properties like `id`, `elementText`, `onClickCallback`, and `link`.',
            defaultValue: [],
        },
        isDisabled: {
            control: 'object',
            description:
                'If defined, determines if the dropdown is disabled, with an optional reason for display.',
            defaultValue: { status: false, reason: '' },
        },
        onOpen: {
            action: 'opened',
            description: 'Callback function triggered when the dropdown opens.',
        },
        onClose: {
            action: 'closed',
            description: 'Callback function triggered when the dropdown closes.',
        },
    },
    args: {
        className: '',
        children: '',
        contentAbsolute: false,
        mouseOverLeaveMode: false,
        childrenWrapperClassName: '',
        contentClassName: '',
        contentItemClassName: '',
        elements: [],
        isDisabled: { status: false, reason: '' },
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
                    'The `DropdownWrapper` component is a reusable component that provides dropdown functionality. It accepts an array of dropdown items with properties like `id`, `elementText`, `onClickCallback`, and `link`.',
            },
        },
    },
} satisfies Meta<typeof DropdownWrapper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: ['Press me'],
        elements: [
            {
                id: '1',
                elementText: 'Option 1',
            },
            {
                id: '2',
                elementText: 'Option 2',
            },
            {
                id: '3',
                elementText: 'Option 3',
            },
        ],
        isOpen: false,
    },
};
