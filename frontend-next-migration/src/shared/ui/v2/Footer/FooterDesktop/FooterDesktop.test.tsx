import { render, screen } from '@testing-library/react';
import { SocialIconLink, Texts } from '@/widgets/Footer/model/types/types';
import FooterDesktop from './FooterDesktop';

jest.mock('@/shared/ui/v2/Feedback');

// Mock data for social links and texts
const mockSocialLinks: SocialIconLink[] = [
    { link: 'https://facebook.com', icon: '/icons/facebook.svg', name: 'Facebook' },
    { link: 'https://twitter.com', icon: '/icons/twitter.svg', name: 'Twitter' },
];

const mockTexts: Texts = {
    cookies: 'Cookie Policy',
    consent: 'Reset Cookies',
    currentYear: 2024,
    privacy: 'Privacy Policy',
    companyName: 'My Company',
};

describe('FooterDesktop', () => {
    it('renders without crashing and displays the title', () => {
        const title = 'Footer Title';

        render(
            <FooterDesktop
                title={title}
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
            />,
        );

        // Check if the title is displayed correctly
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('renders the SocialSection with correct social links', () => {
        render(
            <FooterDesktop
                title="Test Title"
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
            />,
        );

        // Check if the social links are rendered
        mockSocialLinks.forEach((link) => {
            expect(screen.getByAltText(link.name)).toBeInTheDocument(); // Check for images using alt text
        });
    });

    it('renders the Rights component with correct texts', () => {
        render(
            <FooterDesktop
                title="Test Title"
                socialIconLinks={mockSocialLinks}
                texts={mockTexts}
            />,
        );

        // Check if the Rights component displays the correct year and company name
        expect(
            screen.getByText(`${mockTexts.currentYear} ${mockTexts.companyName}`),
        ).toBeInTheDocument();
    });
});
