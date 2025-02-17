import { render, screen, fireEvent } from '@testing-library/react';
import * as hooks from '@/shared/lib/hooks';
import * as i18n from '@/shared/i18n';
import { ScrollTop } from './ScrollTop';

// Mocking the hooks used in the ScrollTop component
jest.mock('@/shared/lib/hooks', () => ({
    useCurrentYPosition: jest.fn(), // Mock the useCurrentYPosition hook
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(), // Mock the useClientTranslation hook
}));

describe('ScrollTop', () => {
    const mockScrollTo = jest.fn(); // Mock function to simulate scrolling
    let originalScrollTo: typeof window.scrollTo; // Store original window.scrollTo function

    beforeAll(() => {
        // Before all tests, replace window.scrollTo with the mock function
        originalScrollTo = window.scrollTo;
        window.scrollTo = mockScrollTo;
    });

    afterAll(() => {
        // Restore original window.scrollTo function after all tests
        window.scrollTo = originalScrollTo;
    });

    beforeEach(() => {
        // Clear all mocks before each test to ensure clean state
        jest.clearAllMocks();
        // Mock translation function to return the key as the translation
        (i18n.useClientTranslation as jest.Mock).mockReturnValue({ t: (key: string) => key });
    });

    it('renders correctly with default props', () => {
        // Mock the hook to simulate being at the top of the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(0);

        render(<ScrollTop />); // Render the ScrollTop component

        // Check if the button is in the document and has the correct text and class
        const button = screen.getByTestId('scroll-to-top-btn');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('ScrollTop');
    });

    it('shows button when scrolled down', () => {
        // Mock the hook to simulate scrolling down the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight / 4);
        render(<ScrollTop />); // Render the component

        // Verify that the button is visible
        expect(screen.getByTestId('scroll-to-top-btn')).toHaveClass('show');
    });

    it('hides button when scrolled up', () => {
        // Mock the hook to simulate being at the top of the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(0);
        render(<ScrollTop />); // Render the component

        // Verify that the button is hidden
        expect(screen.getByTestId('scroll-to-top-btn')).not.toHaveClass('show');
    });

    it('scrolls to top when button is clicked', () => {
        // Mock the hook to simulate scrolling down the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight / 4);
        render(<ScrollTop />); // Render the component

        const button = screen.getByTestId('scroll-to-top-btn'); // Get the button element
        fireEvent.click(button); // Simulate a click on the button

        // Check if the mock scrollTo function was called with correct parameters
        expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
