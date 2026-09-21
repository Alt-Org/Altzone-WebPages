import { renderHook } from '@testing-library/react';
import { useGetPhotoObjectsV2Query } from '../api/galleryApi';
import { useGetGalleryCategoriesQuery } from '../api/galleryCategoriesApi';
import { useGetDirectusGalleryImages } from '../api/useGetDirectusGalleryImages';
import { getPhotoObjectTexts, getTranslation } from '../api/translations';

jest.mock('../api/galleryApi', () => ({
    useGetPhotoObjectsV2Query: jest.fn(),
}));

jest.mock('../api/galleryCategoriesApi', () => ({
    useGetGalleryCategoriesQuery: jest.fn(),
}));

jest.mock('../api/translations', () => ({
    getTranslation: jest.fn(),
    getPhotoObjectTexts: jest.fn(() => ({ title: '', author: '', description: '' })),
}));

jest.mock('@/shared/const/envHelper', () => ({
    envHelper: {
        directusHost: 'https://strapi.altzone.fi',
    },
}));

describe('useGetDirectusGalleryImages', () => {
    const mockLanguage = 'en';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns empty arrays when no data is available', () => {
        (useGetPhotoObjectsV2Query as jest.Mock).mockReturnValue({
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
        expect(result.current.categories).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('transforms data correctly', () => {
        const mockCategories = [
            {
                id: '1',
                translations: [
                    { id: '1', languages_code: 'en', category_id: '1', name: 'Category 1' },
                ],
            },
        ];
        const mockPhotoObjects = [
            {
                id: '1',
                category: {
                    id: '1',
                    translations: [
                        { id: '1', languages_code: 'en', category_id: '1', name: 'Category 1' },
                    ],
                },
                translations: [
                    {
                        id: '1',
                        languages_code: 'en',
                        photo_object_id: '1',
                        title: 'Title 1',
                        description: 'Description 1',
                    },
                ],
                author: 'Author 1',
                website: 'https://example.com',
                github: null,
                linkedin: null,
                instagram: null,
                facebook: null,
                image: 'image1id',
                image_2: 'image2id',
                image_3: null,
                animation: null,
                date_created: '2024-01-01T00:00:00Z',
            },
        ];

        (useGetPhotoObjectsV2Query as jest.Mock).mockReturnValue({
            data: mockPhotoObjects,
            isLoading: false,
            error: null,
        });
        (useGetGalleryCategoriesQuery as jest.Mock).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        });

        (getTranslation as jest.Mock).mockImplementation(
            (translations) => translations[0]?.name || '',
        );
        (getPhotoObjectTexts as jest.Mock).mockImplementation((translations) => ({
            title: translations[0]?.title || '',
            description: translations[0]?.description || '',
        }));

        const { result } = renderHook(() => useGetDirectusGalleryImages(mockLanguage));

        expect(result.current.categories).toEqual([{ id: '1', name: 'Category 1' }]);
        expect(result.current.photoObjects).toEqual([
            {
                id: '1',
                category: { id: '1', name: 'Category 1' },
                title: 'Title 1',
                description: 'Description 1',
                author: 'Author 1',
                anchorId: 'author-1',
                links: [{ name: 'website', url: 'https://example.com/' }],
                frames: [
                    [
                        `https://strapi.altzone.fi/assets/image1id?format=auto&width=800&quality=80`,
                        'image1id',
                    ],
                    [
                        `https://strapi.altzone.fi/assets/image2id?format=auto&width=800&quality=80`,
                        'image2id',
                    ],
                ],
                animation: undefined,
                date_created: '2024-01-01T00:00:00Z',
            },
        ]);
    });

    it('handles loading states', () => {
        (useGetPhotoObjectsV2Query as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
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
        (useGetPhotoObjectsV2Query as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: mockError,
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
