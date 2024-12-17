import { render, screen } from '@testing-library/react';
import cls from './SectionJoinUs.module.scss';
import { SectionJoinUs } from './SectionJoinUs';
import { BlockSection } from '../types';

const mockBlocks: BlockSection[] = [
    {
        label: 'Test label 1',
        description: 'Mock description 1',
        link: 'https://example.com',
        linkText: 'Click here 1',
    },
    {
        label: 'Test label 2',
        description: 'Mock description 2',
        link: 'https://example.com',
        linkText: 'Click here 2',
    },
    {
        label: 'Test label 3',
        description: 'Mock description 3',
        link: 'https://example.com',
        linkText: 'Click here 3',
    },
];

describe('SectionJoinUs', () => {
    it('renders all the labels, descriptions and links correctly', () => {
        render(<SectionJoinUs blocks={mockBlocks} />);

        expect(screen.getByText('Test label 1')).toBeInTheDocument();
        expect(screen.getByText('Test label 2')).toBeInTheDocument();
        expect(screen.getByText('Test label 3')).toBeInTheDocument();
        expect(screen.getByText('Mock description 1')).toBeInTheDocument();
        expect(screen.getByText('Mock description 2')).toBeInTheDocument();
        expect(screen.getByText('Mock description 2')).toBeInTheDocument();
        expect(screen.getByText('Click here 1')).toBeInTheDocument();
        expect(screen.getByText('Click here 2')).toBeInTheDocument();
        expect(screen.getByText('Click here 3')).toBeInTheDocument();
    });

    it('applies the correct class', () => {
        const { container } = render(<SectionJoinUs blocks={mockBlocks} />);

        expect(container.firstChild).toHaveClass(cls.Container);
    });

    it('renders a correct amount of blocks', () => {
        render(<SectionJoinUs blocks={mockBlocks} />);
        const blocks = screen.getAllByTestId('block');
        expect(blocks).toHaveLength(3);
    });
});
