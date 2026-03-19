import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
    const mockProps = {
        title: 'Test Title',
        links: [
            {
                text: 'Download App',
                link: 'https://example.com',
            },
        ],
    };

    it('renders the title and link correctly', () => {
        render(<ContactSection {...mockProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        const link = screen.getByRole('link', { name: 'Download App' }) as HTMLAnchorElement;
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com');
    });
});
