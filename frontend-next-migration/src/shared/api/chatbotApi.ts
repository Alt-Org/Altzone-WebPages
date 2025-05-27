import { directusApi } from './directusApi';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching chatbot context data from Directus backend.
 *
 * This service fetches data from the 'chatbot' collection that contains
 * all the context information needed for the chatbot responses.
 * The data includes translations for multiple languages (Finnish, English, Russian).
 */
export const chatbotApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetches chatbot context for specific language
         */
        getChatbotContext: builder.query<string, string>({
            queryFn: async (language: string) => {
                try {
                    const chatbotData = await client.request(
                        readItems('chatbot_content', {
                            fields: ['id', 'translations.*'],
                            deep: { translations: true },
                        }),
                    );

                    // Process data and create context string
                    let contextText = '=== CHATBOT CONTEXT DATA ===\n';

                    chatbotData.forEach((item: any) => {
                        if (item.translations && Array.isArray(item.translations)) {
                            const translation = item.translations.find(
                                (t: any) => t.languages_code === language,
                            );
                            if (translation) {
                                Object.entries(translation).forEach(([key, value]) => {
                                    if (key !== 'id' && key !== 'languages_code' && value) {
                                        contextText += `${key}: ${value}\n`;
                                    }
                                });
                            }
                        }
                    });

                    return { data: contextText };
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error('❌ Error fetching chatbot data:', error);
                    throw error;
                }
            },
        }),
    }),
});

/**
 * Custom hooks for fetching chatbot context data
 */
export const { useGetChatbotContextQuery } = chatbotApi;
