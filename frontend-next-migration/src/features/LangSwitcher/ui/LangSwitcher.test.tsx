import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from './LangSwitcher';

// Mock the usePathname hook to return a test path
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

// Mock the useTranslation hook for test translations
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('LangSwitcher', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/en/some-path'); // Return a path for the test
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key, // Return the key as translation
            i18n: { language: 'en' }, // Set the initial language
        });
    });

    it('renders with the correct default language', () => {
        render(<LangSwitcher />);

        const button = screen.getByRole('button', { name: /finnish|english/i }); // Look for the button with the current language label
        expect(button).toBeInTheDocument(); // Ensure the button is present

        // Verify that the button's text corresponds to the default language ('en')
        expect(button).toHaveTextContent('english');
    });

    it('changes the language when a new option is selected', () => {
        // Mock window.location.href to prevent real navigation
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });

        render(<LangSwitcher />);

        // Find the button that toggles the dropdown
        const button = screen.getByRole('button', { name: /finnish|english/i });
        fireEvent.click(button);

        // Find the list item for the Finnish option and click it
        const finnishOption = screen.getByRole('option', { name: /finnish/i });
        fireEvent.click(finnishOption);

        // Check that the URL is updated with the new language
        expect(window.location.href).toBe('/fi/some-path');
    });

    it('does not change the URL if the same language is selected', () => {
        // Mock window.location.href to prevent real navigation
        Object.defineProperty(window, 'location', {
            value: {
                href: '/en/some-path',
            },
            writable: true,
        });

        render(<LangSwitcher />);

        // Find the button that toggles the dropdown
        const button = screen.getByRole('button', { name: /finnish|english/i });
        fireEvent.click(button);

        // Find the list item for the English option and click it
        const finnishOption = screen.getByRole('option', { name: /english/i });
        fireEvent.click(finnishOption);

        // Check that the URL remains unchanged
        expect(window.location.href).toBe('/en/some-path');
    });

    it('renders with a custom class name', () => {
        render(<LangSwitcher className="custom-class" />);

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        expect(select).toHaveClass('custom-class'); // Check that the custom class is applied
    });

    it('calls handleChangeLanguage when selecting a different language', () => {
        // Mock window.location.href to prevent real navigation
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });

        render(<LangSwitcher />);

        // Find the button that toggles the dropdown
        const button = screen.getByRole('button', { name: /finnish|english/i });
        fireEvent.click(button);

        // Find the list item for the Finnish option and click it
        const finnishOption = screen.getByRole('option', { name: /finnish/i });
        fireEvent.click(finnishOption);

        // Check that the URL is updated with the new language
        expect(window.location.href).toBe('/fi/some-path');
    });

    it('falls back to default language when current language is not in options', () => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
            i18n: { language: 'es' }, // Set an unavailable language 'es'
        });

        render(<LangSwitcher />);

        const button = screen.getByRole('button');

        // Assert that the button does not show 'es' as the current language
        expect(button).not.toHaveTextContent('spanish');

        // Assert that the fallback language is displayed
        expect(button).toHaveTextContent('finnish');

        // Check that the default language is Finnish
        expect(window.location.href).toContain('/fi/');
    });

    it('contains all available language options', () => {
        render(<LangSwitcher />);

        // Open the dropdown to reveal the options
        const button = screen.getByRole('button', { name: /finnish|english/i });
        fireEvent.click(button);

        // Get all options rendered as list items
        const options = screen.getAllByRole('option');
        const availableLanguages = ['fi', 'en'];

        // Verify each option's value is in the list of available languages
        options.forEach((option) => {
            const value = option.getAttribute('data-option-value');
            expect(availableLanguages).toContain(value);
        });
    });
});
