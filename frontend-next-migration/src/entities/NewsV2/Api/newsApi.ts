import { directusApi } from '@/shared/api'; // Ensure the base Directus API setup is correct.
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching news and news categories from a Directus backend.
 *
 * This service utilizes Directus SDK and Redux Toolkit Query to define endpoints for fetching
 * `news` and `news_category` data, including their associated translations and relationships.
 */
export const newsApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Endpoint to fetch news items from the Directus `news` collection.
         * Retrieves detailed information about news items, including:
         * - Associated category.
         * - Title pictures and extra pictures.
         * - Translations for the news item.
         */
        getNews: builder.query({
            queryFn: async (_arg: void) => {
                const newsItems = await client.request(
                    readItems('news', {
                        fields: [
                            '*',
                            'category.*',
                            'titlePicture.*',
                            'extrapicture.*',
                            'extraPicture2.*',
                            'extraPicture3.*',
                            'extraPicture4.*',
                            'category.translations.*',
                            'translations.*',
                        ],
                        deep: {
                            category: { translations: true },
                            translations: true,
                        },
                    }),
                );
                return { data: newsItems };
            },
        }),

        /**
         * Endpoint to fetch news categories from the Directus `news_category` collection.
         * Retrieves detailed information about news categories, including:
         * - Category images.
         * - Translations for the category.
         */
        getNewsCategories: builder.query({
            queryFn: async (_arg: void) => {
                const newsCategories = await client.request(
                    readItems('news_category', {
                        fields: ['*', 'category_image.*', 'translations.*'],
                        deep: { translations: true },
                    }),
                );
                return { data: newsCategories };
            },
        }),
    }),
});

// Export the hooks for easy access throughout your app
export const { useGetNewsQuery, useGetNewsCategoriesQuery } = newsApi;
