import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import * as hooks from '@/shared/lib/hooks';
import * as i18n from '@/shared/i18n';
import { ScrollTop } from './ScrollTop';
import React from 'react';

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

    it('hides button when scrolled up', () => {
        // Mock the hook to simulate being at the top of the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(0);
        render(<ScrollTop />); // Render the component

        // Verify that the button is hidden
        expect(screen.getByTestId('scroll-to-top-btn')).not.toHaveClass('show');
    });

    it('should be visible when scrolling to the middle of the page', async () => {
        // Mock the hook to simulate scrolling to the middle of the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight / 2);

        // Mock window.innerHeight ja document.body.scrollHeight
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1000, // Esimerkkiarvo
        });

        Object.defineProperty(document.body, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 2000, // Example value, half of innerHeight
        });

        render(<ScrollTop />);

        await waitFor(() => {
            expect(screen.getByTestId('scroll-to-top-btn')).toHaveClass('show');
        });

        // Restore the original values, so they don't affect other tests
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: window.innerHeight,
        });

        Object.defineProperty(document.body, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: document.body.scrollHeight,
        });
    });

    it('should not be visible at the bottom of the page', () => {
        // Mock the hook to simulate being at the bottom of the page
        (hooks.useCurrentYPosition as jest.Mock).mockReturnValue(window.innerHeight * 6);

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
