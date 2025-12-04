import { directusApi } from '@/shared/api'; // Ensure the base Directus API setup is correct.
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems, readItem, aggregate } from '@directus/sdk';
import { News } from '../model/types/types';
import { slugToCategoryNameMap } from '@/entities/NewsV2/model/newsCategorySlugMap';
import { formatDateToDMY } from '@/shared/lib/formatDate';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

type GetNewsArgs = {
    limit: number;
    page?: number | undefined;
    categorySlug?: string | undefined;
};

/**
 * API service for interacting with the Directus backend to fetch news and news categories.
 *
 * This service leverages the Directus SDK to query news articles and their related entities such as
 * categories, media, and translations. It also fetches news categories with their translations and
 * associated images. The service is integrated with Redux Toolkit Query for caching and state management.
 *
 * @service newsApi
 */
export const newsApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetches the list of published news items along with their associated data. Optionally filters by category slug.
         *
         * The query includes news content, related category data, translation information, and images (e.g.,
         * titlePicture, extra pictures). The filter ensures that only news items with a status of 'published'
         * are retrieved. Results are sorted by the `date` field in descending order to show the latest news first.
         *
         * @query
         * @param {Object} args - The arguments for the query.
         * @param {number} args.limit - The maximum number of news items to fetch.
         * @param {number} [args.page] - The page number for pagination.
         * @param {string} [args.categorySlug] - The slug of the category to filter news items by. If not provided, all published news items are fetched.
         * @returns {Promise<Object>} The data containing the fetched news items.
         * @property {Array} data - An array of news items with their associated details.
         */
        getNews: builder.query<News[], GetNewsArgs>({
            queryFn: async ({ limit, page, categorySlug }) => {
                const sharedFields = [
                    '*',
                    'category.*',
                    'titlePicture.*',
                    'extrapicture.*',
                    'extraPicture2.*',
                    'extraPicture3.*',
                    'extraPicture4.*',
                    'category.translations.*',
                    'translations.*',
                ];
                const safeLimit = typeof limit === 'number' ? limit : 10;
                try {
                    if (!categorySlug) {
                        const newsItems = await client.request<News[]>(
                            readItems('news', {
                                fields: sharedFields,
                                deep: {
                                    category: { translations: true },
                                    translations: true,
                                },
                                filter: {
                                    status: { _eq: 'published' },
                                },
                                sort: ['-date', '-id'],
                                limit: safeLimit,
                                page: page || 1,
                            }),
                        );

                        // format dates to D.M.YYYY before returning
                        const formatted = newsItems.map((newsItem) => ({
                            ...newsItem,
                            date: formatDateToDMY((newsItem as any).date),
                        })) as News[];

                        return { data: formatted };
                    }

                    // Convert category slug to category name
                    const categoryName = slugToCategoryNameMap[categorySlug];

                    // Ensure the category slug is valid
                    if (!categoryName) {
                        return {
                            data: undefined,
                            error: { status: 404, data: 'Category not found' },
                            meta: undefined,
                        };
                    }
                    const newsByCategory = await client.request<News[]>(
                        readItems('news', {
                            fields: sharedFields,
                            deep: {
                                category: { translations: true },
                                translations: true,
                            },
                            filter: {
                                category: {
                                    translations: {
                                        languages_code: { _eq: 'en-US' },
                                        category: { _eq: categoryName },
                                    },
                                },
                                status: { _eq: 'published' },
                            },
                            sort: ['-date', '-id'],
                            limit: safeLimit,
                            page,
                        }),
                    );

                    const formattedByCategory = newsByCategory.map((newsItem) => ({
                        ...newsItem,
                        date: formatDateToDMY((newsItem as any).date),
                    })) as News[];

                    return {
                        data: formattedByCategory,
                        error: undefined,
                        meta: undefined,
                    };
                } catch {
                    return {
                        data: undefined,
                        error: { status: 500, data: 'Internal server error' },
                        meta: undefined,
                    };
                }
            },
        }),
        /**
         * Fetches a single news item by its ID, including related data such as category,
         * translations, and images. Also retrieves the IDs of the next and previous news items base on the published date.
         *
         * @param {string} id - The ID of the news item to fetch.
         * @returns {Promise<Object>} The news item data.
         */
        getNewsById: builder.query({
            queryFn: async (_arg: string) => {
                try {
                    const id = parseInt(_arg);
                    const newsItem = await client.request(
                        readItem('news', _arg, {
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

                    if (!newsItem) {
                        return {
                            data: undefined,
                            error: { status: 404, data: 'News item not found' },
                            meta: undefined,
                        };
                    }

                    // Keep original date for next/prev queries
                    const originalDate = (newsItem as any).date;

                    const nextNews = await client.request(
                        readItems('news', {
                            filter: {
                                _or: [
                                    { date: { _gt: originalDate } },
                                    {
                                        _and: [
                                            { date: { _eq: originalDate } },
                                            { id: { _gt: id } },
                                        ],
                                    },
                                ],
                                id: { _neq: id },
                                status: { _eq: 'published' },
                            },
                            sort: ['date', 'id'],
                            limit: 1,
                            fields: ['id'],
                        }),
                    );

                    const prevNews = await client.request(
                        readItems('news', {
                            filter: {
                                _or: [
                                    { date: { _lt: originalDate } },
                                    {
                                        _and: [
                                            { date: { _eq: originalDate } },
                                            { id: { _lt: id } },
                                        ],
                                    },
                                ],
                                id: { _neq: id },
                                status: { _eq: 'published' },
                            },
                            sort: ['-date', '-id'],
                            limit: 1,
                            fields: ['id'],
                        }),
                    );

                    // format the single news item's date to D.M.YYYY (after using originalDate)
                    const formattedNewsItem = {
                        ...newsItem,
                        date: formatDateToDMY(originalDate),
                    };

                    return {
                        data: {
                            nextId: nextNews?.[0]?.id || null,
                            prevId: prevNews?.[0]?.id || null,
                            ...formattedNewsItem,
                        },
                        error: undefined,
                        meta: undefined,
                    };
                } catch {
                    return {
                        data: undefined,
                        error: { status: 500, data: 'Internal server error' },
                        meta: undefined,
                    };
                }
            },
        }),

        /**
         * Fetches a list of news categories, including their images and translations.
         *
         * The query returns the available categories, each with its associated images and translation data.
         *
         * @query
         * @returns {Promise<Object>} The data containing the fetched news categories.
         * @property {Array} data - An array of news categories with their images and translations.
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
        /**
         * Fetches the total count of published news items. Optionally filters by category slug.
         *
         * If no category slug is provided, it returns the total count of all published news items.
         * If a category slug is provided, it converts the slug to a category name and returns the count
         * of published news items in that category.
         *
         * @query
         * @param {string} [categorySlug] - The slug of the category to filter news items by. If not provided, counts all published news items.
         * @returns {Promise<Object>} The total count of news items.
         */
        getTotalNewsCount: builder.query<number, string>({
            queryFn: async (categorySlug?: string) => {
                try {
                    if (!categorySlug) {
                        const totalNewsCount = await client.request(
                            aggregate('news', {
                                aggregate: { count: '*' },
                                query: {
                                    filter: {
                                        status: { _eq: 'published' },
                                    },
                                },
                            }),
                        );
                        if (!totalNewsCount) {
                            return {
                                data: undefined,
                                error: { status: 404, data: 'No news count found' },
                            };
                        }
                        return {
                            data: Number(totalNewsCount[0].count),
                            error: undefined,
                        };
                    }

                    // Convert category slug to category name
                    const categoryName = slugToCategoryNameMap[categorySlug];

                    // Ensure the category slug is valid
                    if (!categoryName) {
                        return {
                            data: undefined,
                            error: { status: 404, data: 'Category not found' },
                            meta: undefined,
                        };
                    }
                    const totalNewsCount = await client.request(
                        aggregate('news', {
                            aggregate: { count: '*' },
                            query: {
                                filter: {
                                    category: {
                                        translations: {
                                            languages_code: { _eq: 'en-US' },
                                            category: { _eq: categoryName },
                                        },
                                    },
                                    status: { _eq: 'published' },
                                },
                            },
                        }),
                    );
                    return {
                        data: Number(totalNewsCount[0].count),
                        error: undefined,
                    };
                } catch {
                    return {
                        data: undefined,
                        error: { status: 500, data: 'Internal server error' },
                    };
                }
            },
        }),
    }),
});

/**
 * Custom hooks generated by Redux Toolkit Query for fetching news and categories.
 *
 * These hooks are used within components to trigger the respective queries and access their results
 * including loading state, data, and errors.
 *
 * @hook {useGetNewsQuery} A hook to fetch the news articles.
 * @hook {useGetNewsByIdQuery} A hook to fetch the news article by Id.
 * @hook {useGetNewsCategoriesQuery} A hook to fetch the news categories.
 */
export const {
    useGetNewsQuery,
    useGetNewsByIdQuery,
    useGetNewsCategoriesQuery,
    useGetTotalNewsCountQuery,
} = newsApi;
