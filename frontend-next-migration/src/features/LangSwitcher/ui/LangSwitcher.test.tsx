import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from './LangSwitcher';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('LangSwitcher', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/en/some-path');
        (useTranslation as jest.Mock).mockReturnValue({
            t: (str: string) => (str === 'FIN' ? 'FIN' : 'ENG'),
            i18n: { language: 'en' },
        });
    });

    it('renders with the correct default language', () => {
        render(<LangSwitcher />);
        const langDisplay = screen.getByText('ENG');
        expect(langDisplay).toBeInTheDocument();
        expect(screen.getByText('ENG')).toBeInTheDocument();
    });

    it('changes the language when clicked', () => {
        Object.defineProperty(window, 'location', {
            value: { href: '' },
            writable: true,
        });

        render(<LangSwitcher />);

        const langSwitcher = screen.getByTestId('language-switcher');
        fireEvent.click(langSwitcher.firstElementChild!);

        const finnishOption = screen.getByRole('option', { name: 'FIN' });
        fireEvent.click(finnishOption);

        expect(window.location.href).toBe('/fi/some-path');
    });

    it('does not change the URL if the same language is selected', () => {
        Object.defineProperty(window, 'location', {
            value: { href: '/en/some-path' },
            writable: true,
        });

        render(<LangSwitcher />);

        const langSwitcher = screen.getByTestId('language-switcher');
        fireEvent.click(langSwitcher.firstElementChild!);

        expect(window.location.href).toBe('/en/some-path');
    });

    it('renders with a custom class name', () => {
        render(<LangSwitcher className="custom-class" />);
        const switcher = screen.getByTestId('language-switcher');
        expect(switcher).toHaveClass('custom-class');
    });
});
