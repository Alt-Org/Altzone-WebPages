import { renderHook } from '@testing-library/react';
import { useGetDirectusGalleryImages } from '../api/useGetDirectusGalleryImages';
import {
    useGetPhotoObjectsQuery,
    useGetPhotoVersionsQuery,
    useGetGalleryCategoriesQuery,
    getPhotoVersionTranslation,
    getCategoryTranslation,
} from '@/entities/Gallery';

jest.mock('@/entities/Gallery', () => ({
    useGetPhotoObjectsQuery: jest.fn(),
    useGetPhotoVersionsQuery: jest.fn(),
    useGetGalleryCategoriesQuery: jest.fn(),
    getPhotoVersionTranslation: jest.fn(),
    getCategoryTranslation: jest.fn(),
}));

describe('useGetDirectusGalleryImages', () => {
    const mockLanguage = 'en';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns empty arrays when no data is available', () => {
        (useGetPhotoObjectsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });
        (useGetPhotoVersionsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });
        (useGetGalleryCategoriesQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });

        const { result } = renderHook(() => useGetDirectusGalleryImages(mockLanguage));

        expect(result.current.photoObjects).toEqual([]);
        expect(result.current.photoVersions).toEqual([]);
        expect(result.current.categories).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('transforms data correctly', () => {
        const mockCategories = [
            { id: '1', translations: [{ language: 'en', name: 'Category 1' }] },
        ];
        const mockPhotoVersions = [
            {
                id: '1',
                image: 'image1.jpg',
                width: 100,
                height: 100,
                translations: [{ language: 'en', altText: 'Alt 1' }],
            },
        ];
        const mockPhotoObjects = [
            {
                id: '1',
                category: { id: '1', translations: [{ language: 'en', name: 'Category 1' }] },
                preview: {
                    id: '2',
                    image: 'preview1.jpg',
                    width: 50,
                    height: 50,
                    translations: [],
                },
                full: { id: '3', image: 'full1.jpg', width: 100, height: 100, translations: [] },
            },
        ];

        (useGetPhotoObjectsQuery as jest.Mock).mockReturnValue({
            data: mockPhotoObjects,
            isLoading: false,
            error: null,
        });
        (useGetPhotoVersionsQuery as jest.Mock).mockReturnValue({
            data: mockPhotoVersions,
            isLoading: false,
            error: null,
        });
        (useGetGalleryCategoriesQuery as jest.Mock).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        });

        (getPhotoVersionTranslation as jest.Mock).mockImplementation(
            (translations) => translations[0]?.altText || '',
        );
        (getCategoryTranslation as jest.Mock).mockImplementation(
            (translations) => translations[0]?.name || '',
        );

        const { result } = renderHook(() => useGetDirectusGalleryImages(mockLanguage));

        expect(result.current.categories).toEqual([{ id: '1', name: 'Category 1' }]);
        expect(result.current.photoVersions).toEqual([
            { id: '1', image: 'image1.jpg', width: 100, height: 100, altText: 'Alt 1' },
        ]);
        expect(result.current.photoObjects).toEqual([
            {
                id: '1',
                category: { id: '1', name: 'Category 1' },
                versions: {
                    preview: {
                        id: '2',
                        image: 'https://strapi.altzone.fi/assets/preview1.jpg',
                        width: 50,
                        height: 50,
                        altText: '',
                    },
                    full: {
                        id: '3',
                        image: 'https://strapi.altzone.fi/assets/full1.jpg',
                        width: 100,
                        height: 100,
                        altText: '',
                    },
                },
            },
        ]);
    });

    it('handles loading states', () => {
        (useGetPhotoObjectsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });
        (useGetPhotoVersionsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });
        (useGetGalleryCategoriesQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });

        const { result } = renderHook(() => useGetDirectusGalleryImages(mockLanguage));

        expect(result.current.isLoading).toBe(true);
    });

    it('handles errors', () => {
        const mockError = new Error('Test Error');
        (useGetPhotoObjectsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: mockError,
        });
        (useGetPhotoVersionsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });
        (useGetGalleryCategoriesQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });

        const { result } = renderHook(() => useGetDirectusGalleryImages(mockLanguage));

        expect(result.current.error).toBe(mockError);
    });
});
