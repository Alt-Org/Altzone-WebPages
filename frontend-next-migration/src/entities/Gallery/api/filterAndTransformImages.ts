import { PhotoObject, PhotoVersion } from '@/entities/Gallery';

/**
 * Filters and transforms photo objects into an array of photo versions based on the specified version type.
 *
 * This function processes a list of photo objects and extracts either the "full" or "preview" versions,
 * transforming them into a standardized array of photo version objects. If an error occurs, it logs the error
 * and returns an empty array.
 *
 * @param {PhotoObject[]} photoObjects - Array of photo objects to filter and transform.
 *   Each photo object contains metadata and version details.
 * @param {string} version - The version type to extract, either `"full"` or `"preview"`.
 *
 * @returns {PhotoVersion[]} An array of photo versions filtered and transformed based on the specified type.
 *   If an error occurs, the function logs it to the console and returns an empty array.
 */

export const filterAndTransformImages = (
    photoObjects: PhotoObject[],
    version: string,
): PhotoVersion[] => {
    try {
        let images: PhotoVersion[] = [];

        if (version === 'full') {
            images = photoObjects.map((po) => ({
                id: po.versions.full.id,
                image: po.versions.full.image,
                width: po.versions.full.width,
                height: po.versions.full.height,
                altText: po.versions.full.altText,
            }));
        }

        if (version === 'preview') {
            images = photoObjects.map((po) => ({
                id: po.versions.preview.id,
                image: po.versions.preview.image,
                width: po.versions.preview.width,
                height: po.versions.preview.height,
                altText: po.versions.preview.altText,
            }));
        }

        return images;
    } catch (error) {
        console.error('Error transforming and filtering images: ', error);
        const images: PhotoVersion[] = [];
        return images;
    }
};
