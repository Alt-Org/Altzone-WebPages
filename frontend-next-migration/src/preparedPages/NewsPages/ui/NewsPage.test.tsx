import { act, render, screen, waitFor } from '@testing-library/react';
import NewsPage from './NewsPage';
import { useGetNewsQuery } from '@/entities/NewsV2';
import { useGetTotalNewsCountQuery } from '@/entities/NewsV2/Api/newsApi';

const mockIntersectionObservers: MockIntersectionObserver[] = [];

jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ lng: 'en' })),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(() => ({
        t: (key: string) => key,
    })),
}));

jest.mock('@/entities/NewsV2', () => ({
    useGetNewsQuery: jest.fn(),
    formatNews: (news: Array<any>, lngCode: string) =>
        news.map((item) => ({
            id: item.id,
            date: item.date,
            title:
                item.translations.find((translation: any) => translation.languages_code === lngCode)
                    ?.title ?? '',
            previewText:
                item.translations.find((translation: any) => translation.languages_code === lngCode)
                    ?.preview_text ?? '',
            titlePicture: item.titlePicture,
        })),
}));

jest.mock('@/entities/NewsV2/Api/newsApi', () => ({
    useGetTotalNewsCountQuery: jest.fn(),
}));

jest.mock('@/widgets/NewsCard', () => ({
    NewsCard: ({ id, title, previewText }: { id: number; title: string; previewText?: string }) => (
        <a href={`/news/${id}`}>
            {title}
            {previewText}
        </a>
    ),
}));

jest.mock('@/shared/ui/SkeletonLoader/ui/SkeletonLoader', () => ({
    SkeletonLoaderForNewsPage: ({ numberOfCards }: { numberOfCards: number }) => (
        <div data-testid="news-skeleton">{numberOfCards}</div>
    ),
}));

class MockIntersectionObserver {
    private readonly callback: (entries: IntersectionObserverEntry[]) => void;

    constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        this.callback = callback;
        mockIntersectionObservers.push(this);
    }

    observe = jest.fn();
    disconnect = jest.fn();

    triggerIntersection() {
        this.callback([{ isIntersecting: true } as IntersectionObserverEntry]);
    }
}

describe('NewsPage', () => {
    const mockUseGetNewsQuery = useGetNewsQuery as jest.Mock;
    const mockUseGetTotalNewsCountQuery = useGetTotalNewsCountQuery as jest.Mock;

    const createNews = (id: number) => ({
        id,
        date: `2026-08-${String(id).padStart(2, '0')}`,
        titlePicture: id === 1 ? { id: 'image-1' } : null,
        translations: [
            {
                languages_code: 'en-US',
                title: `News ${id}`,
                preview_text: `Preview ${id}`,
            },
        ],
    });
    const firstPageNews = [createNews(1)];
    const secondPageNews = [createNews(2)];
    const finalPageNews = [1, 2, 3, 4, 5].map(createNews);

    beforeEach(() => {
        jest.clearAllMocks();
        mockIntersectionObservers.length = 0;
        Object.defineProperty(global, 'IntersectionObserver', {
            configurable: true,
            writable: true,
            value: MockIntersectionObserver,
        });
        mockUseGetNewsQuery.mockImplementation(({ page }: { page: number }) => ({
            data: page === 1 ? firstPageNews : secondPageNews,
        }));
        mockUseGetTotalNewsCountQuery.mockReturnValue({ data: 1 });
    });

    it('renders the translated page title and fetched news cards', async () => {
        render(<NewsPage />);

        expect(screen.getByRole('heading', { level: 1, name: 'head-title' })).toBeInTheDocument();
        const newsLink = await screen.findByRole('link', { name: /News 1/ });
        expect(newsLink).toHaveTextContent('News 1');
        expect(newsLink).toHaveTextContent('Preview 1');
        expect(newsLink).toHaveAttribute('href', '/news/1');
        expect(mockUseGetNewsQuery).toHaveBeenCalledWith({
            limit: 6,
            page: 1,
            categorySlug: undefined,
        });
    });

    it('shows six skeleton cards while news is loading', () => {
        mockUseGetNewsQuery.mockReturnValue({ data: undefined });

        render(<NewsPage />);

        expect(screen.getByTestId('news-skeleton')).toHaveTextContent('6');
    });

    it('shows the no-more-news message after the final page', async () => {
        mockUseGetNewsQuery.mockReturnValue({ data: finalPageNews });
        mockUseGetTotalNewsCountQuery.mockReturnValue({ data: 1 });

        render(<NewsPage />);

        expect(await screen.findByText('no-more-news')).toBeInTheDocument();
    });

    it('loads the next page when the sentinel intersects', async () => {
        mockUseGetTotalNewsCountQuery.mockReturnValue({ data: 7 });

        render(<NewsPage />);
        await waitFor(() => expect(mockIntersectionObservers.length).toBeGreaterThan(0));

        act(() => {
            mockIntersectionObservers[0].triggerIntersection();
        });

        expect(await screen.findByRole('link', { name: /News 2/ })).toBeInTheDocument();
        expect(mockUseGetNewsQuery).toHaveBeenLastCalledWith({
            limit: 6,
            page: 2,
            categorySlug: undefined,
        });
    });
});
