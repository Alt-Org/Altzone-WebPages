import { Meta, StoryObj } from '@storybook/nextjs';
import CustomSwitch, { CustomSwitchProps } from './CustomSwitch';
import { CustomSwitchItems } from '../model/enum/CustomSwitch.enum';

const meta: Meta<CustomSwitchProps> = {
    title: 'shared/ui/CustomSwitch',
    component: CustomSwitch,
    argTypes: {
        elements: {
            control: 'object',
            description: 'An array for the switch options.',
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
        docs: {
            description: {
                component:
                    'The `CustomSwitch` component is a flexible switch which items can be links or functional items. A parent component is needed for this to function.',
            },
        },
    },
};
export default meta;

type Story = StoryObj<CustomSwitchProps>;

export const Default: Story = {
    args: {
        elements: [
            {
                children: <p>Globaali</p>,
            },
            {
                children: <p>Klaani</p>,
            },
            {
                children: <p>Kaverit</p>,
            },
        ].map((elem, index) => {
            return {
                type: CustomSwitchItems.ToggleItem as CustomSwitchItems.ToggleItem,
                identifier: index,
                isOpen: false,
                onOpen: () => {},
                ...elem,
            };
        }),
    },
};
