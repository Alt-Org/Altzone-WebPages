import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {envHelper} from "@/shared/const/envHelper";
import {HYDRATE} from "next-redux-wrapper";


const url = "public/site";

const constructFileURL = (parentDirectory: string, directoryName: string, fileName: string): string => {
    return `${envHelper.apiLink}/${url}/${parentDirectory}/${directoryName}/${fileName}`;
};

type Directory = {
    name: string;
};

type File = {
    name: string;
    type: string;
    mtime: string;
    size: number;
};

type ModifiedFile = File & {
    url: string;
};

export type DirectoryWithPhotos = {
    directoryName: string;
    cover: ModifiedFile;
    photos: ModifiedFile[];
};

export type ParentDirectory = "comics" | "artGalleries"

type GetAllDirectoryPhotosQueryArgs = {
    parentDirectory: ParentDirectory
};



export const galleryApi = createApi({
    reducerPath: "galleryApi",
    tagTypes: ['Gallery'],
    baseQuery: fetchBaseQuery({
        baseUrl: envHelper.apiLink,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllDirectoryPhotos: builder.query<DirectoryWithPhotos[], GetAllDirectoryPhotosQueryArgs>({
            queryFn: async (args, _queryApi, _extraOptions, fetchWithBQ) => {
                const parentDirectory = args.parentDirectory;
                const directoriesResult = await fetchWithBQ(`${url}/${parentDirectory}`);
                if (directoriesResult.error) throw directoriesResult.error;
                const directories: Directory[] = directoriesResult.data as Directory[];

                const photosPromises = directories.map(async (dir): Promise<DirectoryWithPhotos> => {
                    const photosResult = await fetchWithBQ(`${url}/${parentDirectory}/${dir.name}`);
                    if (photosResult.error) throw photosResult.error;

                    const photos: File[] = photosResult.data as File[];

                    const cover = photos[0];

                    // Set URL for every file
                    const photosWithUrls = photos.map(file => ({
                        ...file,
                        url: constructFileURL(parentDirectory, dir.name, file.name)
                    })) as ModifiedFile[];

                    return {
                        directoryName: dir.name,
                        cover: {
                            ...cover,
                            url: constructFileURL(parentDirectory, dir.name, cover.name)
                        },
                        photos: photosWithUrls
                    };
                });

                const allDirectoriesWithPhotos = await Promise.all(photosPromises);



                return { data: allDirectoriesWithPhotos };
            }
        })


    }),
});


export const { useGetAllDirectoryPhotosQuery} = galleryApi;
