import { render, screen } from '@testing-library/react';
import { SocialSection } from './SocialSection';

// Mock data for social links
const mockSocialLinks = [
    { link: 'https://facebook.com', icon: '/icons/facebook.svg', name: 'Facebook' },
    { link: 'https://twitter.com', icon: '/icons/twitter.svg', name: 'Twitter' },
];

// Mock the AppLink component and AppLinkTheme
jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: jest.fn(({ children }) => <div>{children}</div>),
    AppLinkTheme: {
        PRIMARY: 'primary', // Mock the PRIMARY value
    },
}));

// Mock the Image component
jest.mock('next/image', () => {
    // @ts-ignore
    return ({ src, alt, width, height }) => (
        <img
            src={src}
            alt={alt}
            style={{ width: width, height: height }}
        />
    );
});

describe('SocialSection', () => {
    it('renders without crashing and displays social links', () => {
        render(<SocialSection socialIconLinks={mockSocialLinks} />);

        // Check if icons are displayed correctly using data-testid
        mockSocialLinks.forEach((link) => {
            expect(screen.getByAltText(link.name)).toBeInTheDocument();
        });
    });

    it('applies the default class name', () => {
        render(<SocialSection socialIconLinks={mockSocialLinks} />);

        // Check if the SocialSection div has the correct class using data-testid
        const socialSection = screen.getByTestId('social-section');
        expect(socialSection).toHaveClass('SocialSection');
    });

    it('applies additional class names when provided', () => {
        const additionalClass = 'custom-class';
        render(
            <SocialSection
                className={additionalClass}
                socialIconLinks={mockSocialLinks}
            />,
        );

        // Check if both default and additional classes are applied using data-testid
        const socialSection = screen.getByTestId('social-section');
        expect(socialSection).toHaveClass('SocialSection');
        expect(socialSection).toHaveClass(additionalClass);
    });

    it('renders the correct number of social links', () => {
        render(<SocialSection socialIconLinks={mockSocialLinks} />);

        // Check if the number of rendered links matches the mock data using data-testid
        const links = mockSocialLinks.map((link) => screen.getByAltText(link.name)); // Match each social link by test id
        expect(links).toHaveLength(mockSocialLinks.length);
    });
});
