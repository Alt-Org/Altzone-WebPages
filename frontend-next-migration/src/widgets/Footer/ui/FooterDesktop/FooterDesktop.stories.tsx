import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FooterDesktop from './FooterDesktop';
import { socialIconLinks } from '../../model/data/socialSectionMenu';

const meta: Meta<typeof FooterDesktop> = {
    title: 'widgets/Footer/Desktop',
    component: FooterDesktop,
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
};

export default meta;

type Story = StoryObj<typeof FooterDesktop>;

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
};
