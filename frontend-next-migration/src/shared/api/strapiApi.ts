import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';

export const strapiApi = createApi({
    reducerPath: 'strapiApi',
    baseQuery: fetchBaseQuery({ baseUrl: envHelper.strapiApiUrl }),
    endpoints: () => ({}),
});
