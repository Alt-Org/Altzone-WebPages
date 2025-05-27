import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';

const llmApiUrl = envHelper.openAiApiKey + '/api';

export const llmApi = createApi({
    reducerPath: 'llmApi',
    baseQuery: fetchBaseQuery({
        baseUrl: llmApiUrl,
        prepareHeaders: (headers) => {
            // Add OpenAI API key to headers
            if (envHelper.openAiApiKey) {
                headers.set('Authorization', `Bearer ${envHelper.openAiApiKey}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
