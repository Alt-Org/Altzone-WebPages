import { render, screen } from '@testing-library/react';
import { AppLink, AppLinkTheme } from './AppLink';

describe('AppLink', () => {
    test('renders internal link', () => {
        render(
            <AppLink
                to="/internal"
                theme={AppLinkTheme.PRIMARY}
            >
                Internal Link
            </AppLink>,
        );

        const link = screen.getByText(/Internal Link/i);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/internal');
        expect(link.tagName).toBe('A'); // Next.js Link renders an <a>
    });

    test('renders external link', () => {
        render(
            <AppLink
                to="https://external.com"
                isExternal
                theme={AppLinkTheme.SECONDARY}
            >
                External Link
            </AppLink>,
        );

        const link = screen.getByText(/External Link/i);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://external.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link.tagName).toBe('A');
    });

    test('applies custom class name', () => {
        render(
            <AppLink
                to="/internal"
                className="custom-class"
                theme={AppLinkTheme.RED}
            >
                Internal Link
            </AppLink>,
        );

        const link = screen.getByText(/Internal Link/i);
        expect(link).toHaveClass('custom-class');
        expect(link).toHaveClass('red'); // Ensure that the theme class is applied
    });

    test('defaults to primary theme', () => {
        render(<AppLink to="/internal">Internal Link</AppLink>);

        const link = screen.getByText(/Internal Link/i);
        expect(link).toHaveClass('primary'); // Ensure default theme is applied
    });
});
