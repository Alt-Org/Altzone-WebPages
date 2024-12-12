import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching gallery data from a Directus backend.
 *
 * This service utilizes Directus SDK and Redux Toolkit Query to define endpoints for fetching
 * `photo_object` and `photo_version` data, including their associated translations and relationships.
 *
 * @module galleryApi
 *
 * Has two endpoints for data fetching.
 *
 * @endpoint getPhotoObjects
 * Endpoint to fetch photo objects from the Directus `photo_object` collection.
 * Retrieves detailed information about photo objects, including:
 * - Associated categories with translations.
 * - Preview and full versions of the photos with translations.
 *
 * @returns {object} Response containing an array of photo objects.
 *
 * @endpoint getPhotoVersions
 * Endpoint to fetch photo versions from the Directus `photo_version` collection.
 * Retrieves detailed information about photo versions, including:
 * - Image metadata such as dimensions (width, height).
 * - Associated translations for each photo version.
 *
 * @returns {object} Response containing an array of photo versions.
 */

const galleryApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoObjects: builder.query({
            queryFn: async (_arg: void) => {
                const photoObjects = await client.request(
                    readItems('photo_object', {
                        fields: [
                            '*',
                            'category.*',
                            'preview.*',
                            'full.*',
                            'category.translations.*',
                            'full.translations.*',
                            'preview.translations.*',
                        ],
                        deep: {
                            category: { translations: true },
                            preview: { translations: true },
                            full: { translations: true },
                        },
                    }),
                );
                return { data: photoObjects };
            },
        }),
        getPhotoVersions: builder.query({
            queryFn: async (_arg: void) => {
                const photoVersions = await client.request(
                    readItems('photo_version', {
                        fields: ['id', 'image', 'width', 'height', 'translations.*'],
                        deep: { translations: true },
                    }),
                );
                return { data: photoVersions };
            },
        }),
    }),
});

export const { useGetPhotoObjectsQuery, useGetPhotoVersionsQuery } = galleryApi;
