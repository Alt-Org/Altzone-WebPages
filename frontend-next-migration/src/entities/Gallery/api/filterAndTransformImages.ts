import { PhotoObject, PhotoVersion } from '../types/gallery';

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
        // Only allow the two supported versions
        if (version !== 'full' && version !== 'preview') {
            return [];
        }

        // Filter out entries with missing versions or missing selected version
        const valid = photoObjects.filter((po) => {
            const v = po.versions;
            return !!(v && v[version]);
        });

        const images: PhotoVersion[] = valid.map((po) => {
            const v = po.versions![version]!; // safe due to filtering above
            return {
                id: v.id,
                image: v.image,
                width: v.width,
                height: v.height,
                altText: v.altText || '',
            };
        });

        return images;
    } catch (error) {
        console.error('Error transforming and filtering images: ', error);
        const images: PhotoVersion[] = [];
        return images;
    }
};
