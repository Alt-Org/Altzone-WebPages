import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching gallery data from a Directus backend.
 */
const galleryApiV2 = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoObjectsV2: builder.query({
            queryFn: async (_arg: void) => {
                const photoObjects = await client.request(
                    readItems('photo_object', {
                        fields: ['*', 'category.*', 'translations.*', 'category.translations.*'],
                        deep: {
                            category: { translations: true },
                            translations: true,
                        },
                    }),
                );
                return { data: photoObjects };
            },
        }),
    }),
});

export const { useGetPhotoObjectsV2Query } = galleryApiV2;
