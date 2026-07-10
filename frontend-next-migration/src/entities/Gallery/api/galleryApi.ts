import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { DirectusPhotoObjectV2 } from '../types/gallery';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching gallery data from a Directus backend.
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
                } catch (error: any) {
                    return {
                        error: {
                            status: error.status || 500,
                            data: { message: error.message || 'Data fetch failed' } as any,
                        },
                    };
                }
            },
        }),
    }),
});

export const { useGetPhotoObjectsV2Query } = galleryApi;
