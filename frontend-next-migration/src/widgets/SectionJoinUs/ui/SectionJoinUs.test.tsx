import { render, screen } from '@testing-library/react';
import cls from './SectionJoinUs.module.scss';
import { SectionJoinUs } from './SectionJoinUs';
import { BlockSection } from '../types';

// Mock data for the SectionJoinUs component
const mockBlocks: BlockSection[] = [
    {
        label: 'Test label 1',
        description: 'Mock description 1',
        links: [
            {
                text: 'Example Link',
                url: 'https://example.com',
                isExternal: true,
            },
        ],
        img: '',
        imgAlt: 'Mock image alt text 1',
    },
    {
        label: 'Test label 2',
        description: 'Mock description 2',
        links: [
            {
                text: 'Click here 2',
                url: 'https://example.com',
                isExternal: true,
            },
        ],
        img: '',
        imgAlt: 'Mock image alt text 2',
    },
    {
        label: 'Test label 3',
        description: 'Mock description 3',
        links: [
            {
                text: 'Click here 3',
                url: 'https://example.com',
                isExternal: true,
            },
        ],
        img: '',
        imgAlt: 'Mock image alt text 3',
    },
];

describe('SectionJoinUs', () => {
    it('renders all the labels, descriptions, and links correctly', () => {
        render(<SectionJoinUs blocks={mockBlocks} />);

        // Labels
        expect(screen.getByText('Test label 1')).toBeInTheDocument();
        expect(screen.getByText('Test label 2')).toBeInTheDocument();
        expect(screen.getByText('Test label 3')).toBeInTheDocument();

        // Descriptions
        expect(screen.getByText('Mock description 1')).toBeInTheDocument();
        expect(screen.getByText('Mock description 2')).toBeInTheDocument();
        expect(screen.getByText('Mock description 3')).toBeInTheDocument();

        // Links
        expect(screen.getByText('Example Link')).toBeInTheDocument();
        expect(screen.getByText('Click here 2')).toBeInTheDocument();
        expect(screen.getByText('Click here 3')).toBeInTheDocument();
    });

    it('applies the correct container class', () => {
        const { container } = render(<SectionJoinUs blocks={mockBlocks} />);
        expect(container.firstChild).toHaveClass(cls.Container);
    });

    it('renders the correct number of blocks', () => {
        render(<SectionJoinUs blocks={mockBlocks} />);
        const blocks = screen.getAllByTestId('block');
        expect(blocks).toHaveLength(3);
    });
});
