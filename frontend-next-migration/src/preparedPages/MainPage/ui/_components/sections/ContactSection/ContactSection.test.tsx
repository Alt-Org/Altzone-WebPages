import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
    const mockProps = {
        title: 'Test Title',
        googlePLayLink: 'https://example.com',
        linkText: 'Download App',
    };

    it('renders the title and link correctly', () => {
        render(<ContactSection {...mockProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        const link = screen.getByText('Download App') as HTMLAnchorElement;
        expect(link).toBeInTheDocument();
        expect(link.href).toBe('https://example.com/');
    });
});
