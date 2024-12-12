import { PhotoObject } from '@/entities/Gallery/types/gallery';

/**
 * Base mock photo objects for Storybook usage.
 *
 * Represents a photo object with predefined category, versions, and localized alt texts.
 * There are two different templates for generating mock photo objects.
 */

export const baseImage1 = {
    id: '56789',
    category: {
        id: '56789',
        name: 'All',
    },
    versions: {
        preview: {
            id: '56789',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
            width: 275,
            height: 275,
            altText: 'preview picture',
        },
        full: {
            id: '56789',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
            width: 275,
            height: 275,
            altText: 'full picture',
        },
    },
};

export const baseImage2 = {
    id: '12345',
    category: {
        id: '12345',
        name: 'All',
    },
    versions: {
        preview: {
            id: '12345',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
            width: 275,
            height: 275,
            altText: 'preview picture',
        },
        full: {
            id: '12345',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
            width: 275,
            height: 275,
            altText: 'full picture',
        },
    },
};

/**
 * Generates an array of mock photo objects by duplicating and modifying two base images.
 *
 * The generated array alternates between `baseImage1` and `baseImage2` with unique IDs
 * for each photo object and its respective versions. The number of mock objects generated is fixed at 12.
 *
 * @param {PhotoObject} baseImage1 - The first base image template to duplicate and modify.
 * @param {PhotoObject} baseImage2 - The second base image template to duplicate and modify.
 * @returns {PhotoObject[]} An array of 12 mock photo objects, alternating between the two base templates.
 */

export const generateMockImages = (
    baseImage1: PhotoObject,
    baseImage2: PhotoObject,
    length: number,
): PhotoObject[] => {
    const mockImages = Array.from({ length: length }, (_, i) => {
        const baseImage = i % 2 === 0 ? baseImage1 : baseImage2;
        return {
            ...baseImage,
            id: `${baseImage.id}-${i + 1}`,
            versions: {
                preview: {
                    ...baseImage.versions.preview,
                    id: `${baseImage.versions.preview.id}-${i + 1}`,
                },
                full: {
                    ...baseImage.versions.full,
                    id: `${baseImage.versions.full.id}-${i + 1}`,
                },
            },
        };
    });
    return mockImages;
};

export const mockImagesFull = generateMockImages(baseImage1, baseImage2, 12);
export const mockImagesPreview = generateMockImages(baseImage1, baseImage2, 4);
