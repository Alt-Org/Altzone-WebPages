import { render, screen } from '@testing-library/react';
import { Block } from './Block';
import { BlockSection } from '../types';
import cls from './Block.module.scss';

describe('Block', () => {
    it('renders the label, description and link', () => {
        const mockBlock: BlockSection = {
            label: 'Test label',
            description: 'Mock description',
            link: 'https://example.com',
            linkText: 'Click here',
        };

        render(<Block block={mockBlock} />);

        expect(screen.getByText('Test label')).toBeInTheDocument();
        expect(screen.getByText('Mock description')).toBeInTheDocument();
        expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('link has correct text and href attribute', () => {
        const mockBlock: BlockSection = {
            label: 'Test label',
            description: 'Mock description',
            link: 'https://example.com',
            linkText: 'Click here',
        };

        render(<Block block={mockBlock} />);

        expect(screen.getByText('Click here')).toBeInTheDocument();

        const linkElement = screen.getByText('Click here');
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
    });

    it('handles missing label or description gracefully', () => {
        const mockBlock: BlockSection = {
            label: '',
            description: '',
            link: 'https://example.com',
            linkText: 'Click here',
        };

        const { container } = render(<Block block={mockBlock} />);
        expect(container).toBeInTheDocument();

        expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('applies the correct class', () => {
        const mockBlock: BlockSection = {
            label: 'Test label',
            description: 'Mock description',
            link: 'https://example.com',
            linkText: 'Click here',
        };

        const { container } = render(<Block block={mockBlock} />);

        expect(container.firstChild).toHaveClass(cls.Container);
    });
});
