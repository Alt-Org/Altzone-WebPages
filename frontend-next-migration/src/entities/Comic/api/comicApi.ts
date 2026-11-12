import { createDirectus, readItems, rest } from '@directus/sdk';
import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import type { Comics } from '../types/types';

const client = createDirectus(envHelper.directusHost).with(rest());

export const comicApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getComics: builder.query<Comics[], void>({
            queryFn: async () => {
                try {
                    const comics = await client.request(
                        readItems('Comics', {
                            fields: ['*', 'pages.*', 'translations.*'],
                            filter: { status: { _eq: 'published' } },
                            sort: ['sort', 'id'],
                            limit: -1,
                            deep: { pages: { _limit: -1, _sort: 'order' } },
                        }),
                    );
                    return { data: comics as Comics[] };
                } catch (error: unknown) {
                    const status =
                        typeof error === 'object' &&
                        error !== null &&
                        'status' in error &&
                        typeof error.status === 'number'
                            ? error.status
                            : 500;
                    const message = error instanceof Error ? error.message : 'Data fetch failed';
                    return {
                        error: { status, data: { message } },
                    };
                }
            },
        }),
    }),
});

export const { useGetComicsQuery } = comicApi;
