// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react';
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
         * @type {('full' | 'embedabble')}
         */
        variant: {
            control: 'select',
            description: 'The variant of the FeedbackCard (either "full" or "embedabble").',
            options: ['full', 'embedabble'],
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
        variant: 'full', // Default is 'full'
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the `FeedbackCard` component with the "full" variant, showing all sections like emoji rating, text input, and external links.',
            },
        },
    },
};

/**
 * Story for the `FeedbackCard` component with the "embedabble" variant.
 * A more compact version of the feedback card suitable for embedding in other sections of the app.
 */
export const Embedabble: Story = {
    args: {
        variant: 'embedabble', // Embedabble version for compact display
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the `FeedbackCard` component with the "embedabble" variant, rendering a smaller, more compact layout.',
            },
        },
    },
};
