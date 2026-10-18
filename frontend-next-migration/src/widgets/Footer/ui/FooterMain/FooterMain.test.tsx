import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { envHelper } from '@/shared/const/envHelper';
import { socialIconLinks } from '@/shared/const/socialSectionMenu';
import { Footer } from './FooterMain';

// Mock the useClientTranslation hook
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/ui/v2/Feedback');

jest.mock('@/shared/const/socialSectionMenu', () => ({
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

        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Information')).toBeInTheDocument();
    });

    it('renders the correct current year and company name', () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        // Check that the current year and company name are displayed correctly
        expect(screen.getByText(`${currentYear} ${envHelper.companyName}`)).toBeInTheDocument();
    });

    it('renders configured footer navigation texts', () => {
        render(<Footer />);

        expect(screen.getByText('WorkWithUs')).toBeInTheDocument();
        expect(screen.getByText('WhatIsPRG')).toBeInTheDocument();
        expect(screen.getByText('TermsAndPrivacy')).toBeInTheDocument();
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
