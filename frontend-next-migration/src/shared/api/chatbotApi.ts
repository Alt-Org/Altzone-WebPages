import { directusApi } from './directusApi';

/**
 * API service for fetching chatbot context data from Directus backend.
 *
 * This service fetches data from the 'chatbot_content' collection that contains
 * all the context information needed for the chatbot responses.
 * The data includes translations for multiple languages (Finnish, English, Russian).
 */
export const chatbotApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetches chatbot context for specific language
         */
        getChatbotContext: builder.query<string, string>({
            query: (language: string) => {
                // Map short language codes to full locale codes
                const languageMap: { [key: string]: string } = {
                    fi: 'fi-FI',
                    en: 'en-US',
                    ru: 'ru-RU',
                };
                const fullLanguageCode = languageMap[language] || language;

                return {
                    url: '/items/chatbot_content',
                    params: {
                        fields: 'id,translations.*',
                        'deep[translations][_filter][languages_code][_eq]': fullLanguageCode,
                    },
                };
            },
            transformResponse: (response: any) => {
                let contextText = '=== CHATBOT CONTEXT DATA ===\n';

                if (response?.data && Array.isArray(response.data)) {
                    response.data.forEach((item: any) => {
                        if (item.translations && Array.isArray(item.translations)) {
                            item.translations.forEach((translation: any) => {
                                Object.entries(translation).forEach(([key, value]) => {
                                    if (
                                        key !== 'id' &&
                                        key !== 'chatbot_content_id' &&
                                        key !== 'languages_code' &&
                                        value
                                    ) {
                                        contextText += `${key}: ${value}\n`;
                                    }
                                });
                            });
                        }
                    });
                }

                return contextText;
            },
        }),

        /**
         * Fetches chatbot links for specific language
         */
        getChatbotLinks: builder.query<
            { slug: string; title: string; url: string; keywords: string[] }[],
            string
        >({
            query: (language: string) => {
                const languageMap: { [key: string]: string } = {
                    fi: 'fi-FI',
                    en: 'en-US',
                    ru: 'ru-RU',
                };
                const fullLanguageCode = languageMap[language] || language;

                return {
                    url: '/items/chatbot_links',
                    params: {
                        fields: 'slug,translations.*',
                        'deep[translations][_filter][languages_code][_eq]': fullLanguageCode,
                    },
                };
            },
            transformResponse: (response: any) => {
                if (!response?.data || !Array.isArray(response.data)) return [];

                return response.data
                    .map((item: any) => {
                        if (!item.translations || !Array.isArray(item.translations)) return null;

                        const translation = item.translations[0];
                        if (!translation) return null;

                        return {
                            slug: item.slug,
                            title: translation.title,
                            url: translation.url,
                            keywords: (translation.keywords || '')
                                .split(',')
                                .map((keyword: string) => keyword.trim())
                                .filter((keyword: string) => keyword.length > 0),
                        };
                    })
                    .filter(Boolean) as {
                    slug: string;
                    title: string;
                    url: string;
                    keywords: string[];
                }[];
            },
        }),
    }),
});

/**
 * Custom hooks for fetching chatbot context and links
 */
export const { useGetChatbotContextQuery, useGetChatbotLinksQuery } = chatbotApi;
