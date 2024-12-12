import { Meta, StoryObj } from '@storybook/react';
import TextSlider from './TextSlider';

const meta: Meta<typeof TextSlider> = {
    title: 'shared/ui/TextSlider',
    component: TextSlider,
    tags: ['autodocs'],
    argTypes: {
        textArray: {
            control: 'object',
            description: 'Array of strings to be displayed in the slider',
        },
        leftArrow: {
            control: 'text',
            description: 'Custom icon or text for left arrow',
        },
        rightArrow: {
            control: 'text',
            description: 'Custom icon or text for right arrow',
        },
        className: {
            control: 'text',
            description: 'Styles',
        },
    },
};
export default meta;

type Story = StoryObj<typeof TextSlider>;

export const Default: Story = {
    args: {
        textArray: ['First Slide', 'Second Slide', 'Third Slide'],
    },
};

export const CustomArrows: Story = {
    args: {
        textArray: ['Slide A', 'Slide B', 'Slide C'],
        leftArrow: <span style={{ color: 'red' }}>⬅️</span>,
        rightArrow: <span style={{ color: 'green' }}>➡️</span>,
    },
};
