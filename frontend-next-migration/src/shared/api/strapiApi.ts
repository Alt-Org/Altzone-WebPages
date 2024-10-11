import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';

const strapiApiUrl = envHelper.strapiHost + "/api"

export const strapiApi = createApi({
    reducerPath: 'strapiApi',
    baseQuery: fetchBaseQuery({ baseUrl: strapiApiUrl }),
    endpoints: () => ({}),
});
