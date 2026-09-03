import { render, screen } from '@testing-library/react';
import NewsCard from './NewsCard';

describe('NewsCard', () => {
    const defaultProps = {
        id: 42,
        title: 'A new update',
        previewText: 'Details about the latest update.',
        date: '2026-08-24',
    };

    it('renders the title, preview text, and date', () => {
        render(<NewsCard {...defaultProps} />);

        expect(
            screen.getByRole('heading', { level: 2, name: defaultProps.title }),
        ).toBeInTheDocument();
        expect(screen.getByText(defaultProps.previewText)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.date)).toBeInTheDocument();
    });

    it('links to the news item and renders its image', () => {
        render(
            <NewsCard
                {...defaultProps}
                titlePicture="https://example.com/news-image.jpg"
            />,
        );

        expect(screen.getByRole('link')).toHaveAttribute('href', '/news/42');
        expect(screen.getByRole('img', { name: defaultProps.title })).toHaveAttribute(
            'src',
            'https://example.com/news-image.jpg',
        );
    });

    it('uses description instead of preview text when both are provided', () => {
        render(
            <NewsCard
                {...defaultProps}
                description="The full description."
            />,
        );

        expect(screen.getByText('The full description.')).toBeInTheDocument();
        expect(screen.queryByText(defaultProps.previewText)).not.toBeInTheDocument();
    });

    it('renders the publisher when provided', () => {
        render(
            <NewsCard
                {...defaultProps}
                publisher="Altzone"
            />,
        );

        expect(screen.getByText('Altzone')).toBeInTheDocument();
    });
});
