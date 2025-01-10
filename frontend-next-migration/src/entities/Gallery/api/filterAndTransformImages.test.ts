import { filterAndTransformImages } from '../api/filterAndTransformImages';

describe('filterAndTransformImages', () => {
    const mockPhotoObjects = [
        {
            id: '56789',
            category: {
                id: '1',
                translations: [
                    {
                        id: 'category-56789',
                        language: 'en',
                        name: 'Category 1',
                        languages_code: 'en-US',
                        category_id: '1',
                    },
                ],
            },
            versions: {
                preview: {
                    id: '56789',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
                    width: 350,
                    height: 350,
                    altText: 'preview picture 1',
                },
                full: {
                    id: '56789',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
                    width: 200,
                    height: 200,
                    altText: 'full picture 1',
                },
            },
        },
        {
            id: '12345',
            category: {
                id: '1',
                translations: [
                    {
                        id: 'category-12345',
                        language: 'en',
                        name: 'Category 1',
                        languages_code: 'en-US',
                        category_id: '1',
                    },
                ],
            },
            versions: {
                preview: {
                    id: '12345',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
                    width: 350,
                    height: 350,
                    altText: 'preview picture 2',
                },
                full: {
                    id: '12345',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
                    width: 200,
                    height: 200,
                    altText: 'full picture 2',
                },
            },
        },
    ];

    it('should transform and return full version objects correctly', () => {
        const result = filterAndTransformImages(mockPhotoObjects, 'full');
        expect(result).toEqual([
            {
                id: '56789',
                image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
                width: 200,
                height: 200,
                altText: 'full picture 1',
            },
            {
                id: '12345',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
                width: 200,
                height: 200,
                altText: 'full picture 2',
            },
        ]);
    });

    it('should transform and return preview objects correctly', () => {
        const result = filterAndTransformImages(mockPhotoObjects, 'preview');
        expect(result).toEqual([
            {
                id: '56789',
                image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
                width: 350,
                height: 350,
                altText: 'preview picture 1',
            },
            {
                id: '12345',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
                width: 350,
                height: 350,
                altText: 'preview picture 2',
            },
        ]);
    });

    it('should return an empty array for an empty input array', () => {
        const result = filterAndTransformImages([], 'full');
        expect(result).toEqual([]);
    });

    it('should return an empty array for an invalid version type', () => {
        const result = filterAndTransformImages(mockPhotoObjects, 'thumbnail');
        expect(result).toEqual([]);
    });
});
