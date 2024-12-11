import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
    title: 'shared/ui/Modal',
    component: Modal,
    argTypes: {
        children: {
            control: 'ReactNode',
            description: 'Content to be rendered inside the modal.',
            defaultValue: '',
        },
        isOpen: {
            control: 'boolean',
            description: 'Determines if the modal is open or closed.',
            defaultValue: false,
        },
        onRequestClose: {
            control: 'function',
            description: 'Function to be called when the modal requests to be closed.',
            defaultValue: undefined,
        },
        shouldCloseOnExternal: {
            control: 'boolean',
            description:
                'Determines if the modal should close when clicking outside of it or pressing the ESC key.',
            defaultValue: true,
        },
    },
    args: {
        children: <div>Your content here</div>,
        isOpen: false,
        onRequestClose: undefined,
        shouldCloseOnExternal: true,
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '`Modal` component that uses ReactModal under the hood. In the documentation, "esc" button does not work. After clicking `isOpen` you need to reload the page to get out of modal.',
            },
        },
    },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <div>Your content here</div>,
        isOpen: false,
        shouldCloseOnExternal: true,
    },
};
