import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';

const directusApiUrl = envHelper.directusHost;

/**
 * The `directusApi` variable is an API slice created using the Redux Toolkit's `createApi` method.
 * It serves as a centralized API handling mechanism for managing interactions with a Directus backend.
 *
 */
export const directusApi = createApi({
    reducerPath: 'directusApi',
    baseQuery: fetchBaseQuery({ baseUrl: directusApiUrl }),
    endpoints: () => ({}),
});
