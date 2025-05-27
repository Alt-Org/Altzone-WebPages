import { render, screen } from '@testing-library/react';
import { Block } from './Block';
import { BlockSection } from '../types';
import cls from './Block.module.scss';

describe('Block', () => {
    /**
     * Helper mock block for testing
     */
    const mockBlock: BlockSection = {
        label: 'Test label',
        description: 'Mock description',
        links: [
            {
                text: 'Click here',
                url: 'https://example.com',
                isExternal: true,
            },
        ],
        img: '',
        imgAlt: 'Mock alt text',
    };

    it('renders the label, description, and link text', () => {
        render(<Block block={mockBlock} />);

        expect(screen.getByText('Test label')).toBeInTheDocument();

        expect(screen.getByText('Mock description')).toBeInTheDocument();

        expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('link has correct href attribute', () => {
        render(<Block block={mockBlock} />);

        const linkElement = screen.getByText('Click here');
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
    });

    it('handles missing label and description gracefully', () => {
        const mockEmptyBlock: BlockSection = {
            label: '',
            description: '',
            links: [
                {
                    text: 'Click here',
                    url: 'https://example.com',
                    isExternal: true,
                },
            ],
            img: '',
            imgAlt: '',
        };

        const { container } = render(<Block block={mockEmptyBlock} />);

        expect(container).toBeInTheDocument();
        expect(screen.getByText('Click here')).toBeInTheDocument();
    });

    it('applies the correct container class', () => {
        const { container } = render(<Block block={mockBlock} />);

        expect(container.firstChild).toHaveClass(cls.Container);
    });
});
