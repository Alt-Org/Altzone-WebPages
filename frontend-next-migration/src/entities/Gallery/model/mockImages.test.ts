import { generateMockImages, baseImage1, baseImage2 } from '../model/mockImages';

describe('Base Mock Images', () => {
    it('should have correct properties for baseImage1', () => {
        expect(baseImage1).toHaveProperty('id', '56789');
        expect(baseImage1.category).toEqual({
            id: '56789',
            translations: [
                {
                    id: 'category-56789',
                    language: 'en',
                    name: 'All',
                    languages_code: 'en-US',
                    category_id: '56789',
                },
            ],
        });
        expect(baseImage1.versions.preview).toHaveProperty('altText', 'preview picture');
        expect(baseImage1.versions.full).toHaveProperty('altText', 'full picture');
    });

    it('should have correct properties for baseImage2', () => {
        expect(baseImage2).toHaveProperty('id', '12345');
        expect(baseImage2.category).toEqual({
            id: '12345',
            translations: [
                {
                    id: 'category-12345',
                    language: 'en',
                    name: 'All',
                    languages_code: 'en-US',
                    category_id: '12345',
                },
            ],
        });
        expect(baseImage2.versions.preview).toHaveProperty('altText', 'preview picture');
        expect(baseImage2.versions.full).toHaveProperty('altText', 'full picture');
    });
});

describe('generateMockImages', () => {
    it('should generate the correct number of mock images', () => {
        const result = generateMockImages(baseImage1, baseImage2, 6);
        expect(result).toHaveLength(6);
    });

    it('should generate unique IDs for each mock image', () => {
        const result = generateMockImages(baseImage1, baseImage2, 4);
        const ids = result.map((img) => img.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(4);
    });

    it('should alternate between baseImage1 and baseImage2', () => {
        const result = generateMockImages(baseImage1, baseImage2, 4);
        expect(result[0].id.startsWith(baseImage1.id)).toBe(true);
        expect(result[1].id.startsWith(baseImage2.id)).toBe(true);
        expect(result[2].id.startsWith(baseImage1.id)).toBe(true);
        expect(result[3].id.startsWith(baseImage2.id)).toBe(true);
    });
});
