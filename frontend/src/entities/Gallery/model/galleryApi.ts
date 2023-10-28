import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {envHelper} from "@/shared/const/env/envHelper";

const url = "public/site";

export const galleryApi = createApi({
    reducerPath: "comicApi",
    tagTypes: ['Gallery'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: envHelper.apiLink,
            credentials: "include",
        }
    ),
    endpoints: (builder) => ({

        getDirectories: builder.query({
            query: ({parentDirectory}) => `${url}/${parentDirectory}`,
        }),

        getPhotosInDirectory: builder.query({
            query: ({ parentDirectory, directoryName }) => `${url}/${parentDirectory}/${directoryName}`,
        }),

    }),
});

export const { useGetDirectoriesQuery, useGetPhotosInDirectoryQuery } = galleryApi;
