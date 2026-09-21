import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Category } from '../types/gallery';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching gallery categories from a Directus backend.
 *
 * This service uses the Directus SDK and Redux Toolkit Query to define endpoints for fetching
 * category data, including their associated translations.
 *
 * @module galleryCategoryApi
 *
 * @endpoint getGalleryCategories
 * Endpoint to fetch gallery categories from the Directus `category` collection.
 * Retrieves information about categories, including their translations.
 *
 * @returns {object} Response containing an array of categories.
 */

const galleryCategoryApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getGalleryCategories: builder.query({
            queryFn: async (_arg: void) => {
                const categories = await client.request(
                    readItems('category', {
                        fields: ['id', 'translations.*'],
                        deep: { translations: true },
                    }),
                );
                return { data: categories as Category[] };
            },
        }),
    }),
});

export const { useGetGalleryCategoriesQuery } = galleryCategoryApi;
