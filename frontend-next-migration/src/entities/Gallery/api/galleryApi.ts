import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { DirectusPhotoObjectV2 } from '../types/gallery';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching gallery data from a Directus backend.
 * Defined an endpoint for fetching photo objects from the Directus `photo_object_v2` collection.
 * @returns DirectusPhotoObjectV2[] - An array of photo objects with their associated data.
 */
const galleryApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoObjectsV2: builder.query({
            queryFn: async (
                _arg: void,
            ): Promise<{ data: DirectusPhotoObjectV2[] } | { error: FetchBaseQueryError }> => {
                try {
                    const photoObjects = await client.request(
                        readItems('photo_object_v2', {
                            fields: [
                                '*',
                                'category.*',
                                'translations.*',
                                'category.translations.*',
                            ],
                        }),
                    );
                    return { data: photoObjects as DirectusPhotoObjectV2[] };
                } catch (error: unknown) {
                    // narrowing the error status and message types
                    const status =
                        typeof error === 'object' &&
                        error !== null &&
                        'status' in error &&
                        typeof error.status === 'number'
                            ? error.status
                            : 500;
                    const message = error instanceof Error ? error.message : 'Data fetch failed';
                    return {
                        error: {
                            status,
                            data: { message: message },
                        },
                    };
                }
            },
        }),
    }),
});

export const { useGetPhotoObjectsV2Query } = galleryApi;
