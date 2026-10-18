import { render, screen } from '@testing-library/react';
import { SocialIconLink, Texts } from '@/shared/types/types';
import FooterMobile from './FooterMobile';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, alt, ...props }: any) => (
        <img
            alt={alt}
            {...props}
        />
    ),
}));

jest.mock('@/shared/ui/v2/Feedback', () => ({
    FeedbackCard: () => <div>FeedbackCard</div>,
}));

const mockSocialLinks: SocialIconLink[] = [
    { link: 'https://discord.gg', icon: '/images/Discord2.svg', name: 'Discord' },
    { link: 'https://www.instagram.com', icon: '/images/Insta2.svg', name: 'Instagram' },
    { link: 'https://facebook.com', icon: '/images/Facebook2.svg', name: 'Facebook' },
    { link: 'https://youtube.com', icon: '/images/Youtube2.svg', name: 'Youtube' },
];

const mockTexts: Texts = {
    cookies: 'Cookie Policy',
    consent: 'Reset Cookies',
    currentYear: 2025,
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

describe('FooterMobile', () => {
    it('renders the PRG footer content', () => {
        render(
            <FooterMobile
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
                contactTitle="Contact information"
                contactEmailLabel="Email addresses"
                contactEmails={['hello@example.com']}
                infoTitle="Information"
                infoLinks={mockFooterLinks}
            />,
        );

        expect(screen.getByText('Contact information')).toBeInTheDocument();
        expect(screen.getByText('Email addresses')).toBeInTheDocument();
        expect(screen.getByText('hello@example.com')).toBeInTheDocument();
        expect(screen.getByText('Information')).toBeInTheDocument();
        expect(screen.getByText('FeedbackCard')).toBeInTheDocument();
    });

    it('renders the SocialSection with correct social links', () => {
        render(
            <FooterMobile
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
});
