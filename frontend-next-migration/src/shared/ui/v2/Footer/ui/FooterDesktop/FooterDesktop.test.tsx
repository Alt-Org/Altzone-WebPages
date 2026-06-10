import { render, screen } from '@testing-library/react';
import { SocialIconLink, Texts } from '@/shared/types/types';
import FooterDesktop from './FooterDesktop';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, alt, ...props }: any) => (
        <img
            alt={alt}
            {...props}
        />
    ),
}));

const mockSocialLinks: SocialIconLink[] = [
    { link: 'https://facebook.com', icon: '/icons/facebook.svg', name: 'Facebook' },
    { link: 'https://twitter.com', icon: '/icons/twitter.svg', name: 'Twitter' },
];

const mockTexts: Texts = {
    cookies: 'Cookie Policy',
    consent: 'Reset Cookies',
    currentYear: 2024,
    privacy: 'Privacy Policy',
    ethics: 'Ethical Guidelines',
    companyName: 'My Company',
};

const mockFooterLinks = {
    workWithUsLabel: 'Apply to us',
    whatIsPrgLabel: 'What is PRG',
    altZoneHistoryLabel: 'ALT Zone history',
    developersDesignersLabel: 'Developers and designers',
    termsAndPrivacyLabel: 'Terms and privacy policy',
};

describe('FooterDesktop', () => {
    it('renders the logo, contact section, and info links', () => {
        render(
            <FooterDesktop
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
                contactTitle="Contact information"
                contactEmailLabel="Email addresses"
                contactEmails={['hello@example.com']}
                infoTitle="Information"
                infoLinks={mockFooterLinks}
            />,
        );

        expect(screen.getByAltText('PRG Logo')).toBeInTheDocument();
        expect(screen.getByText('Contact information')).toBeInTheDocument();
        expect(screen.getByText('Email addresses')).toBeInTheDocument();
        expect(screen.getByText('hello@example.com')).toBeInTheDocument();
        expect(screen.getByText('Information')).toBeInTheDocument();
        expect(screen.getByText('Apply to us')).toBeInTheDocument();
    });

    it('renders the SocialSection with correct social links', () => {
        render(
            <FooterDesktop
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
                contactTitle="Contact information"
                contactEmails={['hello@example.com']}
                infoTitle="Information"
                infoLinks={mockFooterLinks}
            />,
        );

        mockSocialLinks.forEach((link) => {
            expect(screen.getByAltText(link.name)).toBeInTheDocument();
        });
    });

    it('renders copyright with the current company', () => {
        render(
            <FooterDesktop
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
                contactTitle="Contact information"
                contactEmails={['hello@example.com']}
                infoTitle="Information"
            />,
        );

        expect(
            screen.getByText(`${mockTexts.currentYear} ${mockTexts.companyName}`),
        ).toBeInTheDocument();
    });
});
