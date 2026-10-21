'use client';
import { ComicReaderProps } from '../ui/ComicReader';
import { ParentDirectory, useGetAllDirectoryPhotosQuery } from '../api/comicApi';
import { transformToGalleryPropsFormat } from './transformToGalleryPropsFormat';

export const useGalleryCategories = (parentDirectory: ParentDirectory) => {
    const { data, isError, isLoading } = useGetAllDirectoryPhotosQuery({ parentDirectory });

    let transformedGalleryCategories: ComicReaderProps[] = [];
    if (data) {
        transformedGalleryCategories = transformToGalleryPropsFormat(data);
    }

    return { transformedGalleryCategories, isError, isLoading };
};
