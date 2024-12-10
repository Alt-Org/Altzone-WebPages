import { envHelper } from '@/shared/const/envHelper';
import { useMemo } from 'react';
import {
    useGetGalleryCategoriesQuery,
    useGetPhotoObjectsQuery,
    useGetPhotoVersionsQuery,
    getPhotoVersionTranslation,
    getCategoryTranslation,
    Category,
    PhotoObject,
    PhotoVersion,
} from '@/entities/Gallery';

/**
 * Hook to fetch and process gallery images from Directus.
 *
 * This function combines data from three Directus queries: photo objects, photo versions,
 * and gallery categories. It processes the raw data to generate structured objects
 * representing the gallery's images, versions, and categories, and also manages
 * loading and error states.
 *
 * @returns {object} An object containing the following properties:
 *   @property {PhotoVersion[]} photoVersions - Array of processed photo versions, including dimensions and alt text.
 *   @property {Category[]} categories - Array of processed gallery categories, including id and name.
 *   @property {PhotoObject[]} photoObjects - Array of processed photo objects, including category and version information.
 *   @property {Error | null} error - Any error encountered while fetching data, or `null` if there was no error.
 *   @property {boolean} isLoading - `true` if any of the data queries are still loading, `false` otherwise.
 *
 * @throws {Error} Logs any error encountered during data transformation.
 *
 * @example
 * const { photoObjects, error, isLoading } = useGetDirectusGalleryImages();
 *
 * if (isLoading) {
 *   console.log('Loading data...');
 * }
 * if (error) {
 *   console.error('Error:', error);
 * }
 * console.log('Categories:', categories);
 * console.log('Photo Objects:', photoObjects);
 */

export const useGetDirectusGalleryImages = (lng: string) => {
    const { data: poData, error: poError, isLoading: poIsLoading } = useGetPhotoObjectsQuery();
    const { data: pvData, error: pvError, isLoading: pvIsLoading } = useGetPhotoVersionsQuery();
    const { data: cData, error: cError, isLoading: cIsLoading } = useGetGalleryCategoriesQuery();

    const directusBaseUrl = envHelper.directusHost;

    const isLoading = poIsLoading || pvIsLoading || cIsLoading;
    const error = poError || pvError || cError;

    const categories: Category[] = useMemo(() => {
        if (!cData) return [];
        return cData.map((item) => ({
            id: item.id,
            name: getCategoryTranslation(item.translations || [], lng),
        }));
    }, [cData]);

    const photoVersions: PhotoVersion[] = useMemo(() => {
        if (!pvData) return [];
        return pvData.map((item) => ({
            id: item.id,
            image: item.image,
            width: item.width,
            height: item.height,
            altText: getPhotoVersionTranslation(item.translations || [], lng),
        }));
    }, [pvData]);

    const photoObjects: PhotoObject[] = useMemo(() => {
        if (!poData) return [];
        return poData.map((item) => ({
            id: item.id,
            category: {
                id: item.category.id,
                name: getCategoryTranslation(item.category.translations || [], lng),
            },
            versions: {
                preview: {
                    id: item.preview.id,
                    image: `${directusBaseUrl}/assets/${item.preview.image}`,
                    width: item.preview.width,
                    height: item.preview.height,
                    altText: getPhotoVersionTranslation(item.preview.translations || [], lng),
                },
                full: {
                    id: item.full.id,
                    image: `${directusBaseUrl}/assets/${item.full.image}`,
                    width: item.full.width,
                    height: item.full.height,
                    altText: getPhotoVersionTranslation(item.full.translations || [], lng),
                },
            },
        }));
    }, [poData, directusBaseUrl]);

    return { photoVersions, categories, photoObjects, error, isLoading };
};
