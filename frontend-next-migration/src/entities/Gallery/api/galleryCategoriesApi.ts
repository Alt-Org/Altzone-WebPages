import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const galleryCategoryApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getGalleryCategories: builder.query({
            queryFn: async (arg: void) => {
                const categories = await client.request(
                    readItems('category', {
                        fields: ['id', 'translations.*'],
                        deep: { translations: true },
                    }),
                );
                return { data: categories };
            },
        }),
    }),
});

export const { useGetGalleryCategoriesQuery } = galleryCategoryApi;
