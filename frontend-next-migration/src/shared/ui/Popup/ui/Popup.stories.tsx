import { Meta, StoryObj } from '@storybook/react';
import Popup from './Popup';
import { on } from 'events';

const meta = {
    title: 'shared/ui/Popup',
    component: Popup,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        isOpen: {
            control: 'boolean',
            description: 'Whether the popup is open or not.',
            defaultValue: false,
        },
        popupTop: {
            control: 'number',
            description: 'The top position of the popup.',
            defaultValue: 0,
        },
        onClose: {
            action: 'onClose',
            description: 'The callback function to close the popup.',
            defaultValue: () => {},
        },
    },
    args: {
        className: '',
        isOpen: false,
        popupTop: 0,
        onClose: () => {},
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `Popup` component renders a modal-like overlay. In this Storybook documentation the popup window shows bottom of the page.',
            },
        },
    },
} satisfies Meta<typeof Popup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
        children: <p>Popup Content</p>,
        className: '',
        popupTop: 10,
    },
};
