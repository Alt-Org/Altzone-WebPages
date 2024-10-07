import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        children: {
            control: 'text',
            description: 'Content inside the button.',
            defaultValue: 'Button',
        },
        theme: {
            control: 'select',
            options: Object.values(ButtonTheme),
            description: 'Sets the theme of the button.',
            defaultValue: ButtonTheme.PRIMARY,
            table: {
                defaultValue: { summary: ButtonTheme.PRIMARY },
            },
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSize),
            description: 'Specifies the size of the button.',
            defaultValue: ButtonSize.M,
            table: {
                defaultValue: { summary: ButtonSize.M },
            },

        },
        square: {
            control: 'boolean',
            description: 'If true, makes the button square-shaped.',
            defaultValue: false,
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button if true.',
            defaultValue: false,
        },
        withScalableLink: {
            control: 'boolean',
            description: 'If true, applies scalable link behavior to the button.',
            defaultValue: false,
        },
    },
    args: {
        children: 'Button',
        theme: ButtonTheme.PRIMARY,
        size: ButtonSize.M,
        square: false,
        disabled: false,
        withScalableLink: false,
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The `Button` component is a reusable UI element for triggering actions or navigating within the app. It supports different themes, sizes, and states.',
            },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Button',
    },
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR,
    },
};

export const ClearInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.CLEAR_INVERTED,
    },
};

export const Outline: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE,
    },
};

export const OutlineSizeL: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L,
    },
};

export const OutlineSizeXl: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL,
    },
};

export const BackgroundTheme: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.BACKGROUND,
    },
};

export const BackgroundInverted: Story = {
    args: {
        children: 'Text',
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const Square: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
    },
};

export const SquareSizeL: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.L,
    },
};

export const SquareSizeXl: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.XL,
    },
};

export const Disabled: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.OUTLINE,
        disabled: true,
    },
};

export const WithScalableLink: Story = {
    args: {
        children: 'text',
        withScalableLink: true,
    },
};
