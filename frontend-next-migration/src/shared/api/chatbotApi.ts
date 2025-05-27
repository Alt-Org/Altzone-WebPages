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
         * Fetches all chatbot data with translations for chatbot context
         */
        getChatbotData: builder.query({
            queryFn: async (_arg: void) => {
                try {
                    const chatbotData = await client.request(
                        readItems('chatbot_content', {
                            fields: ['id', 'translations.*'],
                            deep: { translations: true },
                        }),
                    );
                    return { data: chatbotData };
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
export const { useGetChatbotDataQuery } = chatbotApi;
