'use client'
import { GalleryCategoriesWithModalSliderProps } from "../ui/GalleryCategoriesWithModalSlider";
import {ParentDirectory, useGetAllDirectoryPhotosQuery } from "./galleryApi";
import { transformToGalleryPropsFormat } from "./transformToGalleryPropsFormat";

export const useGalleryCategories = (parentDirectory: ParentDirectory) => {
    const { data, isError, isLoading} = useGetAllDirectoryPhotosQuery({ parentDirectory });

    let transformedGalleryCategories: GalleryCategoriesWithModalSliderProps[] = [];
    if (data) {
        transformedGalleryCategories = transformToGalleryPropsFormat(data);
    }

    return {transformedGalleryCategories, isError, isLoading};
};


