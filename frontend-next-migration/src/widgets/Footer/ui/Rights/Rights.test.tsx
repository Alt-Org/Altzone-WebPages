import { render, screen, fireEvent } from '@testing-library/react';
import { AppRoutesLinks } from '@/shared/appLinks/RoutePaths';
import { Rights } from './Rights';

// Mock the useResetCookies hook
jest.mock('@/shared/lib/hooks/useResetCookies', () => ({
    useResetCookies: jest.fn(),
}));

// Mock the AppLink component
jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: jest.fn(({ children, to }) => <a href={to}>{children}</a>), // Set href to the passed `to` prop
    AppLinkTheme: {
        PRIMARY: 'primary', // Mock the PRIMARY value
    },
}));

describe('Rights', () => {
    const mockTexts = {
        cookies: 'Cookie Policy',
        consent: 'Reset Cookies',
        currentYear: 2024, // Change currentYear to number
        privacy: 'Privacy Policy',
        companyName: 'My Company',
    };

    it('renders without crashing and displays correct texts', () => {
        render(<Rights texts={mockTexts} />);

        expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Reset Cookies')).toBeInTheDocument();
        expect(screen.getByText('2024 My Company')).toBeInTheDocument();
    });

    it('calls handleResetCookies when consent span is clicked', () => {
        const mockHandleResetCookies = jest.fn();
        (
            jest.requireMock('@/shared/lib/hooks/useResetCookies').useResetCookies as jest.Mock
        ).mockReturnValue(mockHandleResetCookies);

        render(<Rights texts={mockTexts} />);

        const resetCookiesButton = screen.getByText('Reset Cookies');
        fireEvent.click(resetCookiesButton);

        expect(mockHandleResetCookies).toHaveBeenCalled(); // Ensure the reset cookies function was called
    });

    it('renders with additional class names', () => {
        render(
            <Rights
                className="additional-class"
                texts={mockTexts}
            />,
        );

        const rightsDiv = screen.getByText('Cookie Policy').closest('div');
        expect(rightsDiv).toHaveClass('RightContainer'); // Default class
    });
});
