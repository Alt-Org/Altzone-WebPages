import { directusApi } from '@/shared/api';
import { News } from '@/entities/News';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const newsApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query<News[], void>({
            queryFn: async (): Promise<{ data: News[] } | { error: FetchBaseQueryError }> => {
                try {
                    const news = await client.request<Record<string, any>[]>(
                        readItems('news', {
                            fields: ['*'],
                            limit: 200,
                        }),
                    );
                    return { data: news as News[] };
                } catch (error: any) {
                    return {
                        error: {
                            status: error.status || 200,
                            data: { message: error.message || 'Data fetch failed' } as any,
                        },
                    };
                }
            },
        }),
    }),
});

export const { useGetNewsQuery } = newsApi;
