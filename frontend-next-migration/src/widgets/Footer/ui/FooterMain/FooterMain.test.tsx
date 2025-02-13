import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { envHelper } from '@/shared/const/envHelper';
import { socialIconLinks } from '../../model/data/socialSectionMenu';
import { Footer } from './FooterMain';

// Mock the useClientTranslation hook
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/ui/v2/Feedback');

jest.mock('../../model/data/socialSectionMenu', () => ({
    socialIconLinks: [
        { link: 'https://facebook.com', icon: '/icons/facebook.svg', name: 'Facebook' },
        { link: 'https://twitter.com', icon: '/icons/twitter.svg', name: 'Twitter' },
    ],
}));

describe('Footer', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key, // Return the key as translation
        });
    });

    it('renders without crashing', () => {
        render(<Footer />);

        // Check that the footer title is displayed
        expect(screen.getByText('FooterTitle')).toBeInTheDocument();
    });

    it('renders the correct current year and company name', () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        // Check that the current year and company name are displayed correctly
        expect(screen.getByText(`${currentYear} ${envHelper.companyName}`)).toBeInTheDocument();
    });

    it('renders privacy, cookies, and consent texts', () => {
        render(<Footer />);

        // Check that privacy, cookies, and consent texts are displayed
        expect(screen.getByText('FooterPrivacy')).toBeInTheDocument();
        expect(screen.getByText('FooterCookies')).toBeInTheDocument();
        expect(screen.getByText('FooterConsent')).toBeInTheDocument();
    });

    it('renders social icon links', () => {
        render(<Footer />);

        // Check that the number of social icon links matches the mock data
        socialIconLinks.forEach((link) => {
            // Check that each social icon is displayed by alt text
            expect(screen.getByAltText(link.name)).toBeInTheDocument();
        });
    });
});
