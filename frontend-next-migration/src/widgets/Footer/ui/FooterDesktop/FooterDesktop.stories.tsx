import type { Meta, StoryObj } from '@storybook/react';
import FooterDesktop from './FooterDesktop';
import { socialIconLinks } from '../../model/data/socialSectionMenu';

const meta = {
    title: 'widgets/Footer/Desktop',
    component: FooterDesktop,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The `FooterDesktop` component is used to display the footer section for desktop screens, including social media links, company details, and consent information.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'The title displayed in the footer, usually a message to engage users.',
        },
        socialIconLinks: {
            control: 'object',
            description: 'Array of social media links and icons displayed in the social section.',
        },
        texts: {
            control: 'object',
            description: 'An object containing text strings like consent message, cookies policy, privacy details, the current year, and the company name.',
        },
    },
} satisfies Meta<typeof FooterDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Be part of our community 😊',
        socialIconLinks: socialIconLinks,
        texts: {
            consent: 'Consent',
            cookies: 'Cookies',
            privacy: 'Privacy',
            currentYear: new Date().getFullYear(),
            companyName: "Psyche's Royale Gaming ry",
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the default view of the `FooterDesktop` component with social links and privacy details.',
            },
        },
    },
};
