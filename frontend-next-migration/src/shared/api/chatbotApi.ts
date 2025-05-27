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
    }),
});

/**
 * Custom hooks for fetching chatbot context data
 */
export const { useGetChatbotContextQuery } = chatbotApi;
