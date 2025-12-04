import { Meta, StoryObj } from '@storybook/nextjs';
import { Rights } from './Rights';

const meta: Meta<typeof Rights> = {
    title: 'widgets/Footer/Rights',
    component: Rights,
    args: {
        className: '',
    },
};

export default meta;

type Story = StoryObj<typeof Rights>;

export const Default: Story = {
    args: {
        texts: {
            cookies: 'We use cookies to improve your experience.',
            consent: 'Click here to reset cookies',
            currentYear: 2024,
            privacy: 'Read our Privacy Policy',
            ethics: 'Read our Ethical Guidelines',
            companyName: "Psyche's Royale Gaming ry",
        },
    },
};
