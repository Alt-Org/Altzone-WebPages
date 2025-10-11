import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery, { Props } from './Gallery';

const mockProps: Props = {
    title: 'Test Title',
    infoText: 'This is info text',
    socialsText: 'Follow us',
    seeMoreLink: {
        text: 'More',
        href: 'https://example.com',
    },
    socialMediaLinks: ['https://social1.com', 'https://social2.com'],
    videoLink: 'https://video.com',
    gameImg: '/test-image.png',
};

jest.mock('next/navigation', () => ({
    useParams: () => ({ lng: 'en' }),
}));

jest.mock('@/entities/Gallery', () => ({
    getLanguageCode: jest.fn(() => 'en'),
    useGetDirectusGalleryImages: jest.fn(() => ({
        photoObjects: [],
        isLoading: false,
    })),
    ImageWall: () => <img alt="mock-gallery-img" />,
}));

jest.mock('react-intersection-observer', () => ({
    useInView: () => ({
        ref: jest.fn(),
        inView: true,
    }),
}));

jest.mock('@/shared/ui/MasonryWrapper', () => ({
    MasonryWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Gallery', () => {
    it('renders title, info text and see more link', () => {
        render(<Gallery {...mockProps} />);
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.infoText)).toBeInTheDocument();
        expect(screen.getByText(mockProps.seeMoreLink.text)).toHaveAttribute(
            'href',
            mockProps.seeMoreLink.href,
        );
    });

    it('renders at least one link element', () => {
        render(<Gallery {...mockProps} />);
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(1);
    });
});
