import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const galleryApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPhotoObjects: builder.query({
            queryFn: async (arg: void) => {
                const photoObjects = await client.request(readItems('photo_object'));
                return { data: photoObjects };
            },
        }),
        getPhotoVersions: builder.query({
            queryFn: async (arg: void) => {
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
