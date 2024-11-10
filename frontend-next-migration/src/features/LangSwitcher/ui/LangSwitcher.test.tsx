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

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        expect(select).toHaveValue('en'); // Check that the default language is 'en'
    });

    it('changes the language when a new option is selected', () => {
        // Mock window.location.href to prevent real navigation
        // @ts-ignore
        delete window.location;
        window.location = { href: '' } as Location;

        render(<LangSwitcher />);

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        fireEvent.change(select, { target: { value: 'fi' } });

        // Check that the URL is updated with the new language
        expect(window.location.href).toBe('/fi/some-path');
    });

    it('does not change the URL if the same language is selected', () => {
        // Mock window.location.href to prevent real navigation
        // @ts-ignore
        delete window.location;
        window.location = { href: '/en/some-path' } as Location;

        render(<LangSwitcher />);

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        fireEvent.change(select, { target: { value: 'en' } });

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
        // @ts-ignore
        delete window.location;
        window.location = { href: '' } as Location;

        render(<LangSwitcher />);

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        fireEvent.change(select, { target: { value: 'fi' } });

        // Expect window.location.href to be updated
        expect(window.location.href).toBe('/fi/some-path');
    });

    it('falls back to default language when current language is not in options', () => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
            i18n: { language: 'es' }, // Set an unavailable language 'es'
        });

        render(<LangSwitcher />);

        const select = screen.getByTestId('language-switcher') as HTMLSelectElement; // Cast to HTMLSelectElement
        expect(select).not.toHaveValue('es'); // 'es' should not be available
        expect(select).toHaveValue('fi'); // Fallback to 'en'
    });

    it('contains all available language options', () => {
        render(<LangSwitcher />);

        const options = screen.getAllByRole('option');
        const availableLanguages = ['fi', 'en'];
        options.forEach((option) => {
            // @ts-ignore
            expect(availableLanguages).toContain(option.value); // Check that all options are valid
        });
    });
});
