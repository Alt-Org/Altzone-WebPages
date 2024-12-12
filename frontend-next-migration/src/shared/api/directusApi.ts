import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';

const directusApiUrl = envHelper.directusHost;

export const directusApi = createApi({
    reducerPath: 'directusApi',
    baseQuery: fetchBaseQuery({ baseUrl: directusApiUrl }),
    endpoints: () => ({}),
});
