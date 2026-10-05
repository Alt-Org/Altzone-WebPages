// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/nextjs';
import FeedbackCard from './FeedbackCard';

/**
 * Storybook configuration for the `FeedbackCard` component.
 * The `FeedbackCard` component allows users to submit feedback with a rating, text input, and links to external feedback forms.
 */
const meta = {
    title: 'features/v2/feedback/FeedbackCard',
    component: FeedbackCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `FeedbackCard` component renders a feedback form allowing users to rate their experience and submit feedback. It includes a text input, emoji-based rating, and links to external feedback forms.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        /**
         * Defines the variant of the feedback card, which determines the layout style.
         * @type {('full' | 'borderless')}
         */
        variant: {
            control: 'select',
            description: 'The variant of the FeedbackCard ("full", "borderless").',
            options: ['full', 'borderless'],
        },
    },
} satisfies Meta<typeof FeedbackCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story for the `FeedbackCard` component.
 * Shows the complete feedback form with all the sections and links.
 */
export const Default: Story = {
    args: {
        variant: 'full',
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the `FeedbackCard` component with the "full" variant, showing all sections like emoji rating, text input, and external links.',
            },
        },
    },
};

export const BorderlessVersion: Story = {
    args: {
        variant: 'borderless',
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the `FeedbackCard` component with the "borderless" variant, rendering the card without border and shadow styles.',
            },
        },
    },
};
