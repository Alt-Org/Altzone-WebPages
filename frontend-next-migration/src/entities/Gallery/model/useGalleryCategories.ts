'use client'
import {
    transformToGalleryPropsFormat,
    useGetAllDirectoryPhotosQuery,
} from "@/entities/Gallery";
import {ParentDirectory, GalleryCategoriesWithModalSliderProps} from "@/entities/Gallery";

export const useGalleryCategories = (parentDirectory: ParentDirectory) => {
    const { data, isError, isLoading} = useGetAllDirectoryPhotosQuery({ parentDirectory });

    let transformedGalleryCategories: GalleryCategoriesWithModalSliderProps[] = [];
    if (data) {
        transformedGalleryCategories = transformToGalleryPropsFormat(data);
    }

    return {transformedGalleryCategories, isError, isLoading};
};


