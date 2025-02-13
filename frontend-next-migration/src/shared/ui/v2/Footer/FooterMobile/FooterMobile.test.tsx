import { render, screen } from '@testing-library/react';
import { SocialIconLink, Texts } from '../../../../../widgets/Footer/model/types/types';
import FooterMobile from './FooterMobile';
import { beforeEach } from 'node:test';
import { useClientTranslation } from '@/shared/i18n';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn().mockReturnValue({
        t: jest.fn((key) => key),
        i18n: { language: 'en', changeLanguage: jest.fn() },
    }),
}));

jest.mock('@/shared/ui/v2/Feedback');

// Mock data for social links and texts
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
    companyName: 'My Company',
};

describe('FooterMobile', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    it('renders the SocialSection with correct social links', () => {
        render(
            <FooterMobile
                title="Test Title"
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
            />,
        );

        mockSocialLinks.forEach((link) => {
            expect(screen.getByAltText(link.name)).toBeInTheDocument();
        });
    });

    it('Renders the title correctly', () => {
        render(
            <FooterMobile
                title="Testing Title"
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
            />,
        );

        expect(screen.getByText('Testing Title')).toBeInTheDocument();
    });
});
