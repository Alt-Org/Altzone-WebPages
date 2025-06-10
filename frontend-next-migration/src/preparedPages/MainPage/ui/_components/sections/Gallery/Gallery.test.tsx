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
  socialMediaLinks: [
    'https://social1.com',
    'https://social2.com',
  ],
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
}));

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
  }),
}));

describe('Gallery', () => {
  it('renders title, info text and see more link', () => {
    render(<Gallery {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is info text')).toBeInTheDocument();
    expect(screen.getByText('More')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders social media icons', () => {
    render(<Gallery {...mockProps} />);
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(1); // Depends on mock
  });
});