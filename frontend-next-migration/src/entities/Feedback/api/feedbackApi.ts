import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, createItem, rest } from '@directus/sdk';
import { Feedback } from '../model/types/types';
import { directusApi } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const feedbackApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        addFeedback: builder.mutation({
            queryFn: async (
                data: Feedback,
            ): Promise<{ data: Record<string, any> } | { error: FetchBaseQueryError }> => {
                try {
                    const response = await client.request(createItem('feedback', data));
                    return { data: response as Feedback };
                } catch (error: any) {
                    return {
                        error: {
                            status: error.status || 500,
                            data: { message: error.message || 'Data fetch failed' } as any,
                        },
                    };
                }
            },
        }),
    }),
});

export const { useAddFeedbackMutation } = feedbackApi;
